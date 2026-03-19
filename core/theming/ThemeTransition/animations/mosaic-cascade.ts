import { checkToolbarHeight } from '@/lib/screen/getToolbarHeight';
import type { ClipPathAnimationKeyframes } from './types';

const KEYFRAMES_STEPS = 50;
const GRID_ROWS = 20;
const GRID_COLS = 20;

function generateMosaicCascadePath({
  originX,
  originY,
  progress,
}: {
  originX: number;
  originY: number;
  progress: number; // 0 → 1
}): string {
  const width = window.innerWidth;
  const height = window.innerHeight + checkToolbarHeight();
  const cellW = width / GRID_COLS;
  const cellH = height / GRID_ROWS;
  const paths: string[] = [];

  const maxDist = Math.hypot(width, height);

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const cx = col * cellW + cellW / 2;
      const cy = row * cellH + cellH / 2;
      const dist = Math.hypot(cx - originX, cy - originY);

      // Add a small offset based on the cell's position for the cascade effect
      const cellOffset = (row + col) / (GRID_ROWS + GRID_COLS);

      if (dist / maxDist <= progress + cellOffset * 0.2) {
        const x0 = col * cellW;
        const y0 = row * cellH;
        const x1 = x0 + cellW;
        const y1 = y0 + cellH;

        paths.push(`M${x0},${y0} L${x1},${y0} L${x1},${y1} L${x0},${y1} Z`);
      }
    }
  }

  return paths.length > 0 ? paths.join(' ') : `M0,0Z`;
}

export const generateMosaicFillKeyframes: ClipPathAnimationKeyframes = ({ originX, originY }) => {
  return Array.from({ length: KEYFRAMES_STEPS + 1 }, (_, i) => {
    const progress = i / KEYFRAMES_STEPS;
    return {
      clipPath: `path('${generateMosaicCascadePath({
        originX,
        originY,
        progress,
      })}')`,
    };
  });
};
