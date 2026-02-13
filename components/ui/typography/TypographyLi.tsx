import type { FC, HTMLProps, PropsWithChildren } from 'react';

export const TypographyLi: FC<PropsWithChildren<HTMLProps<HTMLLIElement>>> = (props) => {
  return <li {...props}></li>;
};
