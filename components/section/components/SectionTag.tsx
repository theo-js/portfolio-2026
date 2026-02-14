export const SectionTag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="text-primary dark:text-primary text-center text-sm tracking-widest">
    {'[ '} {children} {' ]'}
  </div>
);
