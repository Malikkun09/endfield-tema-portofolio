import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrambleText } from '../hooks/useScrambleText';
import { profile } from '../data/profile';

interface HeroSectionProps {
  isLoaded: boolean;
}

export default function HeroSection({ isLoaded }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const nameScramble = useScrambleText(profile.shortName, { trigger: false, delay: 300 });
  const roleScramble = useScrambleText('PORTFOLIO', { trigger: false, delay: 800 });
  const taglineScramble = useScrambleText(profile.tagline, { trigger: false, delay: 1300 });

  useEffect(() => {
    if (!isLoaded) return;

    nameScramble.startScramble();
    setTimeout(() => roleScramble.startScramble(), 500);
    setTimeout(() => taglineScramble.startScramble(), 1000);

    // Card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: -60, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );

    // Decorative elements
    gsap.fromTo(
      decorRef.current?.children || [],
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, stagger: 0.1, ease: 'power2.out' }
    );
  }, [isLoaded]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
      style={{ zIndex: 2 }}
    >
      {/* Decorative corner elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-neon/60" />
        <div className="absolute top-20 left-24 w-8 h-[1px] bg-neon/30" />
        <div className="absolute top-24 left-20 w-[1px] h-8 bg-neon/30" />
        <div className="absolute bottom-32 right-20 w-2 h-2 bg-holo/60" />
        <div className="absolute bottom-32 right-24 w-8 h-[1px] bg-holo/30" />
        <div className="absolute bottom-36 right-20 w-[1px] h-8 bg-holo/30" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(234,234,234,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,234,234,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-20 py-20 flex flex-col md:flex-row items-center gap-12 md:gap-0">
        {/* Left: Operator Card */}
        <div
          ref={cardRef}
          className="relative w-full md:w-[320px] lg:w-[380px] flex-shrink-0 opacity-0"
        >
          <div className="relative bg-slate border border-terminal/10 overflow-hidden">
            {/* Card header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal/10">
              <div className="w-2 h-2 bg-neon animate-pulse-neon" />
              <span className="font-mono text-[10px] text-neon tracking-wider">[REC]</span>
              <span className="font-mono text-[9px] text-terminal/30 ml-auto">SYS.ID: MF-09</span>
            </div>

            {/* Portrait */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/potrait.jpg"
                alt="Malik Portrait"
                className="w-full h-full object-cover"
              />
              {/* Scan line overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent animate-scan pointer-events-none" />

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-neon/50" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-neon/50" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-neon/50" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-neon/50" />
            </div>

            {/* Card footer - info */}
            <div className="px-4 py-3 border-t border-terminal/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-terminal/40">NAME</span>
                <span className="font-mono text-xs text-terminal">{profile.name.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-terminal/40">ROLE</span>
                <span className="font-mono text-xs text-neon">{profile.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-terminal/40">STATUS</span>
                <span className="font-mono text-xs text-holo">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-terminal/40">GOAL</span>
                <span className="font-mono text-[10px] text-terminal/60">{profile.goals}</span>
              </div>

              {/* Progress bars */}
              <div className="pt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-terminal/30 w-12">HTML/CSS</span>
                  <div className="flex-1 h-[2px] bg-terminal/10">
                    <div className="h-full bg-neon w-[90%]" />
                  </div>
                  <span className="font-mono text-[9px] text-neon">90%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-terminal/30 w-12">PYTHON</span>
                  <div className="flex-1 h-[2px] bg-terminal/10">
                    <div className="h-full bg-neon w-[85%]" />
                  </div>
                  <span className="font-mono text-[9px] text-neon">85%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-terminal/30 w-12">JS</span>
                  <div className="flex-1 h-[2px] bg-terminal/10">
                    <div className="h-full bg-neon w-[78%]" />
                  </div>
                  <span className="font-mono text-[9px] text-neon">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Massive Typography */}
        <div className="flex-1 flex flex-col items-start md:items-end text-right md:pl-12">
          {/* Name */}
          <div
            ref={nameRef}
            className="font-display text-[clamp(60px,12vw,180px)] font-bold leading-[0.85] tracking-[-0.04em] text-terminal"
          >
            {nameScramble.displayText || ' '}
          </div>

          {/* Role */}
          <div
            ref={roleRef}
            className="font-display text-[clamp(40px,8vw,120px)] font-bold leading-[0.85] tracking-[-0.02em] text-neon mt-[-0.1em]"
          >
            {roleScramble.displayText || ' '}
          </div>

          {/* Tagline */}
          <div className="mt-8 flex flex-col items-start md:items-end gap-2">
            <div className="font-mono text-sm md:text-base text-terminal/60 tracking-widest">
              {taglineScramble.displayText || ' '}
            </div>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neon/50 to-neon/50 md:from-neon/50" />
          </div>

          {/* Mission statement */}
          <div className="mt-8 max-w-md text-left md:text-right">
            <p className="font-mono text-xs text-terminal/40 leading-relaxed">
              {profile.heroSummary}
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-8 flex gap-8">
            <div className="text-center">
              <div className="font-display text-2xl text-neon">{profile.stats.projects}</div>
              <div className="font-mono text-[9px] text-terminal/30 mt-1">PROJECTS</div>
            </div>
            <div className="w-[1px] h-10 bg-terminal/10" />
            <div className="text-center">
              <div className="font-display text-2xl text-holo">{profile.stats.skills}</div>
              <div className="font-mono text-[9px] text-terminal/30 mt-1">SKILLS</div>
            </div>
            <div className="w-[1px] h-10 bg-terminal/10" />
            <div className="text-center">
              <div className="font-display text-2xl text-cyber">{profile.stats.certificates}</div>
              <div className="font-mono text-[9px] text-terminal/30 mt-1">CERTIFICATES</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-cursor-hover
              className="group relative px-8 py-3 border border-neon/40 font-mono text-xs text-neon tracking-wider hover:bg-neon hover:text-void transition-all duration-300"
            >
              <span className="relative z-10">[ OPEN_CHANNEL ]</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] text-terminal/30 tracking-widest">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-neon/50 to-transparent" />
      </div>
    </section>
  );
}
