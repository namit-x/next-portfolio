'use client'

// import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
import { Button } from './ui/button'
import { clsx } from 'clsx'
import { useTheme } from './ThemeContext';

const ProjectCard = ({ project, }: { project: any; isRealLife?: boolean }) => {
  const { theme } = useTheme();
  return (
    <article className="group relative overflow-hidden rounded-xl glass border border-border/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">

      {/* Project Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Project Title Overlay */}
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium glass border border-primary/20 text-primary rounded-full hover:bg-primary/10 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl ? (
            <Button
              className={clsx("flex-1 bg-gradient text-white hover:opacity-90 transition-all duration-300 group/btn",
                theme === 'light'
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
                  : "bg-gradient-to-r from-blue-500 to-red-500 hover:bg-white border-0 border-transparent hover:border-white"
              )}
              asChild
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                Live Demo
              </a>
            </Button>
          ) : null}

          {project.githubUrl && (
            <Button
              variant="outline"
              className={`${project.liveUrl ? 'flex-1' : 'w-full'} glass border-border/30 hover:bg-muted/50 group/btn`}
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <GithubIcon className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;