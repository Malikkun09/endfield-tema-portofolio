import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrambleText, useHoverScramble } from '../hooks/useScrambleText';
import { skills as SKILLS, tools as TOOLS, currentLearning } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: string;
}

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${skill.level}%`,
        duration: 1.2,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, [skill.level, index]);

  const getColor = (level: number) => {
    if (level >= 80) return 'bg-neon';
    if (level >= 50) return 'bg-holo';
    if (level >= 30) return 'bg-cyber';
    return 'bg-terminal/30';
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`font-mono text-xs transition-colors ${isHovered ? 'text-neon' : 'text-terminal/70'}`}>
          {skill.name}
        </span>
        <span className="font-mono text-[10px] text-terminal/40">{skill.level}%</span>
      </div>
      <div className="h-[3px] bg-terminal/10 relative overflow-hidden">
        <div
          ref={barRef}
          className={`absolute inset-y-0 left-0 ${getColor(skill.level)} transition-all duration-300`}
          style={{ width: '0%' }}
        />
        {isHovered && (
          <div className="absolute inset-y-0 left-0 bg-neon/20 animate-pulse" style={{ width: `${skill.level}%` }} />
        )}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleScramble = useScrambleText('SKILL MATRIX', { trigger: false, delay: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => titleScramble.startScramble(),
      once: true,
    });

    return () => {
      st.kill();
    };
  }, []);

  const toolHover = useHoverScramble('TOOLS', 'Git/Rest/Mongo/Tailwind');

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-void"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="font-mono text-xs text-neon tracking-wider">[ 02 ]</div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
          <div className="font-display text-3xl md:text-4xl text-terminal tracking-tight">
            {titleScramble.displayText}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Programming Skills */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-neon" />
              <span className="font-mono text-xs text-neon tracking-wider">[ PROGRAMMING ]</span>
            </div>

            <div className="space-y-5">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Right: Tools & Tech */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-holo" />
              <span
                className="font-mono text-xs text-holo tracking-wider cursor-crosshair"
                onMouseEnter={toolHover.handleMouseEnter}
                onMouseLeave={toolHover.handleMouseLeave}
              >
                [{toolHover.displayText}]
              </span>
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-1 gap-3">
              {TOOLS.map((tool, i) => (
                <div
                  key={tool.name}
                  className="group bg-slate/50 border border-terminal/5 p-4 hover:border-neon/30 transition-all duration-300"
                  data-cursor-hover
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-terminal/30">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-mono text-sm text-terminal group-hover:text-neon transition-colors">
                        {tool.name}
                      </span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-neon/40 group-hover:bg-neon group-hover:shadow-neon transition-all" />
                  </div>
                  <div className="mt-1 ml-8 font-mono text-[10px] text-terminal/30">
                    {tool.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Currently Learning */}
            <div className="border border-cyber/20 p-5 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-cyber animate-pulse" />
                <span className="font-mono text-[10px] text-cyber tracking-wider">[ CURRENT_LEARNING ]</span>
              </div>
              <div className="space-y-2">
                {currentLearning.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-cyber/50">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-xs text-terminal/60">{item}</span>
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
