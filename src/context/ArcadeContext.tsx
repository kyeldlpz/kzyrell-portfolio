import React, { createContext, useContext, useCallback, useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import { 
  arcadeMachine, 
  ArcadeContext, 
  Section, 
  Achievement,
  selectCurrentSection,
  selectScore,
  selectAchievements,
  selectSoundEnabled,
  selectHighContrastMode,
  selectVisitedSections,
  selectProgress,
} from '../machines/arcadeMachine';
import { soundManager } from '../utils/soundManager';

interface ArcadeContextValue {
  // State
  currentSection: Section;
  score: number;
  achievements: Achievement[];
  soundEnabled: boolean;
  highContrastMode: boolean;
  visitedSections: Section[];
  progress: number;
  isTransitioning: boolean;
  
  // Actions
  navigate: (section: Section) => void;
  unlockSection: (section: Section) => void;
  earnAchievement: (achievementId: string) => void;
  addScore: (points: number) => void;
  toggleSound: () => void;
  toggleHighContrast: () => void;
  completeGame: (gameId: string, progress: number) => void;
  visitSection: (section: Section) => void;
  resetProgress: () => void;
}

const ArcadeStateContext = createContext<ArcadeContextValue | null>(null);

export const ArcadeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, send] = useMachine(arcadeMachine);
  const hasUserInteracted = useRef(false);
  
  const context = state.context as ArcadeContext;
  const isTransitioning = state.matches('transitioning');

  // Track first user interaction (browsers block autoplay until interaction)
  useEffect(() => {
    const trackInteraction = () => {
      hasUserInteracted.current = true;
      // Try to play music if sound is enabled
      if (context.soundEnabled) {
        soundManager.playMusic();
      }
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
    };

    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);

    return () => {
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
    };
  }, [context.soundEnabled]);

  // Control music with the sound toggle button
  useEffect(() => {
    soundManager.setEnabled(context.soundEnabled);
    
    if (context.soundEnabled) {
      // Only play if user has interacted (browser requirement)
      if (hasUserInteracted.current) {
        soundManager.playMusic();
      }
    } else {
      soundManager.stopMusic();
    }
  }, [context.soundEnabled]);

  // Apply high contrast mode
  useEffect(() => {
    if (context.highContrastMode) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [context.highContrastMode]);

  // Check for explorer achievement
  useEffect(() => {
    const allSections: Section[] = ['home', 'about', 'projects', 'skills', 'achievements', 'contact'];
    const visitedAll = allSections.every(s => context.visitedSections.includes(s));
    
    if (visitedAll) {
      const explorerAchievement = context.achievements.find(a => a.id === 'explorer');
      if (explorerAchievement && !explorerAchievement.unlocked) {
        send({ type: 'EARN_ACHIEVEMENT', achievementId: 'explorer' });
        soundManager.play('achievement');
      }
    }
  }, [context.visitedSections, context.achievements, send]);

  // Check for high scorer achievement
  useEffect(() => {
    if (context.score >= 500) {
      const highScorerAchievement = context.achievements.find(a => a.id === 'high_scorer');
      if (highScorerAchievement && !highScorerAchievement.unlocked) {
        send({ type: 'EARN_ACHIEVEMENT', achievementId: 'high_scorer' });
        soundManager.play('achievement');
      }
    }
  }, [context.score, context.achievements, send]);

  // Actions
  const navigate = useCallback((section: Section) => {
    soundManager.play('transition');
    send({ type: 'NAVIGATE', section });
    send({ type: 'VISIT_SECTION', section });
  }, [send]);

  const unlockSection = useCallback((section: Section) => {
    soundManager.play('powerUp');
    send({ type: 'UNLOCK_SECTION', section });
  }, [send]);

  const earnAchievement = useCallback((achievementId: string) => {
    soundManager.play('achievement');
    send({ type: 'EARN_ACHIEVEMENT', achievementId });
  }, [send]);

  const addScore = useCallback((points: number) => {
    soundManager.play('coin');
    send({ type: 'ADD_SCORE', points });
  }, [send]);

  const toggleSound = useCallback(() => {
    send({ type: 'TOGGLE_SOUND' });
  }, [send]);

  const toggleHighContrast = useCallback(() => {
    send({ type: 'TOGGLE_HIGH_CONTRAST' });
  }, [send]);

  const completeGame = useCallback((gameId: string, progress: number) => {
    soundManager.play('levelUp');
    send({ type: 'COMPLETE_GAME', gameId, progress });
  }, [send]);

  const visitSection = useCallback((section: Section) => {
    send({ type: 'VISIT_SECTION', section });
  }, [send]);

  const resetProgress = useCallback(() => {
    send({ type: 'RESET_PROGRESS' });
  }, [send]);

  const value: ArcadeContextValue = {
    currentSection: selectCurrentSection(context),
    score: selectScore(context),
    achievements: selectAchievements(context),
    soundEnabled: selectSoundEnabled(context),
    highContrastMode: selectHighContrastMode(context),
    visitedSections: selectVisitedSections(context),
    progress: selectProgress(context),
    isTransitioning,
    navigate,
    unlockSection,
    earnAchievement,
    addScore,
    toggleSound,
    toggleHighContrast,
    completeGame,
    visitSection,
    resetProgress,
  };

  return (
    <ArcadeStateContext.Provider value={value}>
      {children}
    </ArcadeStateContext.Provider>
  );
};

export const useArcade = () => {
  const context = useContext(ArcadeStateContext);
  if (!context) {
    throw new Error('useArcade must be used within an ArcadeProvider');
  }
  return context;
};
