import { Code, Mic, Coffee, Download, LaptopMinimal } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeContext";
import { clsx } from 'clsx';

export default function AboutSection() {

  const { theme } = useTheme();

  const cardInfo = [
    {
      icon: <Code className="h-6 w-6 text-primary-foreground" />,
      title: "Web Developer",
      description:
        "Building websites that move fast and look good on any device — no matter how many tabs you have open.💻",
    },
    {
      icon: <Mic className="h-6 w-6 text-primary-foreground" />,
      title: "Orator",
      description:
        "The transition from standing in the crowd to addressing the crowd was not an easy choice but it was a wise one.",
    },
    {
      icon: <Coffee className="h-6 w-6 text-primary-foreground" />,
      title: "Easy",
      description:
        "I make my life easy by using shadcn/ui components, like I did in the top left corner of this rotated square",
    },
    {
      icon: <LaptopMinimal className="h-6 w-6 text-primary-foreground" />,
      title: "Student",
      description:
        "Academically grinding with a 9.07 GPA — because who says you can’t code and study? 📖",
    },
  ];

  return (
    <section id="about" className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 overflow-y-hidden">
            <span className={clsx(
              theme === 'light'
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500"
            )}>About Me</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - text */}
          <div className="space-y-6 text-justify">
            <h3 className="text-xl sm:text-2xl font-semibold">
              Full-Stack Developer. Curious Mind. <br />
              Powered by Coffee & Ambition.
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Hey! I'm Namit, a 3rd-year student at Jain University, Bengaluru,
              currently juggling a CGPA of 9.07, daily gym sessions, freelance
              gigs, and late-night coding marathons. I build clean, responsive,
              and user-friendly web applications that not only look good but
              work exactly how users expect (and clients love).
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              When I’m not coding, you’ll find me on stage hosting college fests
              or speaking at events, because debugging JavaScript and grabbing
              a mic both come naturally to me.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              My toolkit includes React.js, Node.js, Express.js, TypeScript,
              Redux, GraphQL, RESTful APIs, and Tailwind CSS, backed by tools
              like Git, GitHub, VS Code, ChatGPT, and Cursor AI. I love solving
              problems, optimizing user experience, and shipping things that
              work like magic.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              I'm not just aiming for a job. I'm chasing challenges, learning
              fast, and building with intent. If that sounds like your vibe —{" "}
              <span className="text-primary font-semibold">let's talk💬</span>
            </p>

            <div className="pt-4 p-2">
              <Button
                className={clsx("rounded-full text-base sm:text-lg p-4 sm:p-6 hover:scale-105 transition-transform duration-300 overflow-hidden",
                  theme === 'light'
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white hover:shadow-purple-500/25"
                  : "bg-gradient-to-r from-blue-500 to-red-500 hover:bg-white border-0 border-transparent hover:border-white"
                )}
                asChild
              >
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Download Resume
                  <Download className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2} />
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:mt-0 p-4">
            {cardInfo.map((card, index) => (
              <div
                key={index}
                className="transform-gpu transition-transform duration-300 hover:scale-105 hover:rotate-2"
              >
                <div className="bg-card backdrop-blur-md p-4 sm:p-6 rounded-xl border border-border hover:border-primary/40 flex flex-col justify-between h-full min-h-[220px]">
                  <div className="flex items-center gap-4">
                    <div className={clsx("w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4 rounded-md",
                      theme === 'light'
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
                      : "bg-gradient-to-r from-blue-500 to-red-500 hover:bg-white border-0 border-transparent hover:border-white"
                    )}>
                      {card.icon}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-semibold mb-2">
                      {card.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-[12px] sm:text-base">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
