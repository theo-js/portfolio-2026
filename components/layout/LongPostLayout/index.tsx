import type { FC, HTMLProps, PropsWithChildren } from 'react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { ReadingProgressIndicator } from './ReadingProgressIndicator';
import { MaxContentWidth } from '@/components/ui/layout/MaxContentWidth';

const PROJECT_DETAILS_BODY_ID_ATTRIBUTE = 'long-post-body' as const;

/**
 * A layout for long posts, such as project details and blog posts.
 * It includes all necessary UI elements like reading progress indicator and scroll to top button.
 */
export const LongPostLayout: FC<PropsWithChildren<HTMLProps<HTMLDivElement>>> = (props) => (
  <>
    <ReadingProgressIndicator articleContentId={PROJECT_DETAILS_BODY_ID_ATTRIBUTE} />

    <div {...props} />

    <ScrollToTopButton />
  </>
);

/**
 * This component must wrap the main content of the post
 * and be a descendant of `LongPostLayout`
 * to ensure the reading progress indicator works correctly.
 */
export const LongPostBody: FC<PropsWithChildren> = (props) => (
  <div className="glass:light:bg-black/20 glass:dark:bg-black/40 glass:backdrop-blur-4xl glass:border-y glass:border-white/20 relative bg-clip-padding px-6">
    <MaxContentWidth className="relative">
      <div className="glass:border-transparent border-y py-8">
        <main {...props} id={PROJECT_DETAILS_BODY_ID_ATTRIBUTE} className="text-[18px]" />
      </div>
    </MaxContentWidth>
  </div>
);
