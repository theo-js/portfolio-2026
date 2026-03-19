import { checkToolbarHeight } from '@/lib/screen/getToolbarHeight';
import { KEYFRAMES_STEPS } from '../constants';
import type { ClipPathAnimationKeyframes } from './types';

const WAVES = 8;
const AMPLITUDE = 0.07;

function generateWavePath({
  originX,
  originY,
  r,
  phase,
}: {
  originX: number;
  originY: number;
  r: number;
  phase: number;
}): string {
  const steps = 360;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const radius = r + r * AMPLITUDE * Math.sin(WAVES * angle + phase); // ← + phase
    const x = originX + radius * Math.cos(angle);
    const y = originY + radius * Math.sin(angle);
    points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return points.join(' ') + ' Z';
}

export const generateWaveAnimationKeyframes: ClipPathAnimationKeyframes = ({
  originX,
  originY,
}) => {
  const safeWindowHeight = window.innerHeight + checkToolbarHeight();
  const maxRadius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, safeWindowHeight - originY),
  );

  return Array.from({ length: KEYFRAMES_STEPS + 1 }, (_, i) => {
    const progress = i / KEYFRAMES_STEPS;
    const phase = progress * Math.PI * 2; // Full cycle for the entire animation
    return {
      clipPath: `path('${generateWavePath({
        originX,
        originY,
        r: (i / KEYFRAMES_STEPS) * maxRadius,
        phase,
      })}')`,
    };
  });
};
