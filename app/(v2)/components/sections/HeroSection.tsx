const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 md:px-6 lg:px-8">

        {/* Main heading - NAMIT RANA */}
        <div className="text-center">
          <h1
            className="font-black tracking-tighter"
            style={{
              fontSize: 'clamp(4rem, 15vw, 11rem)',
              background: 'linear-gradient(180deg, #001f65, #6895fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em',
              lineHeight: '1.1',
            }}
          >
            NAMIT RANA
          </h1>
        </div>

        {/* Image section - no circle */}
        <div className="mt-8 flex justify-center md:mt-12">
          <img
            src="/Namit.webp"
            alt="Namit Rana"
            className="h-64 w-auto object-contain md:h-80 lg:h-96"
          />
        </div>

        {/* DEVELOPER and FREELANCER tags */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:mt-12 md:flex-row md:gap-12 lg:gap-16">

          {/* DEVELOPER tag */}
          <div>
            <span
              className="text-sm font-bold uppercase tracking-[0.3em] md:text-base lg:text-lg"
              style={{
                background: 'linear-gradient(180deg, #001f65, #6895fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              D E V E L O P E R
            </span>
          </div>

          {/* FREELANCER tag */}
          <div>
            <span
              className="text-sm font-bold uppercase tracking-[0.3em] md:text-base lg:text-lg"
              style={{
                background: 'linear-gradient(180deg, #001f65, #6895fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              F R E E L A N C E R
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;