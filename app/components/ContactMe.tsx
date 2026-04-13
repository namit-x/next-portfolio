'use client'

import { Mail, Code, MapPin, Calendar } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { Card, CardContent } from "./ui/card";
import { clsx } from 'clsx';
import { useTheme } from "./ThemeContext"; // remove .tsx

const contactInfo = {
  email: "namitwork099@gmail.com",
  linkedin: "www.linkedin.com/in/namit-raana",
  github: "https://github.com/namit-x",
  leetcode:"https://leetcode.com/u/namitrana/",
  location: "Available Worldwide",
  availability: "Open to Opportunities",
};

type ContactMethod = {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  description: string;
  external?: boolean;
};

const contactMethods: ContactMethod[] = [
  {
    href: `mailto:${contactInfo.email}`,
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    description: "Reach out directly via email",
  },
  {
    href: `https://${contactInfo.linkedin}`,
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "View my profile",
    description: "Let’s grow our professional network",
    external: true,
  },
  {
    href: contactInfo.github,
    icon: GithubIcon,
    label: "GitHub",
    value: "Check my repos",
    description: "Browse my projects & code samples",
    external: true,
  },
  {
    href: contactInfo.leetcode,
    icon: Code,
    label: "Leetcode",
    value: "Check my consistency",
    description: "Prove of consistency, make sure to see max streak.",
    external: true,
  },
];

const ContactCard: React.FC<{ method: ContactMethod }> = ({ method }) => {
  const Icon = method.icon;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-5">
        <a
          href={method.href}
          {...(method.external && { target: "_blank", rel: "noopener noreferrer" })}
          className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors"
          aria-label={`${method.label} - ${method.description}`}
        >
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">{method.label}</h4>
            <p className="text-sm text-muted-foreground">{method.description}</p>
          </div>
        </a>
      </CardContent>
    </Card>
  );
};

const ContactMe = () => {
  const { theme } = useTheme(); // FIX: get theme

  return (
    <section
      id="contact"
      className="section-container min-h-screen flex flex-col items-center justify-center py-16"
      aria-labelledby="contact-heading"
    >
      <header className="text-center max-w-3xl space-y-6">
        <h1
          id="contact-heading"
          className={clsx(
            "text-3xl sm:text-4xl font-bold p-2",
            theme === 'light'
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500"
          )}
        >
          Let’s Build Something Together
        </h1>
        <p className="text-lg text-muted-foreground">
          Passionate about crafting modern web solutions. I’m always excited to collaborate on impactful projects that push the boundaries.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-10 mt-12 w-full max-w-6xl">
        
        {/* Left Info Panel */}
        <Card className="p-8 bg-primary/5 border-primary/20 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">About Me</h2>
          <p className="text-muted-foreground">
            I’m a full-stack developer specialized in building responsive, performant web applications.
            Currently seeking exciting internship opportunities to grow my skillset and contribute to meaningful projects.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{contactInfo.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{contactInfo.availability}</span>
            </div>
          </div>
        </Card>

        {/* Contact Methods Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, idx) => (
            <ContactCard key={idx} method={method} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to start a conversation?
            </h3>
            <p className="text-muted-foreground mb-6">
              I typically respond within 24 hours. Let's turn ideas into reality.
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition"
            >
              <Mail className="w-5 h-5" />
              Send Me a Message
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactMe;
