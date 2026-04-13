'use client'

import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";
import { useTypewriter } from "react-simple-typewriter";
import { Icon } from '@iconify/react';
import { useTheme } from './ThemeContext';

export default function HeroSection() {
  const [mee, setMee] = useState("Namit");
  const [animating, setAnimating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasManualOverride, setHasManualOverride] = useState(false);
  const { theme } = useTheme();

  const [text] = useTypewriter({
    words: [`— a self-taught web developer who loves turning ideas into digital reality. This isn't just a portfolio; it's a snapshot of what I build, how I grow, and why I care. I don't just write code — I speak to crowds, build projects and chase impact.`],
    typeSpeed: 40,
  });

  const techList = [
    { name: 'TypeScript', icon: 'logos:typescript-icon' },
    { name: 'React', icon: 'logos:react' },
    { name: 'JavaScript', icon: 'logos:javascript' },
    { name: 'Java', icon: 'logos:java' },
    { name: 'GraphQL', icon: 'logos:graphql' },
    { name: 'Python', icon: 'logos:python' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon' },
    { name: 'Git', icon: 'logos:git-icon' },
    { name: 'GitHub', icon: 'octicon:mark-github-16' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
    // { name: 'Express.js', icon: 'simple-icons:express' },
  ];

  const titles = ["Full-Stack Developer", "from India", "Web Developer", "Programmer", "Frontend-Developer", "Backend-Developer", "Freelancer", "Problem Solver"];
  const currentTitleIndex = useRef(0);

  const handleImageClick = () => {
    setHasManualOverride(true);
    setIsFlipped(prev => !prev);
  };

  // // Auto-flip timer - flips every 2 seconds
  // useEffect(() => {
  //   if (hasManualOverride) return;

  //   const flipInterval = setInterval(() => {
  //     setIsFlipped(prev => !prev);
  //   }, 5000);

  //   return () => clearInterval(flipInterval);
  // }, [hasManualOverride]);


  useEffect(() => {
    if (hasManualOverride) return;

    if (theme === "dark") {
      setIsFlipped(false); // Dark
    } else {
      setIsFlipped(true); // Real photo
    }
  }, [theme, hasManualOverride]);

  // Title animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        currentTitleIndex.current = (currentTitleIndex.current + 1) % titles.length;
        setMee(titles[currentTitleIndex.current]);
        setAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 scroll-smooth pt-16 lg:pt-20">
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden items-center w-full max-w-4xl mx-auto space-y-8">
        {/* Image Container for Mobile with Enhanced Flip Animation */}
        <div className="flex justify-center animate-fade-in" onClick={handleImageClick}>
          <div
            className="w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64"
            style={{ perspective: '1200px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front of card (Dark) */}
              <div className={clsx(
                "absolute w-full h-full rounded-full overflow-hidden p-[3px]",
                theme === 'light'
                  ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"
              )} style={{ backfaceVisibility: 'hidden' }}>
                <div className="relative w-full h-full">
                  <Image
                    src="/NamitDark.webp"
                    alt="Namit Dark"
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                    className="object-cover rounded-full"
                  />
                  {/* Subtle shine effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500"></div> */}
                </div>
              </div>

              {/* Back of card (Real photo) */}
              <div className={clsx(
                "absolute w-full h-full rounded-full overflow-hidden p-[3px]",
                theme === 'light'
                  ? "bg-gradient-to-r from-blue-500 via-purple-400 to-cyan-400"
                  : "bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
              )} style={{
                backfaceVisibility: `${isFlipped ? 'visible' : 'hidden'}`,
                transform: 'rotateY(180deg)'
              }}>
                <div className="relative w-full h-full">
                  <Image
                    src="/Namit.webp"
                    alt="Namit Real Photo"
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                    className="object-cover rounded-full"
                  />
                  {/* Subtle shine effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container for Mobile */}
        <div className="w-full text-center space-y-6">
          {/* Greeting */}
          <p className={clsx(
            "font-mono text-xl sm:text-2xl md:text-3xl animate-fade-in",
            theme === 'light'
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500"
          )}>
            Hello, I'm
          </p>

          {/* Name/Title Animation */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold animate-fade-in">
            <span
              className={clsx(
                "transition-all duration-500 block font-bold",
                theme === 'light' ? "text-slate-900" : "text-white",
                animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              {mee}
            </span>
          </h1>

          {/* Typewriter Text - Fixed width container */}
          <div className="w-full min-h-[140px] sm:min-h-[120px] px-2 sm:px-4">
            <p className={clsx(
              "text-sm sm:text-base font-mono leading-relaxed",
              theme === 'light' ? "text-slate-600" : "text-gray-400"
            )}>
              {text}
              <span className={clsx(
                "animate-pulse",
                theme === 'light' ? "text-slate-900" : "text-white"
              )}>|</span>
            </p>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 p-4">
            {techList.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center transform hover:scale-110 transition-transform duration-200"
              >
                <Icon icon={tech.icon} className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mt-6 px-2">
            <Button
              className={clsx(
                "rounded-md transition-all duration-500 ease-in-out w-full sm:w-auto",
                theme === 'light'
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
                  : "bg-gradient-to-r from-blue-500 to-red-500 hover:bg-white border-0 border-transparent hover:border-white"
              )}
              size="lg"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button
              className={clsx(
                "rounded-md font-bold transition-all duration-500 ease-in-out w-full sm:w-auto",
                theme === 'light'
                  ? "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg"
                  : "border border-gradient hover:border-white text-white  bg-black hover:bg-gradient-to-r from-blue-500 to-red-500"
              )}
              size="lg"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center w-full max-w-7xl mx-auto overflow-hidden">
        {/* Image Container for Desktop with Enhanced 3D Flip Animation */}
        <div className="w-1/2 flex justify-center animate-fade-in overflow-hidden" onClick={handleImageClick}>
          <div
            className="w-60 xl:w-[350px] h-60 xl:h-[600px] py-10 px-2 overflow-hidden"
            style={{ perspective: '1500px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                boxShadow: theme === 'light'
                  ? isHovered
                    ? '0 25px 50px rgba(100,116,139,0.3), 0 0 100px rgba(6,182,212,0.15)'
                    : '0 15px 35px rgba(100,116,139,0.2), 0 0 60px rgba(6,182,212,0.08)'
                  : isHovered
                    ? '0 25px 50px rgba(0,0,0,0.35), 0 0 100px rgba(59,130,246,0.1)'
                    : '0 15px 35px rgba(0,0,0,0.25), 0 0 60px rgba(59,130,246,0.05)'
              }}
            >
              {/* Front of card (Dark) */}
              <div
                className={clsx(
                  "absolute w-full h-full rounded-xl overflow-hidden p-[3px]",
                  theme === 'light'
                    ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500"
                    : "bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"
                )}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/NamitDark.webp"
                    alt="Namit Dark"
                    fill
                    priority
                    sizes="(max-width: 1280px) 240px, 350px"
                    className="object-cover rounded-xl"
                  />
                  {/* Subtle shine effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100"></div> */}
                </div>
              </div>

              {/* Back of card (Real photo) */}
              <div
                className={clsx(
                  "absolute w-full h-full rounded-xl overflow-hidden p-[3px]",
                  theme === 'light'
                    ? "bg-gradient-to-r from-blue-500 via-purple-400 to-cyan-400"
                    : "bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
                )}
                style={{
                  backfaceVisibility: `${isFlipped ? 'visible' : 'hidden'}`,
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/Namit.webp"
                    alt="Namit Real Photo"
                    fill
                    priority
                    sizes="(max-width: 1280px) 240px, 350px"
                    className="object-cover rounded-xl"
                  />
                  {/* Subtle shine effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container for Desktop - Fixed width */}
        <div className="w-1/2 max-w-2xl space-y-6 overflow-hidden">
          {/* Greeting */}
          <p className={clsx(
            "font-mono text-2xl xl:text-3xl animate-fade-in w-[200px]",
            theme === 'light'
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500"
          )}>
            Hello, I'm
          </p>

          {/* Name/Title Animation */}
          <h1 className="text-4xl xl:text-6xl font-bold animate-fade-in">
            <span
              className={clsx(
                "transition-all duration-500 block font-bold overflow-hidden py-2",
                theme === 'light' ? "text-slate-900" : "text-white",
                animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              {mee}
            </span>
          </h1>

          {/* Typewriter Text - Fixed dimensions to prevent layout shift */}
          <div className="w-full h-32 xl:h-36 overflow-hidden">
            <p className={clsx(
              "text-base xl:text-lg font-mono leading-relaxed",
              theme === 'light' ? "text-slate-600" : "text-gray-400"
            )}>
              {text}
              <span className={clsx(
                "animate-pulse",
                theme === 'light' ? "text-slate-900" : "text-white"
              )}>|</span>
            </p>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap gap-4 xl:gap-6 my-10 py-2">
            {techList.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center transform hover:scale-110 transition-transform duration-200"
              >
                <Icon icon={tech.icon} className="w-8 h-8 xl:w-10 xl:h-10" />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 animate-fade-in mt-8 p-4">
            <Button
              className={clsx(
                "rounded-md transition-all duration-500 ease-in-out hover:scale-105 transition-transform duration-300",
                theme === 'light'
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600"
                  : "bg-gradient-to-r from-blue-500 to-red-500 hover:bg-white border-0 border-transparent hover:border-white"
              )}
              size="lg"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button
              className={clsx(
                "rounded-md font-bold transition-all duration-500 ease-in-out hover:scale-105 transition-transform duration-300",
                theme === 'light'
                  ? "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg"
                  : "border border-gradient hover:border-white text-white bg-black hover:bg-black"
              )}
              size="lg"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}