import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { NeonText, ProgressBar, ScoreDisplay } from '../ui/GameElements';
import { PixelButton } from '../ui/PixelButton';
import { soundManager } from '../../utils/soundManager';

export const AchievementsSection: React.FC = () => {
  const { 
    visitSection, 
    addScore, 
    achievements, 
    score,
    visitedSections,
    resetProgress 
  } = useArcade();

  useEffect(() => {
    visitSection('achievements');
    addScore(5);
  }, [visitSection, addScore]);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const totalPoints = achievements.reduce((sum, a) => a.unlocked ? sum + a.points : sum, 0);
  const maxPoints = achievements.reduce((sum, a) => sum + a.points, 0);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      soundManager.play('gameOver');
      resetProgress();
    }
  };

  return (
    <div className="min-h-[80vh] py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-pixel text-2xl md:text-4xl mb-2">
          <NeonText color="yellow">TROPHY ROOM</NeonText>
        </h1>
        <p className="font-retro text-xl text-gray-400">
          YOUR ACHIEVEMENTS
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        className="max-w-4xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-arcade-dark border-2 border-arcade-cyan rounded-lg p-4 text-center">
          <ScoreDisplay score={score} label="TOTAL SCORE" className="scale-75" />
        </div>
        
        <div className="bg-arcade-dark border-2 border-arcade-yellow rounded-lg p-4 text-center">
          <span className="text-3xl block mb-2">🏆</span>
          <span className="font-pixel text-xl text-arcade-yellow">{unlockedAchievements.length}</span>
          <span className="font-pixel text-[10px] text-gray-400 block">TROPHIES</span>
        </div>
        
        <div className="bg-arcade-dark border-2 border-arcade-green rounded-lg p-4 text-center">
          <span className="text-3xl block mb-2">🗺️</span>
          <span className="font-pixel text-xl text-arcade-green">{visitedSections.length}/6</span>
          <span className="font-pixel text-[10px] text-gray-400 block">EXPLORED</span>
        </div>
        
        <div className="bg-arcade-dark border-2 border-arcade-pink rounded-lg p-4 text-center">
          <span className="text-3xl block mb-2">⭐</span>
          <span className="font-pixel text-xl text-arcade-pink">{totalPoints}/{maxPoints}</span>
          <span className="font-pixel text-[10px] text-gray-400 block">POINTS</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="max-w-md mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between mb-1">
          <span className="font-pixel text-[10px] text-arcade-yellow">COMPLETION</span>
          <span className="font-pixel text-[10px] text-arcade-green">
            {unlockedAchievements.length}/{achievements.length}
          </span>
        </div>
        <ProgressBar
          progress={(unlockedAchievements.length / achievements.length) * 100}
          color="yellow"
        />
      </motion.div>

      {/* Achievements Grid */}
      <div className="max-w-4xl mx-auto">
        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="font-pixel text-sm text-arcade-green mb-4 flex items-center gap-2">
              <span>🏆</span> UNLOCKED ({unlockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-r from-arcade-purple to-arcade-dark border-2 border-arcade-yellow rounded-lg p-4 flex items-center gap-4"
                >
                  <motion.span
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {achievement.icon}
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="font-pixel text-sm text-arcade-yellow">
                      {achievement.title}
                    </h3>
                    <p className="font-retro text-sm text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-pixel text-lg text-arcade-green">
                      +{achievement.points}
                    </span>
                    <span className="font-pixel text-[8px] text-gray-500 block">
                      POINTS
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-pixel text-sm text-gray-500 mb-4 flex items-center gap-2">
              <span>🔒</span> LOCKED ({lockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-arcade-dark border-2 border-gray-700 rounded-lg p-4 flex items-center gap-4 opacity-60"
                >
                  <span className="text-4xl grayscale">🔒</span>
                  <div className="flex-1">
                    <h3 className="font-pixel text-sm text-gray-500">
                      {achievement.title}
                    </h3>
                    <p className="font-retro text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-pixel text-lg text-gray-600">
                      +{achievement.points}
                    </span>
                    <span className="font-pixel text-[8px] text-gray-700 block">
                      POINTS
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Reset Button */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <PixelButton
          onClick={handleReset}
          variant="danger"
          size="sm"
        >
          🔄 RESET PROGRESS
        </PixelButton>
        <p className="font-retro text-xs text-gray-600 mt-2">
          Warning: This will reset all your achievements and score!
        </p>
      </motion.div>
    </div>
  );
};

export default AchievementsSection;
