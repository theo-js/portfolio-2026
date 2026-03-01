export const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="from-primary via-secondary to-tertiary glass:text-white mb-12 bg-gradient-to-r bg-clip-text py-4 text-center text-5xl text-transparent md:text-6xl md:tracking-tight">
    {children}
  </h2>
);
