import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrambleText } from '../hooks/useScrambleText';
import { ExternalLink, Github } from 'lucide-react';
import { projects as PROJECTS, socialLinks } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof PROJECTS)[number];

function HolographicCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rx: 0, ry: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const ry = ((x - centerX) / centerX) * 12;
    const rx = -((y - centerY) / centerY) * 12;

    setTransform({ rx, ry });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rx: 0, ry: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      <div
        className="relative bg-slate border border-terminal/10 overflow-hidden transition-all duration-200"
        style={{
          transform: `rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic glow overlay */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(204, 255, 0, 0.15), transparent 60%)`,
          }}
        />

        {/* Project image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span className={`font-mono text-[9px] px-2 py-1 border ${
              project.status === 'COMPLETED'
                ? 'border-neon/40 text-neon bg-neon/10'
                : 'border-cyber/40 text-cyber bg-cyber/10'
            }`}>
              [{project.status}]
            </span>
          </div>

          {/* Project number */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-terminal/30">
            {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 relative">
          {'featured' in project && project.featured && (
            <div className="font-mono text-[9px] text-cyber tracking-wider mb-2">[ PROJEK TERBESAR ]</div>
          )}
          <h3 className="font-display text-xl text-terminal group-hover:text-neon transition-colors mb-2">
            {project.title}
          </h3>
          <div className="space-y-2 mb-4">
            <p className="font-mono text-xs text-terminal/50 leading-relaxed">
              <span className="text-holo/70">PROBLEM:</span> {project.problem}
            </p>
            <p className="font-mono text-xs text-terminal/50 leading-relaxed">
              <span className="text-neon/70">SOLUSI:</span> {project.solution}
            </p>
            {'statusNote' in project && project.statusNote && (
              <p className="font-mono text-[10px] text-cyber/80 leading-relaxed">
                <span className="text-cyber">STATUS:</span> {project.statusNote}
              </p>
            )}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[9px] px-2 py-0.5 border border-terminal/10 text-terminal/40">
                {t}
              </span>
            ))}
          </div>

          {/* Role */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[9px] text-holo/60">ROLE:</span>
            <span className="font-mono text-[10px] text-terminal/50">{project.role}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-terminal/40 hover:text-neon transition-colors"
              data-cursor-hover
            >
              <Github size={12} />
              SOURCE
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-terminal/40 hover:text-neon transition-colors"
              data-cursor-hover
            >
              <ExternalLink size={12} />
              DEMO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleScramble = useScrambleText('PROJECTS', { trigger: false, delay: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => titleScramble.startScramble(),
      once: true,
    });

    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-void"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="font-mono text-xs text-neon tracking-wider">[ 03 ]</div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
          <div className="font-display text-3xl md:text-4xl text-terminal tracking-tight">
            {titleScramble.displayText}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <HolographicCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-terminal/40 hover:text-neon transition-colors border border-terminal/10 px-6 py-3 hover:border-neon/30"
            data-cursor-hover
          >
            <Github size={14} />
            [ VIEW_ALL_PROJECTS ]
          </a>
        </div>
      </div>
    </section>
  );
}
