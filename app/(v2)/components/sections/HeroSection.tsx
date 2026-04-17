import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center">
      <div className="v2-container py-12">
        {/* Main heading */}
        <h1
          className="v2-text-grad text-center font-black tracking-tighter"
          style={{ fontSize: 'var(--text-hero)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
        >
          NAMIT RANA
        </h1>

        {/* Portrait */}
        <div className="mt-8 flex justify-center md:mt-12">
          <Image
            src="/Namit.webp"
            alt="Namit Rana"
            width={600}
            height={800}
            priority
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 16rem"
            className="h-64 w-auto object-contain md:h-80 lg:h-96"
          />
        </div>

        {/* Role tags */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:mt-12 md:flex-row md:gap-12 lg:gap-16">
          <span
            className="v2-text-grad font-bold uppercase"
            style={{ fontSize: 'var(--text-base)', letterSpacing: '0.3em' }}
          >
            D E V E L O P E R
          </span>
          <span
            className="v2-text-grad font-bold uppercase"
            style={{ fontSize: 'var(--text-base)', letterSpacing: '0.3em' }}
          >
            F R E E L A N C E R
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
