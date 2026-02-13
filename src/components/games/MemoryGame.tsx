import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { PixelButton } from '../ui/PixelButton';
import { NeonText, ProgressBar } from '../ui/GameElements';
import { soundManager } from '../../utils/soundManager';

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS = ['🚀', '⭐', '🎮', '💻', '🎯', '🔥', '⚡', '🎨'];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (): Card[] => {
  const cards: Card[] = [];
  const selectedIcons = ICONS.slice(0, 8);
  
  selectedIcons.forEach((icon, index) => {
    cards.push(
      { id: index * 2, icon, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, icon, isFlipped: false, isMatched: false }
    );
  });
  
  return shuffleArray(cards);
};

interface MemoryGameProps {
  onClose?: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onClose }) => {
  const { addScore, earnAchievement, completeGame } = useArcade();
  const [cards, setCards] = useState<Card[]>(createCards());
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const totalPairs = ICONS.length;

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  // Check for matches
  useEffect(() => {
    if (selectedCards.length === 2) {
      setIsChecking(true);
      const [first, second] = selectedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        // Match found
        soundManager.play('success');
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches(prev => prev + 1);
          setSelectedCards([]);
          setIsChecking(false);
          addScore(20);
        }, 500);
      } else {
        // No match
        soundManager.play('error');
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 1000);
      }

      setMoves(prev => prev + 1);
    }
  }, [selectedCards, cards, addScore]);

  // Check for game completion
  useEffect(() => {
    if (matches === totalPairs && gameStarted) {
      setGameCompleted(true);
      soundManager.play('levelUp');
      
      const progress = Math.max(0, 100 - moves + (60 - timer));
      completeGame('memory', Math.max(0, progress));
      
      // Check for perfect score achievement
      if (moves <= totalPairs + 2) {
        earnAchievement('game_master');
      }
      
      addScore(100);
    }
  }, [matches, totalPairs, gameStarted, moves, timer, completeGame, earnAchievement, addScore]);

  const handleCardClick = useCallback((cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (isChecking) return;
    if (selectedCards.length >= 2) return;
    if (selectedCards.includes(cardId)) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped) return;

    soundManager.play('click');
    
    setCards(prev =>
      prev.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    );
    setSelectedCards(prev => [...prev, cardId]);
  }, [cards, selectedCards, isChecking, gameStarted]);

  const handleRestart = () => {
    soundManager.play('select');
    setCards(createCards());
    setSelectedCards([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setGameStarted(false);
    setGameCompleted(false);
    setIsChecking(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="w-full max-w-lg bg-arcade-dark border-4 border-arcade-cyan rounded-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-arcade-purple p-4 flex items-center justify-between">
          <h2 className="font-pixel text-sm text-arcade-cyan">
            <NeonText>MEMORY MATCH</NeonText>
          </h2>
          <button
            onClick={onClose}
            className="font-pixel text-xl text-gray-400 hover:text-white focus-ring"
            aria-label="Close game"
          >
            ×
          </button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-arcade-black bg-opacity-50">
          <div className="text-center">
            <span className="font-pixel text-[10px] text-arcade-yellow block">TIME</span>
            <span className="font-pixel text-lg text-arcade-green">{formatTime(timer)}</span>
          </div>
          <div className="text-center">
            <span className="font-pixel text-[10px] text-arcade-yellow block">MOVES</span>
            <span className="font-pixel text-lg text-arcade-cyan">{moves}</span>
          </div>
          <div className="text-center">
            <span className="font-pixel text-[10px] text-arcade-yellow block">MATCHES</span>
            <span className="font-pixel text-lg text-arcade-pink">{matches}/{totalPairs}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <ProgressBar
            progress={(matches / totalPairs) * 100}
            showPercentage={false}
            color="green"
          />
        </div>

        {/* Game Board */}
        <div className="p-4">
          <AnimatePresence>
            {!gameCompleted ? (
              <div className="grid grid-cols-4 gap-2">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    disabled={card.isMatched || card.isFlipped || isChecking}
                    className={`
                      aspect-square rounded-lg text-3xl flex items-center justify-center
                      transition-all duration-200 focus-ring
                      ${card.isFlipped || card.isMatched
                        ? 'bg-arcade-purple'
                        : 'bg-arcade-blue hover:bg-arcade-purple'}
                      ${card.isMatched ? 'opacity-60' : ''}
                    `}
                    whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                    whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                    initial={false}
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    aria-label={card.isFlipped || card.isMatched ? card.icon : 'Hidden card'}
                  >
                    <motion.span
                      animate={{
                        rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.isFlipped || card.isMatched ? card.icon : '❓'}
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.span
                  className="text-6xl block mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  🎉
                </motion.span>
                <h3 className="font-pixel text-xl text-arcade-yellow mb-2">
                  GAME COMPLETE!
                </h3>
                <p className="font-retro text-gray-400 mb-4">
                  Time: {formatTime(timer)} | Moves: {moves}
                </p>
                <p className="font-pixel text-sm text-arcade-green mb-4">
                  +100 POINTS!
                </p>
                <div className="flex gap-4 justify-center">
                  <PixelButton onClick={handleRestart}>
                    🔄 PLAY AGAIN
                  </PixelButton>
                  <PixelButton onClick={onClose} variant="secondary">
                    EXIT
                  </PixelButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 text-center border-t border-arcade-purple"
          >
            <p className="font-retro text-gray-400 text-sm">
              Match all pairs to win! Click cards to reveal them.
            </p>
          </motion.div>
        )}

        {/* Restart Button */}
        {gameStarted && !gameCompleted && (
          <div className="p-4 text-center border-t border-arcade-purple">
            <PixelButton onClick={handleRestart} variant="secondary" size="sm">
              🔄 RESTART
            </PixelButton>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MemoryGame;
