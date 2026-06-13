import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrambleText } from '../hooks/useScrambleText';
import { Award, Users, Code, Trophy } from 'lucide-react';
import { experiences, certificates, goals } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_ICONS = [<Trophy size={18} />, <Users size={18} />, <Code size={18} />];

const COLOR_CLASSES: Record<string, { border: string; text: string; accent: string }> = {
  neon: { border: 'border-neon/30', text: 'text-neon', accent: 'bg-neon/30' },
  holo: { border: 'border-holo/30', text: 'text-holo', accent: 'bg-holo/30' },
  cyber: { border: 'border-cyber/30', text: 'text-cyber', accent: 'bg-cyber/30' },
};

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const titleScramble = useScrambleText('EXPERIENCE', { trigger: false, delay: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const exp = expRef.current;
    if (!section || !exp) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => titleScramble.startScramble(),
      once: true,
    });

    gsap.fromTo(
      exp.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: exp,
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
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-void"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        <div className="flex items-center gap-4 mb-16">
          <div className="font-mono text-xs text-neon tracking-wider">[ 04 ]</div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
          <div className="font-display text-3xl md:text-4xl text-terminal tracking-tight">
            {titleScramble.displayText}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2" ref={expRef}>
            <div className="space-y-6">
              {experiences.map((exp, i) => {
                const colors = COLOR_CLASSES[exp.color] ?? COLOR_CLASSES.neon;
                return (
                  <div
                    key={exp.title}
                    className="group bg-slate/30 border border-terminal/5 hover:border-neon/20 transition-all duration-300 p-6 relative overflow-hidden"
                    data-cursor-hover
                  >
                    <div className={`absolute top-0 left-0 w-full h-[2px] ${colors.accent}`} />

                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 border ${colors.border} flex items-center justify-center ${colors.text} flex-shrink-0`}
                      >
                        {EXPERIENCE_ICONS[i]}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-lg text-terminal group-hover:text-neon transition-colors">
                            {exp.title}
                          </h3>
                          <span className="font-mono text-[10px] text-terminal/30">{exp.period}</span>
                        </div>
                        <p className="font-mono text-xs text-terminal/60 leading-relaxed mb-2">
                          {exp.summary}
                        </p>
                        <p className="font-mono text-xs text-terminal/50 leading-relaxed mb-3">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.highlights.map((h) => (
                            <span
                              key={h}
                              className="font-mono text-[9px] px-2 py-0.5 border border-terminal/10 text-terminal/40"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border border-terminal/5 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-neon animate-pulse-neon" />
                <span className="font-mono text-xs text-neon tracking-wider">[ MY_GOALS ]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="font-mono text-[10px] text-cyber/60 mb-3 tracking-wider">SHORT_TERM</div>
                  <div className="space-y-2">
                    {goals.short.map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-cyber/40" />
                        <span className="font-mono text-xs text-terminal/60">{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-holo/60 mb-3 tracking-wider">MID_TERM</div>
                  <div className="space-y-2">
                    {goals.mid.map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-holo/40" />
                        <span className="font-mono text-xs text-terminal/60">{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-neon/60 mb-3 tracking-wider">LONG_TERM</div>
                  <div className="space-y-2">
                    {goals.long.map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-neon/40" />
                        <span className="font-mono text-xs text-terminal/60">{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate/30 border border-terminal/5 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Award size={14} className="text-neon" />
                <span className="font-mono text-xs text-neon tracking-wider">[ CERTIFICATES ]</span>
              </div>

              <div className="space-y-5">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="group border-l-2 border-neon/20 hover:border-neon pl-4 py-2 transition-colors"
                    data-cursor-hover
                  >
                    <div className="font-mono text-sm text-terminal group-hover:text-neon transition-colors leading-snug">
                      {cert.name}
                    </div>
                    <div className="font-mono text-[9px] text-neon/50 mt-1 tracking-wide">
                      [{cert.type}]
                    </div>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <span className="font-mono text-[10px] text-terminal/40">{cert.issuer}</span>
                      <span className="font-mono text-[10px] text-terminal/30 shrink-0">{cert.date}</span>
                    </div>
                    <p className="font-mono text-[10px] text-terminal/45 leading-relaxed mt-2 italic">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-terminal/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="font-display text-2xl text-neon">{certificates.length}</div>
                    <div className="font-mono text-[9px] text-terminal/30 mt-1">CERTIFICATES</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-2xl text-holo">2</div>
                    <div className="font-mono text-[9px] text-terminal/30 mt-1">HACKATHONS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
