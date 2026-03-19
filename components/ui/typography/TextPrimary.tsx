import type { FC } from 'react';

export const TextPrimary: FC = (props) => (
  <span className="text-primary glass:dark:brightness-150 glass:light:text-white" {...props} />
);
