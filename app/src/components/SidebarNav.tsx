import { useState, useEffect } from 'react';
import {
  Home,
  User,
  Code2,
  Layers,
  Trophy,
  Mail,
  Github,
  Linkedin,
  Globe,
} from 'lucide-react';
import { socialLinks } from '../data/profile';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', icon: <Home size={18} />, label: 'HOME' },
  { id: 'about', icon: <User size={18} />, label: 'ABOUT' },
  { id: 'skills', icon: <Code2 size={18} />, label: 'SKILLS' },
  { id: 'projects', icon: <Layers size={18} />, label: 'PROJECTS' },
  { id: 'experience', icon: <Trophy size={18} />, label: 'EXP' },
  { id: 'contact', icon: <Mail size={18} />, label: 'CONTACT' },
];

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0 };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: rect.top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top <= 200 && section.top > closest.top) return section;
        return closest;
      }, sections[0]);

      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col items-center py-6 bg-void/80 backdrop-blur-sm border-r border-terminal/5 w-14">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-8 h-8 border border-neon/40 flex items-center justify-center">
            <span className="font-display text-xs font-bold text-neon">M</span>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col items-center gap-2 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              data-cursor-hover
              className={`relative w-10 h-10 flex items-center justify-center transition-all duration-300 group ${
                activeSection === item.id
                  ? 'text-neon'
                  : 'text-terminal/40 hover:text-terminal/70'
              }`}
            >
              {/* Active indicator */}
              {activeSection === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-neon shadow-neon" />
              )}

              {item.icon}

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-slate border border-terminal/10 text-terminal text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                [{item.label}]
              </div>
            </button>
          ))}
        </div>

        {/* Social links */}
        <div className="flex flex-col items-center gap-3 mt-auto">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center text-terminal/30 hover:text-neon transition-colors"
            data-cursor-hover
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center text-terminal/30 hover:text-neon transition-colors"
            data-cursor-hover
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center text-terminal/30 hover:text-neon transition-colors"
            data-cursor-hover
            aria-label="Website"
          >
            <Globe size={16} />
          </a>
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-void/90 backdrop-blur-sm border-t border-terminal/5 px-4 py-2">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 transition-colors ${
                activeSection === item.id
                  ? 'text-neon'
                  : 'text-terminal/40'
              }`}
            >
              {item.icon}
              <span className="text-[8px] font-mono">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
