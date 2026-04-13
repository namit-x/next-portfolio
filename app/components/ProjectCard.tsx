// import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button'
import { clsx } from 'clsx'
import { useTheme } from './ThemeContext';

const ProjectCard = ({ project, }: { project: any; isRealLife?: boolean }) => {
  const { theme } = useTheme();
  return (
    <article className="group relative overflow-hidden rounded-xl glass border border-border/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">

      {/* Project Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
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
                <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
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