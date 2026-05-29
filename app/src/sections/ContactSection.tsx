import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrambleText } from '../hooks/useScrambleText';
import { Github, Linkedin, Mail, MessageCircle, Globe, ExternalLink } from 'lucide-react';
import { contacts, profile, socialLinks } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  globe: Globe,
} as const;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ctaHovered, setCtaHovered] = useState(false);
  const titleScramble = useScrambleText('CONTACT_UPLINK', { trigger: false, delay: 0 });

  const ctaScramble = useScrambleText('OPEN_CHANNEL', {
    trigger: ctaHovered,
    delay: 0,
    duration: 500,
  });

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-void flex flex-col"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-16">
          <div className="font-mono text-xs text-neon tracking-wider">[ 05 ]</div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neon/30 to-transparent" />
          <div className="font-display text-3xl md:text-4xl text-terminal tracking-tight">
            {titleScramble.displayText}
          </div>
        </div>

        <div className="text-center mb-20">
          <div
            className="inline-block cursor-pointer"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            data-cursor-hover
          >
            <a href={socialLinks.email}>
              <div className="font-display text-[clamp(40px,8vw,100px)] font-bold text-terminal hover:text-neon transition-colors duration-300 leading-tight tracking-tight">
                [{ctaHovered ? ctaScramble.displayText || 'OPEN_CHANNEL' : 'OPEN_CHANNEL'}]
              </div>
            </a>
          </div>
          <p className="font-mono text-xs text-terminal/40 mt-4 tracking-wider">
            READY_TO_COLLABORATE // LET&apos;S_BUILD_SOMETHING
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {contacts.map((contact, i) => {
            const Icon = CONTACT_ICONS[contact.icon];
            return (
              <a
                key={i}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group bg-slate/20 border border-terminal/5 hover:border-neon/30 p-4 transition-all duration-300 flex items-center gap-4"
                data-cursor-hover
              >
                <div className="w-10 h-10 border border-terminal/10 group-hover:border-neon/40 flex items-center justify-center text-terminal/40 group-hover:text-neon transition-all flex-shrink-0">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-terminal/30 tracking-wider">{contact.label}</div>
                  <div className="font-mono text-sm text-terminal group-hover:text-neon transition-colors">
                    {contact.value}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto w-full mb-20">
          <div className="bg-slate/30 border border-terminal/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-neon tracking-wider">[ TERMINAL_MODE ]</span>
            </div>
            <div className="font-mono text-xs text-terminal/60 leading-relaxed">
              <span className="text-neon">$</span>{' '}
              <span className="text-terminal/40">echo</span>{' '}
              &quot;Halo, saya tertarik untuk berkolaborasi dengan Anda.&quot;
              <br />
              <span className="text-neon">$</span>{' '}
              <span className="text-terminal/40">contact</span>{' '}
              --email malikacconlyone@gmail.com
              <br />
              <span className="text-holo">{'>'}</span> Mengirim pesan...
              <br />
              <span className="text-holo">{'>'}</span>{' '}
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-terminal/5 pt-8 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-neon/40 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-neon">M</span>
              </div>
              <div>
                <div className="font-display text-sm text-terminal">{profile.shortName}</div>
                <div className="font-mono text-[9px] text-terminal/30">PORTFOLIO v2.0</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#hero" className="font-mono text-[10px] text-terminal/30 hover:text-neon transition-colors">
                HOME
              </a>
              <a href="#about" className="font-mono text-[10px] text-terminal/30 hover:text-neon transition-colors">
                ABOUT
              </a>
              <a href="#skills" className="font-mono text-[10px] text-terminal/30 hover:text-neon transition-colors">
                SKILLS
              </a>
              <a href="#projects" className="font-mono text-[10px] text-terminal/30 hover:text-neon transition-colors">
                PROJECTS
              </a>
              <a href="#contact" className="font-mono text-[10px] text-terminal/30 hover:text-neon transition-colors">
                CONTACT
              </a>
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-terminal/30 hover:text-neon transition-colors inline-flex items-center gap-1"
              >
                <ExternalLink size={10} />
                malikfajar.me
              </a>
            </div>

            <div className="font-mono text-[9px] text-terminal/20 text-center md:text-right">
              <div>© 2026 {profile.name.toUpperCase()}</div>
              <div>ALL SYSTEMS OPERATIONAL</div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
