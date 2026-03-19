import { KEYFRAMES_STEPS } from '../constants';
import type { ClipPathAnimationKeyframes } from './types';

const WAVES = 6;
const AMPLITUDE = 0.1;

function generateFractalWavePath({
  originX,
  originY,
  radius,
  phase,
}: {
  originX: number;
  originY: number;
  radius: number;
  phase: number;
}): string {
  const steps = 360;
  const points: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;

    // Multiple sine waves superposées pour effet fractal
    const r =
      radius +
      radius * AMPLITUDE * Math.sin(WAVES * angle + phase) +
      radius * (AMPLITUDE / 2) * Math.sin(WAVES * 3 * angle - phase * 0.5);

    const x = originX + r * Math.cos(angle);
    const y = originY + r * Math.sin(angle);

    points.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
  }

  return points.join(' ') + ' Z';
}

export const generateFractalWaveKeyframes: ClipPathAnimationKeyframes = ({ originX, originY }) => {
  const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
  return Array.from({ length: KEYFRAMES_STEPS + 1 }, (_, i) => {
    const progress = i / KEYFRAMES_STEPS;
    const phase = progress * Math.PI * 2;
    return {
      clipPath: `path('${generateFractalWavePath({
        originX,
        originY,
        radius: progress * maxRadius,
        phase,
      })}')`,
    };
  });
};
