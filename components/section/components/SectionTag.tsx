export const SectionTag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="text-primary dark:text-primary glass:text-white/80 text-center text-sm tracking-widest">
    {'[ '} {children} {' ]'}
  </div>
);
