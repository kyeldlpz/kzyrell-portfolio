import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useArcade } from '../../context/ArcadeContext';
import { Win95Window } from '../ui/Win95Window';
import { PixelButton } from '../ui/PixelButton';
import { NeonText } from '../ui/GameElements';
import { soundManager } from '../../utils/soundManager';

// EmailJS Configuration - Replace with your actual IDs
const EMAILJS_SERVICE_ID = 'service_portfolio'; // Create this in EmailJS
const EMAILJS_TEMPLATE_ID = 'template_contact'; // Create this in EmailJS
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Get from EmailJS account

interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
  username: string;
}

const socialLinks: SocialLink[] = [
  { id: 'github', name: 'GitHub', icon: '🐙', url: 'https://github.com/kyeldlpz', username: '@kyeldlpz' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/kzyrell-dela-paz-b04395351/', username: 'kyeldlpz' },
  { id: 'email', name: 'Email', icon: '📧', url: 'mailto:kzyrellyan@gmail.com', username: 'kzyrellyan@gmail.com' },
  { id: 'discord', name: 'Discord', icon: '🎮', url: 'Kzyyy', username: 'holycandy8836' },
];

export const ContactSection: React.FC = () => {
  const { visitSection, addScore, earnAchievement, achievements } = useArcade();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    visitSection('contact');
    addScore(5);

    // Check for contact achievement
    const contactAchievement = achievements.find(a => a.id === 'contact_made');
    if (contactAchievement && !contactAchievement.unlocked) {
      earnAchievement('contact_made');
    }
  }, [visitSection, addScore, earnAchievement, achievements]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') {
      setCharCount(value.length);
    }
    soundManager.play('blip');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    soundManager.play('select');

    try {
      if (!formRef.current) {
        throw new Error('Form reference not found');
      }

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      soundManager.play('success');
      addScore(50);
      
      // Earn achievement for first contact
      const contactAchievement = achievements.find(a => a.id === 'contact_made');
      if (contactAchievement && !contactAchievement.unlocked) {
        earnAchievement('contact_made');
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send message. Please try again or email directly.');
      soundManager.play('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (link: SocialLink) => {
    soundManager.play('click');
    if (link.url !== '#') {
      window.open(link.url, '_blank');
    }
    addScore(5);
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
          <NeonText color="yellow">TRANSMISSION</NeonText>
        </h1>
        <p className="font-retro text-xl text-gray-400">
          SEND A MESSAGE
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Win95Window 
            title="message.exe" 
            showControls={false}
          >
            <div className="bg-arcade-dark p-4 text-white">
              {!submitted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Hidden field for recipient email */}
                  <input type="hidden" name="to_email" value="kzyrellyan@gmail.com" />
                  
                  {/* Name Input */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className="font-pixel text-[10px] text-arcade-cyan block mb-1"
                    >
                      PLAYER NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-arcade-black border-2 border-gray-700 rounded px-3 py-2 font-retro text-arcade-green focus:border-arcade-cyan focus:outline-none"
                      placeholder="Enter your name..."
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="font-pixel text-[10px] text-arcade-cyan block mb-1"
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-arcade-black border-2 border-gray-700 rounded px-3 py-2 font-retro text-arcade-green focus:border-arcade-cyan focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="font-pixel text-[10px] text-arcade-cyan block mb-1"
                    >
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      maxLength={500}
                      className="w-full bg-arcade-black border-2 border-gray-700 rounded px-3 py-2 font-retro text-arcade-green focus:border-arcade-cyan focus:outline-none resize-none"
                      placeholder="Type your message here..."
                    />
                    <div className="flex justify-end">
                      <span className="font-pixel text-[8px] text-gray-500">
                        {charCount}/500
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <PixelButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          TRANSMITTING...
                        </motion.span>
                      </>
                    ) : (
                      '📡 SEND TRANSMISSION'
                    )}
                  </PixelButton>

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-900/50 border border-red-500 rounded p-3 mt-3"
                    >
                      <p className="font-pixel text-[10px] text-red-400 text-center">
                        ⚠️ {error}
                      </p>
                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.span
                    className="text-6xl block mb-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ✅
                  </motion.span>
                  <h3 className="font-pixel text-lg text-arcade-green mb-2">
                    MESSAGE SENT!
                  </h3>
                  <p className="font-retro text-gray-400 mb-4">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                  <p className="font-pixel text-[10px] text-arcade-yellow">
                    +50 POINTS EARNED!
                  </p>
                  <PixelButton
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                      setCharCount(0);
                    }}
                    variant="secondary"
                    className="mt-4"
                  >
                    SEND ANOTHER
                  </PixelButton>
                </motion.div>
              )}
            </div>
          </Win95Window>
        </motion.div>

        {/* Social Links & Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Social Links */}
          <Win95Window title="links.lnk" showControls={false}>
            <div className="bg-arcade-dark p-4 text-white">
              <h3 className="font-pixel text-sm text-arcade-yellow mb-4">
                CONNECT WITH ME
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleSocialClick(link)}
                    onMouseEnter={() => soundManager.play('hover')}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="w-full flex items-center gap-3 p-3 bg-arcade-purple rounded hover:bg-arcade-blue transition-colors focus-ring text-left"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <div className="flex-1">
                      <span className="font-pixel text-xs text-white block">
                        {link.name}
                      </span>
                      <span className="font-retro text-sm text-gray-400">
                        {link.username}
                      </span>
                    </div>
                    <span className="text-arcade-cyan">→</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </Win95Window>

          {/* Quick Info */}
          <motion.div
            className="bg-arcade-purple border-2 border-arcade-cyan rounded-lg p-4"
            animate={{ boxShadow: ['0 0 0px #00fff5', '0 0 15px #00fff5', '0 0 0px #00fff5'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🕹️</span>
              <div>
                <h3 className="font-pixel text-sm text-arcade-cyan">
                  AVAILABLE FOR
                </h3>
                <p className="font-retro text-gray-400">
                  Freelance & Full-time opportunities
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌍</span>
              <div>
                <h3 className="font-pixel text-sm text-arcade-cyan">
                  LOCATION
                </h3>
                <p className="font-retro text-gray-400">
                  Remote / Worldwide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl">⏰</span>
              <div>
                <h3 className="font-pixel text-sm text-arcade-cyan">
                  RESPONSE TIME
                </h3>
                <p className="font-retro text-gray-400">
                  Usually within 24 hours
                </p>
              </div>
            </div>
          </motion.div>

          {/* Easter Egg Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
            >
            <p className="font-retro text-xs text-gray-600">
              💡 Tip: Explore all sections to unlock hidden achievements!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
