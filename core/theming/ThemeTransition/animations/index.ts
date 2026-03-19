import { generateFractalWaveKeyframes } from './fractal-wave';
import { generateMosaicFillKeyframes } from './mosaic-cascade';
import { generateWaveAnimationKeyframes } from './wave';
import type { ClipPathAnimationKeyframes } from './types';

const animations: ClipPathAnimationKeyframes[] = [
  generateWaveAnimationKeyframes,
  generateFractalWaveKeyframes,
  generateMosaicFillKeyframes,
];

let currentAnimationIndex = 0;

export const generateClipPathAnimationKeyframes: ClipPathAnimationKeyframes = (params) => {
  const animation = animations[currentAnimationIndex];
  currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
  return animation(params);
};
