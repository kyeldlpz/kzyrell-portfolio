import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScoreDisplayProps {
  score: number;
  label?: string;
  showAnimation?: boolean;
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  label = 'SCORE',
  showAnimation = true,
  className = '',
}) => {
  const formattedScore = score.toString().padStart(6, '0');

  return (
    <div 
      className={`flex flex-col items-center ${className}`}
      role="status"
      aria-label={`${label}: ${score} points`}
    >
      <span className="font-pixel text-xs text-arcade-yellow uppercase tracking-widest mb-1">
        {label}
      </span>
      <div className="bg-arcade-black border-2 border-arcade-green px-4 py-2 rounded">
        <AnimatePresence mode="wait">
          <motion.span
            key={score}
            initial={showAnimation ? { opacity: 0, y: -10 } : {}}
            animate={{ opacity: 1, y: 0 }}
            exit={showAnimation ? { opacity: 0, y: 10 } : {}}
            className="score-display font-pixel text-xl"
          >
            {formattedScore}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'green' | 'cyan' | 'pink' | 'yellow';
  className?: string;
}

const progressColors = {
  green: 'from-arcade-green to-green-400',
  cyan: 'from-arcade-cyan to-cyan-400',
  pink: 'from-arcade-pink to-pink-400',
  yellow: 'from-arcade-yellow to-yellow-400',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  color = 'green',
  className = '',
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div 
      className={className}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || `Progress: ${clampedProgress}%`}
    >
      {label && (
        <span className="font-pixel text-xs text-arcade-cyan block mb-1">
          {label}
        </span>
      )}
      <div className="retro-progress">
        <motion.div
          className={`retro-progress__bar bg-gradient-to-r ${progressColors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {showPercentage && (
          <span className="retro-progress__text">
            {clampedProgress}%
          </span>
        )}
      </div>
    </div>
  );
};

interface SkillMeterProps {
  level: number;
  maxLevel?: number;
  label?: string;
  className?: string;
}

export const SkillMeter: React.FC<SkillMeterProps> = ({
  level,
  maxLevel = 5,
  label,
  className = '',
}) => {
  return (
    <div 
      className={className}
      role="meter"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={maxLevel}
      aria-label={label ? `${label}: ${level} out of ${maxLevel}` : undefined}
    >
      {label && (
        <span className="font-pixel text-xs text-arcade-cyan block mb-1">
          {label}
        </span>
      )}
      <div className="skill-meter">
        {Array.from({ length: maxLevel }).map((_, index) => (
          <motion.div
            key={index}
            className={`skill-meter__block ${
              index < level ? 'skill-meter__block--filled' : ''
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description?: string;
  unlocked?: boolean;
  points?: number;
  className?: string;
  onClick?: () => void;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  title,
  description,
  unlocked = false,
  points,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        achievement-badge
        ${unlocked ? '' : 'achievement-badge--locked'}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={onclick ? { scale: 1.05 } : {}}
      role="listitem"
      aria-label={`${title}${unlocked ? '' : ' (Locked)'}: ${description || ''}`}
    >
      <span className="text-lg" aria-hidden="true">
        {unlocked ? icon : '🔒'}
      </span>
      <div className="flex flex-col">
        <span className="font-pixel text-[8px] uppercase">{title}</span>
        {description && (
          <span className="text-[10px] opacity-75">{description}</span>
        )}
      </div>
      {points && unlocked && (
        <span className="font-pixel text-[10px] ml-auto">
          +{points}
        </span>
      )}
    </motion.div>
  );
};

interface NeonTextProps {
  children: React.ReactNode;
  color?: 'cyan' | 'pink' | 'green' | 'yellow';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  animate?: boolean;
}

export const NeonText: React.FC<NeonTextProps> = ({
  children,
  color = 'cyan',
  as: Component = 'span',
  className = '',
  animate = false,
}) => {
  const colorClass = {
    cyan: 'neon-text',
    pink: 'neon-text neon-text--pink',
    green: 'neon-text neon-text--green',
    yellow: 'neon-text neon-text--yellow',
  }[color];

  if (animate) {
    return (
      <motion.span
        className={`${colorClass} ${className}`}
        animate={{
          textShadow: [
            '0 0 5px currentColor, 0 0 10px currentColor',
            '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            '0 0 5px currentColor, 0 0 10px currentColor',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <Component className={`${colorClass} ${className}`}>
      {children}
    </Component>
  );
};

export default { ScoreDisplay, ProgressBar, SkillMeter, AchievementBadge, NeonText };
