import React from 'react';
import { motion } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { ProgressBar } from '../ui/GameElements';

export const Footer: React.FC = () => {
  const { progress, achievements, visitedSections } = useArcade();
  
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 z-40 bg-arcade-dark bg-opacity-95 backdrop-blur-sm border-t-2 border-arcade-purple"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-32">
              <ProgressBar 
                progress={progress} 
                label="PROGRESS" 
                showPercentage={true}
                color="cyan"
              />
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-pixel text-[8px]">SECTIONS:</span>
              <span className="font-pixel text-xs text-arcade-green">
                {visitedSections.length}/6
              </span>
            </div>
          </div>

          {/* Achievements Summary */}
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">🏆</span>
            <span className="font-pixel text-xs text-arcade-yellow">
              {unlockedAchievements}/{totalAchievements}
            </span>
          </div>

          {/* Credits */}
          <motion.div 
            className="hidden md:flex items-center gap-2 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="font-retro text-sm">
              © 2024 RETRO ARCADE PORTFOLIO
            </span>
            <span className="font-pixel text-[8px] text-arcade-cyan animate-pulse">
              INSERT COIN
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
