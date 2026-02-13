import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  minDuration?: number;
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  minDuration = 2000,
  onComplete,
}) => {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      setProgress(0);

      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / minDuration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoader(false);
            onComplete?.();
          }, 300);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isLoading, minDuration, onComplete]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="loading-screen"
          role="alert"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          {/* Starfield Background */}
          <div className="starfield" aria-hidden="true" />

          {/* CRT Effect */}
          <div className="crt-effect absolute inset-0" aria-hidden="true" />

          {/* Logo/Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center z-10"
          >
            <h1 className="font-pixel text-arcade-cyan text-2xl md:text-4xl mb-2">
              RETRO ARCADE
            </h1>
            <h2 className="font-pixel text-arcade-pink text-sm md:text-xl">
              PORTFOLIO
            </h2>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 z-10"
          >
            <p className="loading-screen__text flex items-center gap-2">
              LOADING
              <span className="inline-flex">
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                >
                  .
                </motion.span>
              </span>
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="loading-screen__bar z-10"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-arcade-cyan to-arcade-pink"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </motion.div>

          {/* Progress Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-pixel text-xs text-arcade-green mt-4 z-10"
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Decorative Elements */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <p className="font-retro text-gray-500 text-sm">
              PRESS ANY KEY TO CONTINUE
            </p>
          </div>

          {/* Floating Pixels */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-arcade-cyan"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 20,
                  opacity: 0.5,
                }}
                animate={{
                  y: -20,
                  opacity: [0.5, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PageTransitionProps {
  children: React.ReactNode;
  isTransitioning?: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isTransitioning = false,
}) => {
  return (
    <AnimatePresence mode="wait">
      {!isTransitioning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ScanlineOverlayProps {
  enabled?: boolean;
}

export const ScanlineOverlay: React.FC<ScanlineOverlayProps> = ({
  enabled = true,
}) => {
  if (!enabled) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
    >
      {/* Scanlines */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        }}
      />
      
      {/* CRT vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Subtle screen flicker */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{
          opacity: [0, 0.02, 0, 0.01, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.8, 1],
        }}
      />
    </div>
  );
};

export default { LoadingScreen, PageTransition, ScanlineOverlay };
