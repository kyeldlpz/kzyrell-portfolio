import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { Win95Window } from '../ui/Win95Window';
import { PixelButton } from '../ui/PixelButton';
import { NeonText, ProgressBar } from '../ui/GameElements';

export const AboutSection: React.FC = () => {
  const { visitSection, addScore, navigate } = useArcade();
  const [activeTab, setActiveTab] = useState<'bio' | 'story' | 'stats'>('bio');
  const [typedText, setTypedText] = useState('');
  
  const fullBio = `Hello, World! I'm Kzyrell A. Dela Paz, with a passion to create and innovate in the world of technology.
  
My journey in tech started with a curiosity for how things work, and evolved into a career building innovative solutions.

When I'm not coding, you can find me playing sports, playing online games, or learning new technologies.

Welcome to my arcade - feel free to explore and play around!`;

  useEffect(() => {
    visitSection('about');
    addScore(5);
  }, [visitSection, addScore]);

  // Typewriter effect
  useEffect(() => {
    if (activeTab === 'bio') {
      setTypedText('');
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullBio.length) {
          setTypedText(fullBio.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const stats = [
    { label: 'Years Coding', value: 5, icon: '⏰' },
    { label: 'Projects Completed', value: 30, icon: '🎮' },
    { label: 'Technologies', value: 15, icon: '⚡' },
    { label: 'Coffee Consumed', value: 9999, icon: '☕' },
  ];

  const timeline = [
    { year: '2019', event: 'Started coding journey', icon: '🌟' },
    { year: '2020', event: 'First professional project', icon: '🚀' },
    { year: '2021', event: 'Specialized in frontend', icon: '💻' },
    { year: '2022', event: 'Led major projects', icon: '👑' },
    { year: '2023', event: 'Full-stack development', icon: '🎯' },
    { year: '2024', event: 'Building the arcade!', icon: '🕹️' },
  ];

  return (
    <div className="min-h-[80vh] py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-pixel text-2xl md:text-4xl mb-2">
          <NeonText color="cyan">PLAYER PROFILE</NeonText>
        </h1>
        <p className="font-retro text-xl text-gray-400">
          GET TO KNOW THE DEVELOPER
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Character Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Win95Window title="character.exe" showControls={false}>
            <div className="bg-arcade-dark p-6 text-white">
              {/* Avatar */}
              <div className="flex items-center gap-6 mb-6">
                <motion.div
                  className="w-24 h-24 rounded-lg overflow-hidden border-4 border-arcade-cyan shadow-neon-cyan"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/profile.jpg" 
                    alt="Kzyrell A. Dela Paz"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <h2 className="font-pixel text-lg text-arcade-cyan">Kzyrell A. Dela Paz</h2>
                  <p className="font-retro text-gray-400">Computer Engineer</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-arcade-purple rounded font-pixel text-[8px] text-arcade-green">
                      LVL 99
                    </span>
                    <span className="px-2 py-1 bg-arcade-purple rounded font-pixel text-[8px] text-arcade-pink">
                      CUTIPIE WOW
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {(['bio', 'story', 'stats'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-4 py-2 font-pixel text-[10px] uppercase rounded
                      transition-colors focus-ring
                      ${activeTab === tab 
                        ? 'bg-arcade-cyan text-arcade-black' 
                        : 'bg-arcade-purple text-gray-400 hover:text-white'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px] bg-arcade-black p-4 rounded border border-gray-700">
                {activeTab === 'bio' && (
                  <div className="font-retro text-arcade-green whitespace-pre-line">
                    {typedText}
                    <span className="animate-blink">▌</span>
                  </div>
                )}

                {activeTab === 'story' && (
                  <div className="space-y-3">
                    {timeline.map((item, index) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="font-pixel text-xs text-arcade-pink">{item.year}</span>
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-retro text-gray-300">{item.event}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-arcade-purple p-3 rounded text-center"
                      >
                        <span className="text-2xl block mb-1">{stat.icon}</span>
                        <span className="font-pixel text-lg text-arcade-cyan">{stat.value}</span>
                        <span className="font-retro text-xs text-gray-400 block">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Win95Window>
        </motion.div>

        {/* Skills Preview & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Core Stats */}
          <Win95Window title="stats.dat" showControls={false}>
            <div className="bg-arcade-dark p-4 text-white space-y-4">
              <h3 className="font-pixel text-sm text-arcade-yellow mb-4">CORE ATTRIBUTES</h3>
              
              {[
                { label: 'Creativity', value: 90 },
                { label: 'Problem Solving', value: 85 },
                { label: 'Communication', value: 80 },
                { label: 'Teamwork', value: 95 },
              ].map((attr) => (
                <div key={attr.label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-pixel text-[10px] text-gray-400">{attr.label}</span>
                    <span className="font-pixel text-[10px] text-arcade-green">{attr.value}/100</span>
                  </div>
                  <ProgressBar progress={attr.value} showPercentage={false} color="cyan" />
                </div>
              ))}
            </div>
          </Win95Window>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <PixelButton onClick={() => navigate('projects')}>
              🎮 View Projects
            </PixelButton>
            <PixelButton onClick={() => navigate('skills')} variant="secondary">
              ⚡ See Skills
            </PixelButton>
            <PixelButton onClick={() => navigate('contact')} variant="success">
              📧 Contact Me
            </PixelButton>
          </div>

          {/* Fun Fact */}
          <motion.div
            className="bg-arcade-purple border-2 border-arcade-yellow rounded-lg p-4 text-center"
            animate={{ boxShadow: ['0 0 0px #ffff00', '0 0 10px #ffff00', '0 0 0px #ffff00'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl block mb-2">💡</span>
            <p className="font-pixel text-[10px] text-arcade-yellow">FUN FACT</p>
            <p className="font-retro text-gray-300 mt-2">
              I built my first website at age 15 using nothing but Notepad!
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Back Button */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <PixelButton onClick={() => navigate('home')} variant="secondary" size="sm">
          ← BACK TO ARCADE
        </PixelButton>
      </motion.div>
    </div>
  );
};

export default AboutSection;
