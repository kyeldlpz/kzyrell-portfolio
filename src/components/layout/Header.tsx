import React from 'react';
import { motion } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { ScoreDisplay } from '../ui/GameElements';
import { soundManager } from '../../utils/soundManager';
import type { Section } from '../../machines/arcadeMachine';

export const Header: React.FC = () => {
  const { 
    currentSection, 
    score, 
    soundEnabled, 
    highContrastMode,
    toggleSound, 
    toggleHighContrast,
    navigate 
  } = useArcade();

  const navItems: { section: Section; label: string; icon: string }[] = [
    { section: 'home', label: 'HOME', icon: '🏠' },
    { section: 'about', label: 'ABOUT', icon: '👤' },
    { section: 'projects', label: 'PROJECTS', icon: '🎮' },
    { section: 'skills', label: 'SKILLS', icon: '⚡' },
    { section: 'achievements', label: 'TROPHIES', icon: '🏆' },
    { section: 'contact', label: 'CONTACT', icon: '📡' },
  ];

  const handleNavClick = (section: Section) => {
    navigate(section);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-arcade-dark bg-opacity-95 backdrop-blur-sm border-b-2 border-arcade-cyan"
      role="banner"
    >
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 focus-ring rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to home"
          >
            <span className="text-2xl" aria-hidden="true">🕹️</span>
            <span className="font-pixel text-xs text-arcade-cyan hidden sm:block">
              ARCADE
            </span>
          </motion.button>

          {/* Navigation */}
          <nav 
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map(({ section, label, icon }) => (
              <motion.button
                key={section}
                onClick={() => handleNavClick(section)}
                onMouseEnter={() => soundManager.play('hover')}
                className={`
                  px-3 py-2 font-pixel text-[10px] rounded transition-colors
                  focus-ring touch-target
                  ${currentSection === section 
                    ? 'bg-arcade-cyan text-arcade-black' 
                    : 'text-gray-400 hover:text-arcade-cyan hover:bg-arcade-purple'}
                `}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                aria-current={currentSection === section ? 'page' : undefined}
              >
                <span className="mr-1" aria-hidden="true">{icon}</span>
                {label}
              </motion.button>
            ))}
          </nav>

          {/* Score & Controls */}
          <div className="flex items-center gap-4">
            {/* Score Display */}
            <div className="hidden sm:block">
              <ScoreDisplay score={score} className="scale-75" />
            </div>

            {/* Settings Buttons */}
            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <motion.button
                onClick={() => {
                  soundManager.play('click');
                  toggleSound();
                }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-colors focus-ring touch-target
                  ${soundEnabled 
                    ? 'border-arcade-green bg-arcade-green bg-opacity-20' 
                    : 'border-gray-600 bg-gray-800'}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
                aria-pressed={soundEnabled}
              >
                <span aria-hidden="true">
                  {soundEnabled ? '🔊' : '🔇'}
                </span>
              </motion.button>

              {/* High Contrast Toggle */}
              <motion.button
                onClick={() => {
                  soundManager.play('click');
                  toggleHighContrast();
                }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-colors focus-ring touch-target
                  ${highContrastMode 
                    ? 'border-arcade-yellow bg-arcade-yellow bg-opacity-20' 
                    : 'border-gray-600 bg-gray-800'}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={highContrastMode ? 'Disable high contrast' : 'Enable high contrast'}
                aria-pressed={highContrastMode}
              >
                <span aria-hidden="true">
                  {highContrastMode ? '☀️' : '🌙'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className="md:hidden border-t border-arcade-purple"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map(({ section, icon }) => (
            <motion.button
              key={section}
              onClick={() => handleNavClick(section)}
              className={`
                p-2 rounded focus-ring touch-target
                ${currentSection === section 
                  ? 'text-arcade-cyan' 
                  : 'text-gray-500'}
              `}
              whileTap={{ scale: 0.9 }}
              aria-label={section}
              aria-current={currentSection === section ? 'page' : undefined}
            >
              <span className="text-xl">{icon}</span>
            </motion.button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
