import React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/soundManager';

interface ArcadeCabinetProps {
  title: string;
  icon: string;
  description?: string;
  onClick?: () => void;
  isLocked?: boolean;
  isActive?: boolean;
  className?: string;
  color?: 'cyan' | 'pink' | 'green' | 'yellow' | 'orange';
}

const colorStyles = {
  cyan: {
    border: 'border-arcade-cyan',
    glow: 'shadow-neon-cyan',
    hoverBorder: 'hover:border-arcade-pink',
    text: 'text-arcade-cyan',
  },
  pink: {
    border: 'border-arcade-pink',
    glow: 'shadow-neon-pink',
    hoverBorder: 'hover:border-arcade-cyan',
    text: 'text-arcade-pink',
  },
  green: {
    border: 'border-arcade-green',
    glow: 'shadow-neon-green',
    hoverBorder: 'hover:border-arcade-yellow',
    text: 'text-arcade-green',
  },
  yellow: {
    border: 'border-arcade-yellow',
    glow: '0 0 10px #ffff00, 0 0 20px #ffff00',
    hoverBorder: 'hover:border-arcade-orange',
    text: 'text-arcade-yellow',
  },
  orange: {
    border: 'border-arcade-orange',
    glow: '0 0 10px #ff6600, 0 0 20px #ff6600',
    hoverBorder: 'hover:border-arcade-red',
    text: 'text-arcade-orange',
  },
};

export const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({
  title,
  icon,
  description,
  onClick,
  isLocked = false,
  isActive = false,
  className = '',
  color = 'cyan',
}) => {
  const styles = colorStyles[color];

  const handleClick = () => {
    if (!isLocked) {
      soundManager.play('select');
      onClick?.();
    } else {
      soundManager.play('error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleMouseEnter = () => {
    if (!isLocked) {
      soundManager.play('hover');
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      aria-label={`${title}${isLocked ? ' (Locked)' : ''}`}
      aria-disabled={isLocked}
      className={`
        arcade-cabinet
        ${styles.border}
        ${!isLocked && styles.hoverBorder}
        ${isActive ? 'ring-4 ring-white ring-opacity-50' : ''}
        ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={isLocked ? {} : { scale: 1.05, y: -5 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cabinet Screen */}
      <div className="arcade-cabinet__screen">
        <div className="text-center">
          {/* Icon */}
          <motion.div
            className="text-5xl mb-3"
            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isLocked ? '🔒' : icon}
          </motion.div>
          
          {/* Title */}
          <h3 className={`font-pixel text-xs ${styles.text} uppercase tracking-wider`}>
            {title}
          </h3>
          
          {/* Description */}
          {description && (
            <p className="font-retro text-gray-400 text-sm mt-2">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Cabinet Controls */}
      <div className="arcade-cabinet__controls">
        <div 
          className={`arcade-cabinet__button bg-red-500 ${styles.border}`}
          aria-hidden="true"
        />
        <div 
          className={`arcade-cabinet__button bg-blue-500 ${styles.border}`}
          aria-hidden="true"
        />
        <div 
          className={`arcade-cabinet__button bg-green-500 ${styles.border}`}
          aria-hidden="true"
        />
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
          <span className="font-pixel text-xs text-gray-400">LOCKED</span>
        </div>
      )}

      {/* Neon Glow Effect */}
      {!isLocked && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: [
              `0 0 5px currentColor`,
              `0 0 15px currentColor`,
              `0 0 5px currentColor`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: color === 'cyan' ? '#00fff5' : color === 'pink' ? '#ff00ff' : '#00ff00' }}
        />
      )}
    </motion.div>
  );
};

export default ArcadeCabinet;
