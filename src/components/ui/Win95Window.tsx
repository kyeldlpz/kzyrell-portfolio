import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/soundManager';

interface Win95WindowProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
  showControls?: boolean;
  width?: string;
  height?: string;
}

export const Win95Window: React.FC<Win95WindowProps> = ({
  title,
  children,
  isOpen = true,
  onClose,
  onMinimize,
  onMaximize,
  className = '',
  showControls = true,
  width = 'auto',
  height = 'auto',
}) => {
  const handleClose = () => {
    soundManager.play('click');
    onClose?.();
  };

  const handleMinimize = () => {
    soundManager.play('click');
    onMinimize?.();
  };

  const handleMaximize = () => {
    soundManager.play('click');
    onMaximize?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`win95-window ${className}`}
          style={{ width, height }}
          role="dialog"
          aria-labelledby={`window-title-${title.replace(/\s/g, '-')}`}
        >
          {/* Title Bar */}
          <div className="win95-window__titlebar">
            <span 
              id={`window-title-${title.replace(/\s/g, '-')}`}
              className="win95-window__title truncate"
            >
              {title}
            </span>
            
            {showControls && (
              <div className="win95-window__controls" role="group" aria-label="Window controls">
                {onMinimize && (
                  <button
                    onClick={handleMinimize}
                    className="win95-window__btn"
                    aria-label="Minimize window"
                    title="Minimize"
                  >
                    _
                  </button>
                )}
                {onMaximize && (
                  <button
                    onClick={handleMaximize}
                    className="win95-window__btn"
                    aria-label="Maximize window"
                    title="Maximize"
                  >
                    □
                  </button>
                )}
                {onClose && (
                  <button
                    onClick={handleClose}
                    className="win95-window__btn"
                    aria-label="Close window"
                    title="Close"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="win95-window__content">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Win95Window;
