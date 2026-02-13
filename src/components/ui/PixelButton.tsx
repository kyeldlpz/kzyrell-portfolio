import React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/soundManager';

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const variantStyles = {
  primary: 'from-arcade-cyan to-arcade-blue hover:from-arcade-pink hover:to-arcade-purple',
  secondary: 'from-gray-500 to-gray-700 hover:from-gray-400 hover:to-gray-600',
  danger: 'from-arcade-red to-red-800 hover:from-red-500 hover:to-red-700',
  success: 'from-arcade-green to-green-700 hover:from-green-400 hover:to-green-600',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  const handleClick = () => {
    if (!disabled) {
      soundManager.play('click');
      onClick?.();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      soundManager.play('hover');
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        font-pixel uppercase tracking-wider
        bg-gradient-to-b ${variantStyles[variant]} ${sizeStyles[size]}
        text-white border-4 border-transparent
        transition-colors duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:ring-4 focus-visible:ring-arcade-yellow 
        focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-black
        focus-visible:outline-none
        touch-target
        ${className}
      `}
      style={{
        boxShadow: disabled 
          ? '2px 2px 0 #333'
          : '4px 4px 0 #000, inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.3)',
      }}
      whileHover={disabled ? {} : { scale: 1.05, x: -2, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95, x: 2, y: 2 }}
    >
      {children}
    </motion.button>
  );
};

export default PixelButton;
