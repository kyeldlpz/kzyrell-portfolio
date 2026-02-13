import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { ArcadeCabinet } from '../ui/ArcadeCabinet';
import { NeonText } from '../ui/GameElements';
import { PixelButton } from '../ui/PixelButton';
import type { Section } from '../../machines/arcadeMachine';

export const HomeSection: React.FC = () => {
  const { navigate, earnAchievement, achievements, visitSection } = useArcade();

  // Check for first visit achievement
  useEffect(() => {
    visitSection('home');
    const firstVisit = achievements.find(a => a.id === 'first_visit');
    if (firstVisit && !firstVisit.unlocked) {
      earnAchievement('first_visit');
    }
  }, [achievements, earnAchievement, visitSection]);

  const cabinets: { section: Section; title: string; icon: string; description: string; color: 'cyan' | 'pink' | 'green' | 'yellow' | 'orange' }[] = [
    { section: 'about', title: 'About Me', icon: '👤', description: 'Learn my story', color: 'cyan' },
    { section: 'projects', title: 'Projects', icon: '🎮', description: 'Play my games', color: 'pink' },
    { section: 'skills', title: 'Skills', icon: '⚡', description: 'Power ups', color: 'green' },
    { section: 'achievements', title: 'Trophies', icon: '🏆', description: 'My achievements', color: 'yellow' },
    { section: 'contact', title: 'Contact', icon: '📡', description: 'Get in touch', color: 'orange' },
  ];

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-start pt-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        {/* Title */}
        <motion.h1 
          className="font-pixel text-2xl md:text-4xl mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <NeonText color="cyan" animate>KZY GUYS! WELCOME TO</NeonText>
        </motion.h1>
        
        <motion.h2
          className="font-pixel text-3xl md:text-5xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <NeonText color="pink" animate>THE ARCADE</NeonText>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-retro text-base md:text-lg text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          KZYRELL A. DELA PAZ
        </motion.p>

        {/* Blinking prompt */}
        <motion.div
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="font-pixel text-xs text-arcade-green cursor-blink">
            SELECT A CABINET TO BEGIN
          </span>
        </motion.div>
      </motion.div>

      {/* Arcade Cabinets Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full max-w-6xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {cabinets.map((cabinet, index) => (
          <motion.div
            key={cabinet.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <ArcadeCabinet
              title={cabinet.title}
              icon={cabinet.icon}
              description={cabinet.description}
              color={cabinet.color}
              onClick={() => navigate(cabinet.section)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Start Button */}
      <motion.div
        className="mt-6 mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <PixelButton
          onClick={() => navigate('projects')}
          size="lg"
        >
          🎮 START GAME
        </PixelButton>
      </motion.div>
    </div>
  );
};

export default HomeSection;
