"use client";

import { useEffect, useRef } from "react";

/**
 * Shader animado en blanco y negro estricto.
 *
 * Adaptación del shader de Matthias Hurrle (@atzedent) / aliimam (21st.dev) —
 * se removieron los gradientes RGB cíclicos y el tinte cyan/cremoso del
 * original para respetar la paleta B&N del manual de marca de ModoCasa.
 *
 * Pensado para usarse como overlay con mix-blend-mode sobre una imagen/video
 * de fondo. El canvas tiene `pointer-events-none` por default para no
 * interceptar el cursor sobre el texto del hero.
 */

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  float a = rnd(i),
        b = rnd(i + vec2(1, 0)),
        c = rnd(i + vec2(0, 1)),
        d = rnd(i + 1.);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float t = .0, a = 1.;
  mat2 m = mat2(1., -.5, .2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2. * m;
    a *= .5;
  }
  return t;
}

float clouds(vec2 p) {
  float d = 1., t = .0;
  for (float i = .0; i < 3.; i++) {
    float a = d * fbm(i * 10. + p.x * .2 + .2 * (1. + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2. / (i + 1.);
  }
  return t;
}

void main(void) {
  vec2 uv = (FC - .5 * R) / MN;
  vec2 st = uv * vec2(2, 1);
  vec3 col = vec3(0);
  float bg = clouds(vec2(st.x + T * .3, -st.y));

  uv *= 1. - .25 * (sin(T * .15) * .5 + .5);

  for (float i = 1.; i < 12.; i++) {
    uv += .1 * cos(i * vec2(.1 + .01 * i, .8) + i * i + T * .4 + .1 * uv.x);
    vec2 p = uv;
    float d = length(p);
    // Puntos brillantes en blanco puro (en lugar del gradiente RGB original)
    col += .0011 / d * vec3(1.);
    float b = noise(i + p + bg * 1.731);
    col += .0018 * b / length(max(p, vec2(b * p.x * .02, p.y)));
    // Tinte de fondo en gris monocromo (en lugar del cyan original)
    col = mix(col, vec3(bg * .14), d);
  }

  // Suaviza el contraste para que el blend mode no quede agresivo.
  col = clamp(col, 0., 1.);
  O = vec4(col, 1);
}`;

const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec4 position;
void main() { gl_Position = position; }`;

type ShaderBackgroundProps = {
  className?: string;
  /** Velocidad relativa de la animación. 1 = default, 0.5 = mitad. */
  speed?: number;
};

export function ShaderBackground({ className = "", speed = 1 }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) {
      // Browser sin WebGL2 — el background queda con la imagen/video debajo
      // (degradación elegante, no rompe nada)
      return;
    }

    // Compile shaders
    const compile = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");

    let rafId = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const render = (now: number) => {
      resize();
      gl.useProgram(program);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, ((now - start) * speed) / 1000);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none w-full h-full block ${className}`}
    />
  );
}
