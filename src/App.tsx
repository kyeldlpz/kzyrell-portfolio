import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArcadeProvider, useArcade } from './context/ArcadeContext';
import { MainLayout } from './components/layout';
import { LoadingScreen, PageTransition } from './components/ui/LoadingScreen';
import {
  HomeSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  AchievementsSection,
  ContactSection,
} from './components/sections';
import { MemoryGame } from './components/games';

// Section renderer component
const SectionRenderer: React.FC = () => {
  const { currentSection, isTransitioning } = useArcade();
  const [showMiniGame, setShowMiniGame] = useState(false);

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomeSection />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  // Easter egg: Konami code for mini-game
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setShowMiniGame(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <PageTransition isTransitioning={isTransitioning}>
        {renderSection()}
      </PageTransition>
      
      {/* Mini-game modal */}
      <AnimatePresence>
        {showMiniGame && (
          <MemoryGame onClose={() => setShowMiniGame(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Main App component
const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        minDuration={2500}
        onComplete={() => setIsLoading(false)}
      />
      
      {!isLoading && (
        <MainLayout>
          <SectionRenderer />
        </MainLayout>
      )}
    </>
  );
};

function App() {
  return (
    <ArcadeProvider>
      <AppContent />
    </ArcadeProvider>
  );
}

export default App;
