/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retro arcade color palette
        'arcade-black': '#0a0a0a',
        'arcade-dark': '#1a1a2e',
        'arcade-purple': '#16213e',
        'arcade-blue': '#0f3460',
        'arcade-cyan': '#00fff5',
        'arcade-pink': '#ff00ff',
        'arcade-yellow': '#ffff00',
        'arcade-green': '#00ff00',
        'arcade-red': '#ff0040',
        'arcade-orange': '#ff6600',
        // Windows 95/XP inspired colors
        'win-gray': '#c0c0c0',
        'win-dark': '#808080',
        'win-blue': '#000080',
        'win-teal': '#008080',
        'crt-green': '#33ff33',
        'crt-amber': '#ffb000',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
        'retro': ['"VT323"', 'monospace'],
        'arcade': ['"Silkscreen"', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pixel-fade': 'pixelFade 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'pulse-neon': 'pulseNeon 1.5s ease-in-out infinite',
        'type': 'type 2s steps(20) forwards',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pixelFade: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        pulseNeon: {
          '0%, 100%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor'
          },
          '50%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
          },
        },
        type: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'retro-lg': '8px 8px 0px 0px rgba(0,0,0,0.8)',
        'neon-cyan': '0 0 10px #00fff5, 0 0 20px #00fff5, 0 0 30px #00fff5',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
        'neon-green': '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00',
        'inset-win': 'inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a',
        'outset-win': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
      },
      backgroundImage: {
        'crt-lines': 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        'grid-pattern': 'linear-gradient(rgba(0,255,245,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.1) 1px, transparent 1px)',
        'stars': 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent), radial-gradient(2px 2px at 130px 80px, #fff, transparent)',
      },
    },
  },
  plugins: [],
}
