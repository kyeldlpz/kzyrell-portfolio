import { createMachine, assign } from 'xstate';

// Types
export type Section = 'home' | 'about' | 'projects' | 'skills' | 'achievements' | 'contact';

export interface ArcadeContext {
  currentSection: Section;
  previousSection: Section | null;
  achievements: Achievement[];
  score: number;
  soundEnabled: boolean;
  highContrastMode: boolean;
  visitedSections: Section[];
  gameProgress: Record<string, number>;
  unlockedSections: Section[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export type ArcadeEvent =
  | { type: 'NAVIGATE'; section: Section }
  | { type: 'UNLOCK_SECTION'; section: Section }
  | { type: 'EARN_ACHIEVEMENT'; achievementId: string }
  | { type: 'ADD_SCORE'; points: number }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'COMPLETE_GAME'; gameId: string; progress: number }
  | { type: 'VISIT_SECTION'; section: Section }
  | { type: 'RESET_PROGRESS' };

// Default achievements
export const defaultAchievements: Achievement[] = [
  {
    id: 'first_visit',
    name: 'Welcome Player',
    description: 'Visit the arcade for the first time',
    icon: '🎮',
    unlocked: false,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visit all sections of the arcade',
    icon: '🗺️',
    unlocked: false,
  },
  {
    id: 'project_viewer',
    name: 'Game Collector',
    description: 'View all projects in the arcade',
    icon: '📚',
    unlocked: false,
  },
  {
    id: 'game_master',
    name: 'Game Master',
    description: 'Complete a mini-game',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'curious_mind',
    name: 'Curious Mind',
    description: 'Read the about section',
    icon: '🧠',
    unlocked: false,
  },
  {
    id: 'skill_seeker',
    name: 'Skill Seeker',
    description: 'Explore all skills',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'high_scorer',
    name: 'High Scorer',
    description: 'Reach 100 points',
    icon: '💯',
    unlocked: false,
  },
  {
    id: 'contact_made',
    name: 'Connection Made',
    description: 'Send a message through the contact form',
    icon: '📡',
    unlocked: false,
  },
];

// Initial context
const initialContext: ArcadeContext = {
  currentSection: 'home',
  previousSection: null,
  achievements: defaultAchievements,
  score: 0,
  soundEnabled: true,
  highContrastMode: false,
  visitedSections: ['home'],
  gameProgress: {},
  unlockedSections: ['home', 'about', 'projects', 'skills', 'achievements', 'contact'],
};

// Create the arcade machine
export const arcadeMachine = createMachine({
  id: 'arcade',
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {
      on: {
        NAVIGATE: {
          target: 'transitioning',
          actions: assign({
            previousSection: ({ context }) => context.currentSection,
            currentSection: ({ event }) => event.section,
          }),
        },
        UNLOCK_SECTION: {
          actions: assign({
            unlockedSections: ({ context, event }) =>
              context.unlockedSections.includes(event.section)
                ? context.unlockedSections
                : [...context.unlockedSections, event.section],
          }),
        },
        EARN_ACHIEVEMENT: {
          actions: [
            assign({
              achievements: ({ context, event }) =>
                context.achievements.map((achievement) =>
                  achievement.id === event.achievementId
                    ? { ...achievement, unlocked: true, unlockedAt: new Date() }
                    : achievement
                ),
            }),
            assign({
              score: ({ context }) => {
                const achievement = context.achievements.find(
                  (a) => a.id === 'achievement'
                );
                return achievement && !achievement.unlocked ? context.score + 25 : context.score;
              },
            }),
          ],
        },
        ADD_SCORE: {
          actions: assign({
            score: ({ context, event }) => context.score + event.points,
          }),
        },
        TOGGLE_SOUND: {
          actions: assign({
            soundEnabled: ({ context }) => !context.soundEnabled,
          }),
        },
        TOGGLE_HIGH_CONTRAST: {
          actions: assign({
            highContrastMode: ({ context }) => !context.highContrastMode,
          }),
        },
        COMPLETE_GAME: {
          actions: assign({
            gameProgress: ({ context, event }) => ({
              ...context.gameProgress,
              [event.gameId]: Math.max(
                context.gameProgress[event.gameId] || 0,
                event.progress
              ),
            }),
          }),
        },
        VISIT_SECTION: {
          actions: assign({
            visitedSections: ({ context, event }) =>
              context.visitedSections.includes(event.section)
                ? context.visitedSections
                : [...context.visitedSections, event.section],
          }),
        },
        RESET_PROGRESS: {
          actions: assign({
            score: 0,
            achievements: defaultAchievements,
            visitedSections: ['home'],
            gameProgress: {},
          }),
        },
      },
    },
    transitioning: {
      after: {
        300: 'idle',
      },
    },
  },
});

// Selectors
export const selectCurrentSection = (context: ArcadeContext) => context.currentSection;
export const selectScore = (context: ArcadeContext) => context.score;
export const selectAchievements = (context: ArcadeContext) => context.achievements;
export const selectSoundEnabled = (context: ArcadeContext) => context.soundEnabled;
export const selectHighContrastMode = (context: ArcadeContext) => context.highContrastMode;
export const selectVisitedSections = (context: ArcadeContext) => context.visitedSections;
export const selectProgress = (context: ArcadeContext) => {
  const totalAchievements = context.achievements.length;
  const unlockedAchievements = context.achievements.filter((a) => a.unlocked).length;
  return Math.round((unlockedAchievements / totalAchievements) * 100);
};
