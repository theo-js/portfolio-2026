'use client';

import type { FC } from 'react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useIsHydrated } from 'radix-ui/internal';
import { useIsomorphicLayoutEffect } from 'react-use';

export const DeformableGrid: FC = () => {
  const isHydrated = useIsHydrated();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return;

    gl.getExtension('OES_standard_derivatives');

    function resize() {
      if (!gl) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    function handleMouse(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = rect.height - (e.clientY - rect.top);
    }
    window.addEventListener('mousemove', handleMouse);

    const vertex = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragment = `
      #extension GL_OES_standard_derivatives : enable
      precision mediump float;

      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_gridColor;

      varying vec2 v_uv;

      void main() {
          // Distort UVs based on mouse position
          vec2 mouseUV = u_mouse / u_resolution;
          float dist = distance(v_uv, mouseUV);
          float strength = 0.25 * exp(-10.0 * dist);
          vec2 distortedUV = v_uv + (v_uv - mouseUV) * strength;

          // Px coordinates
          vec2 pixel = distortedUV * u_resolution;

          float gridSize = 50.0;

          float lineWidth = 0.5;

          vec2 grid = mod(pixel, gridSize);

          float distToVertical = min(grid.x, gridSize - grid.x);
          float distToHorizontal = min(grid.y, gridSize - grid.y);

          float lineX = distToVertical < lineWidth ? 1.0 : 0.0;
          float lineY = distToHorizontal < lineWidth ? 1.0 : 0.0;
          float line = max(lineX, lineY);

          if (line < 0.5) {
              discard;
          } else {
              gl_FragColor = vec4(u_gridColor, 1.0);
          }
      }
    `;

    function compile(type: number, source: string) {
      if (!gl) return;

      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    // @ts-expect-error // TypeScript does not recognize the shader types in this context, but WebGL does support them
    if (gl.VERTEX_SHADER) gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    // @ts-expect-error // TypeScript does not recognize the shader types in this context, but WebGL does support them
    if (gl.FRAGMENT_SHADER) gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);

    const buffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'a_position');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uGridColor = gl.getUniformLocation(program, 'u_gridColor');

    // Helper to get CSS variable color and convert to RGB normalized
    function getGridColor() {
      const style = getComputedStyle(canvas.parentElement!);
      const color = style.getPropertyValue('--grid-color').trim() || 'rgb(0,0,0)';

      // If hexadecimal
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r / 255, g / 255, b / 255];
      }

      // Otherwise assume rgb(...) or rgba(...)
      const rgb = color.match(/\d+/g);
      if (!rgb) return [0, 0, 0];
      return [parseInt(rgb[0], 10) / 255, parseInt(rgb[1], 10) / 255, parseInt(rgb[2], 10) / 255];
    }

    function render() {
      if (!gl) return;

      gl.clearColor(0, 0, 0, 0); // transparent background
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const [r, g, b] = getGridColor();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.uniform3f(uGridColor, r, g, b);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <>
      {/* // Fallback during hydration to avoid CLS */}
      <div
        className={cn(
          isHydrated && 'md:hidden',
          'absolute inset-0',
          'bg-[size:50px_50px] bg-[position:0px_10px]',
          'light:bg-[linear-gradient(color-mix(in_oklab,rgb(0,0,1)_3%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,rgb(0,0,1)_3%,transparent)_1px,transparent_1px)]',
          'dark:bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)]',
          'light:glass:bg-[linear-gradient(rgba(255,254,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,254,255,0.12)_1px,transparent_1px)]',
          'dark:glass:bg-[linear-gradient(rgba(255,254,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,254,255,0.08)_1px,transparent_1px)]',
          'mask-gradient-fade-around',
        )}
      />

      {/* Interactive WebGL */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 hidden md:block', // Only show on desktop
          'light:[--grid-color:rgb(0,0,1)] light:opacity-[0.03]',
          'glass:light:[--grid-color:rgb(255,254,255)] glass:light:opacity-[0.12]',
          'dark:opacity-[0.06] dark:[--grid-color:rgb(34,211,238)]',
          'glass:dark:[--grid-color:rgb(255,254,255)] glass:dark:opacity-[0.08]',
          'mask-gradient-fade-around',
        )}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </>
  );
};
