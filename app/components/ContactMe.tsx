import { Mail, Linkedin, Github, Code, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
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
    icon: Linkedin,
    label: "LinkedIn",
    value: "View my profile",
    description: "Let’s grow our professional network",
    external: true,
  },
  {
    href: contactInfo.github,
    icon: Github,
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
