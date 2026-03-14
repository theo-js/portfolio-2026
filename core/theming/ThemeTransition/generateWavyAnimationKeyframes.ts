const WAVES = 8;
const AMPLITUDE = 0.07;
export const KEYFRAMES_STEPS = 12;

function generateWavyPath({
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

export function generateWavyAnimationKeyframes({
  originX,
  originY,
  maxRadius,
}: {
  originX: number;
  originY: number;
  maxRadius: number;
}) {
  return Array.from({ length: KEYFRAMES_STEPS + 1 }, (_, i) => {
    const progress = i / KEYFRAMES_STEPS;
    const phase = progress * Math.PI * 2; // Full cycle for the entire animation
    return {
      clipPath: `path('${generateWavyPath({
        originX,
        originY,
        r: (i / KEYFRAMES_STEPS) * maxRadius,
        phase,
      })}')`,
    };
  });
}
