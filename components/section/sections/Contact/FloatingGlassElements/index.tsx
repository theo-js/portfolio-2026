import type { FC } from 'react';

export const FloatingGlassElements: FC = () => (
  <div className="glass:contents hidden">
    {/* Backdrop context */}
    <div className="absolute inset-0 -z-1 hidden rounded-3xl bg-transparent backdrop-blur-md md:block" />

    {/* Floating elements */}
    <>
      {/* Top */}
      <div
        className="animate-float absolute -top-27 left-[35%] -z-2 hidden h-22 w-22 rounded-lg border border-white/20 bg-white/10 opacity-60 shadow-[0_6px_30px_rgba(50,50,50,0.05),0_6px_15px_rgba(50,50,50,0.05)] md:block"
        style={{ animationDelay: '0s' }}
      />

      {/* Left */}
      <div
        className="animate-float absolute top-[33%] -left-30 hidden h-34 w-34 rounded-lg border border-white/20 bg-white/10 shadow-[0_6px_7px_rgba(50,50,50,0.05)] backdrop-blur-md md:block"
        style={{ animationDelay: '0.3s' }}
      />

      {/* Right */}
      <div
        className="mask-gradient-fade-bottom-quarter animate-float absolute -top-10 -right-20 -z-2 hidden h-60 w-60 rounded-lg border border-white/20 bg-white/10 shadow-[0_6px_30px_rgba(50,50,50,0.05),0_6px_15px_rgba(50,50,50,0.05)] md:block"
        style={{
          animationDelay: '1.1s',
        }}
      />

      {/* Bottom right  */}
      <div
        className="animate-float absolute -right-19 bottom-15 hidden h-22 w-22 rounded-lg border border-white/20 bg-white/10 shadow-[0_6px_15px_rgba(50,50,50,0.05)] backdrop-blur-md md:block"
        style={{ animationDelay: '0.9s' }}
      />

      {/* Bottom left */}
      <div
        className="animate-float absolute -bottom-24 left-[23%] -z-2 hidden h-16 w-16 rounded-lg border border-white/20 bg-white/10 opacity-60 shadow-[0_6px_15px_rgba(50,50,50,0.05)] md:block"
        style={{ animationDelay: '1.8s' }}
      />
    </>
  </div>
);
