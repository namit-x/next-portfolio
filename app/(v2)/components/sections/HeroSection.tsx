// import namitCutout from "@/assets/namit.png";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Subtle texture dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Main content */}
      <div className="relative z-10 flex h-full w-full">
        {/* Left: Typography block */}
        <div className="flex flex-1 flex-col justify-center pl-[6vw] md:pl-[8vw] lg:pl-[10vw]">
          {/* Subtitle above name */}
          <p className="text-hero-subtitle mb-4 font-body text-sm uppercase tracking-[0.35em] md:text-base">
            Developer & Freelancer
          </p>

          {/* The name — massive, dominant */}
          <h1 className="hero-name-gradient hero-name-glow font-display text-hero-name leading-[0.85] font-extrabold"
            style={{
              fontSize: 'clamp(4rem, 12vw, 14rem)',
            }}
          >
            NAMIT
            <br />
            RANA
          </h1>

          {/* Minimal accent line */}
          <div className="mt-8 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Right: Photo (light mode only) */}
        <div className="hidden lg:flex items-end justify-end pr-[4vw] pb-0 w-[45%]">
          <img
            src="/Namit.webp"
            alt="Namit Rana"
            className="hero-image-fade h-[85vh] w-auto max-w-none object-contain object-bottom dark:opacity-10 dark:blur-sm transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
