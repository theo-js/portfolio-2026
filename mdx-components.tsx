import type { MDXComponents } from 'mdx/types';
import { TypographyH1 } from './components/ui/typography/TypographyH1';
import { TypographyH2 } from './components/ui/typography/TypographyH2';
import { TypographyH3 } from './components/ui/typography/TypographyH3';
import { TypographyH4 } from './components/ui/typography/TypographyH4';
import { TypographyLi } from './components/ui/typography/TypographyLi';
import { TypographyP } from './components/ui/typography/TypographyP';
import { TypographySmall } from './components/ui/typography/TypographySmall';
import { TypographyUl } from './components/ui/typography/TypographyUl';
import { TextPrimary } from './components/ui/typography/TextPrimary';
import { TextSecondary } from './components/ui/typography/TextSecondary';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { ScrollspyMenu } from './components/ui/scrollspy-menu';
import { TypographyLegend } from './components/ui/typography/TypographyLegend';
import { TextSuccess } from './components/ui/typography/TextSuccess';
import { Img } from './components/ui/typography/Img';
import { Section } from './components/ui/typography/Section';
import { TypographyInlineCode } from './components/ui/typography/TypographyInlineCode';
import { Iframe } from './components/ui/typography/Iframe';
import { Button } from './components/ui/button';
import Link from 'next/link';

const components: MDXComponents = {
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  li: TypographyLi,
  p: TypographyP,
  small: TypographySmall,
  ul: TypographyUl,
  Legend: TypographyLegend,
  Code: TypographyInlineCode,
  Primary: TextPrimary,
  Secondary: TextSecondary,
  Success: TextSuccess,
  Section,
  ScrollspyMenu,
  Alert,
  AlertTitle,
  AlertDescription,
  NextImage: Img,
  NextLink: Link,
  Iframe,
  Button,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
