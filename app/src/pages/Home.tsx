import { useState, useCallback } from 'react';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import HexGridCanvas from '../components/HexGridCanvas';
import SidebarNav from '../components/SidebarNav';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ContactSection from '../sections/ContactSection';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative bg-void min-h-screen">
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Background effects */}
      <HexGridCanvas />
      <CustomCursor />

      {/* Navigation */}
      {isLoaded && <SidebarNav />}

      {/* Main content */}
      <main className="relative" style={{ zIndex: 2 }}>
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
