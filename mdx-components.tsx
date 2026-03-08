import type { MDXComponents } from 'mdx/types';
import { TypographyH1 } from './components/ui/typography/TypographyH1';
import { TypographyH2 } from './components/ui/typography/TypographyH2';
import { TypographyH3 } from './components/ui/typography/TypographyH3';
import { TypographyH4 } from './components/ui/typography/TypographyH4';
import { TypographyLi } from './components/ui/typography/TypographyLi';
import { TypographyP } from './components/ui/typography/TypographyP';
import { TypographySmall } from './components/ui/typography/TypographySmall';
import { TypographyUl } from './components/ui/typography/TypographyUl';

const components: MDXComponents = {
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  li: TypographyLi,
  p: TypographyP,
  small: TypographySmall,
  ul: TypographyUl,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
