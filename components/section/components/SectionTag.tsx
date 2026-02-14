export const SectionTag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="text-primary dark:text-primary mb-4 text-center text-sm tracking-widest">
    {'[ '} {children} {' ]'}
  </div>
);
