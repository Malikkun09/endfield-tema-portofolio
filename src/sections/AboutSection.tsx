import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrambleText } from '../hooks/useScrambleText';
import { profile } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const titleScramble = useScrambleText('ABOUT ME', { trigger: false, delay: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        onEnter: () => titleScramble.startScramble(),
        once: true,
      },
    });

    tl.fromTo(
      content.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-void"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        <div className="flex items-center gap-4 mb-16">
          <div className="font-mono text-xs text-neon tracking-wider">[ 01 ]</div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
          <div className="font-display text-3xl md:text-4xl text-terminal tracking-tight">
            {titleScramble.displayText}
          </div>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div className="bg-slate border border-terminal/5 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon/60 via-neon to-transparent" />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl text-terminal">{profile.name}</h3>
                  <p className="font-mono text-xs text-neon mt-1">{profile.role}</p>
                </div>
                <div className="font-mono text-[10px] text-terminal/30 text-right">
                  <div>ID: MFE-2009</div>
                  <div>STATUS: ACTIVE</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-neon/60 mt-1 min-w-[80px]">SCHOOL</span>
                  <p className="font-mono text-xs text-terminal/70">{profile.school}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-neon/60 mt-1 min-w-[80px]">PERIOD</span>
                  <p className="font-mono text-xs text-terminal/70">{profile.period}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-neon/60 mt-1 min-w-[80px]">LOCATION</span>
                  <p className="font-mono text-xs text-terminal/70">{profile.location}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-neon/60 mt-1 min-w-[80px]">GOALS</span>
                  <p className="font-mono text-xs text-terminal/70">{profile.goals}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {profile.interests.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-neon/20 font-mono text-[10px] text-neon/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-l-2 border-neon/40 pl-6 py-2">
              <p className="font-mono text-sm text-terminal/60 italic leading-relaxed">
                &quot;{profile.aboutQuote}&quot;
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate/50 border border-terminal/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-holo" />
                <span className="font-mono text-[10px] text-holo tracking-wider">[ MISSION_STATEMENT ]</span>
              </div>
              <p className="font-mono text-xs text-terminal/60 leading-relaxed">
                {profile.missionStatement}
              </p>
            </div>

            <div className="bg-slate/50 border border-terminal/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-cyber" />
                <span className="font-mono text-[10px] text-cyber tracking-wider">[ EDUCATION_LOG ]</span>
              </div>
              <div className="space-y-3">
                {profile.education.map((edu, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-terminal/30 min-w-[80px]">{edu.year}</span>
                    <div className="w-2 h-2 border border-neon/40" />
                    <span className="font-mono text-xs text-terminal/70">{edu.school}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate/50 border border-terminal/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-neon" />
                <span className="font-mono text-[10px] text-neon tracking-wider">[ SOFT_SKILLS ]</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {profile.softSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-neon/60" />
                    <span className="font-mono text-xs text-terminal/60">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-neon/20 p-4">
              <div className="font-mono text-[10px] text-neon tracking-wider mb-2">[ MY_VALUE ]</div>
              <div className="space-y-1">
                {profile.values.map((val, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-neon/50">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-xs text-terminal/70">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
