import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { ScanlineOverlay } from '../ui/LoadingScreen';

interface MainLayoutProps {
  children: React.ReactNode;
  showScanlines?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  showScanlines = true,
}) => {
  return (
    <div className="min-h-screen bg-arcade-black text-white grid-bg">
      {/* Starfield Background */}
      <div className="starfield" aria-hidden="true" />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main 
        id="main-content"
        className="pt-24 md:pt-20 pb-16 min-h-screen"
        role="main"
        tabIndex={-1}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />

      {/* CRT Scanline Effect */}
      <ScanlineOverlay enabled={showScanlines} />
    </div>
  );
};

export default MainLayout;
