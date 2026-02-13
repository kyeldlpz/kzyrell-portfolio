import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { Win95Window } from '../ui/Win95Window';
import { PixelButton } from '../ui/PixelButton';
import { NeonText, ProgressBar, SkillMeter } from '../ui/GameElements';
import { soundManager } from '../../utils/soundManager';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  icon: string;
  color: string;
  difficulty: number;
  status: 'completed' | 'in-progress' | 'planned';
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Space Invaders Clone',
    description: 'A retro space shooter game',
    longDescription: 'A faithful recreation of the classic arcade game with modern web technologies. Features pixel-perfect graphics, authentic sound effects, and progressive difficulty.',
    technologies: ['React', 'Canvas', 'TypeScript'],
    icon: '👾',
    color: 'cyan',
    difficulty: 3,
    status: 'in-progress',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Task Quest',
    description: 'Gamified productivity app',
    longDescription: 'Turn your daily tasks into epic quests! Earn XP, unlock achievements, and level up as you complete your to-dos. Features RPG-style character progression.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
    icon: '⚔️',
    color: 'pink',
    difficulty: 4,
    status: 'in-progress',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-3',
    title: 'Pixel Art Editor',
    description: 'Create retro-style art',
    longDescription: 'A browser-based pixel art editor with layers, animation support, and export options. Perfect for creating game assets and retro designs.',
    technologies: ['Vue.js', 'Canvas', 'WebAssembly'],
    icon: '🎨',
    color: 'green',
    difficulty: 5,
    status: 'in-progress',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-4',
    title: 'Retro Chat',
    description: 'Real-time messaging app',
    longDescription: 'A nostalgic chat application with AOL Instant Messenger aesthetics. Features real-time messaging, buddy lists, and away messages.',
    technologies: ['React', 'Socket.io', 'MongoDB'],
    icon: '💬',
    color: 'yellow',
    difficulty: 4,
    status: 'in-progress',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-5',
    title: 'NES Emulator',
    description: 'Play classic games',
    longDescription: 'A web-based Nintendo Entertainment System emulator written in TypeScript. Supports most popular ROMs with save states and gamepad input.',
    technologies: ['TypeScript', 'WebGL', 'Web Audio'],
    icon: '🎮',
    color: 'orange',
    difficulty: 5,
    status: 'in-progress',
    githubUrl: '#',
  },
  {
    id: 'project-6',
    title: 'Weather Station',
    description: 'IoT weather dashboard',
    longDescription: 'A full-stack IoT project with custom hardware sensors and a beautiful dashboard. Tracks temperature, humidity, pressure, and more.',
    technologies: ['Python', 'Raspberry Pi', 'React'],
    icon: '🌤️',
    color: 'cyan',
    difficulty: 3,
    status: 'in-progress',
    demoUrl: '#',
    githubUrl: '#',
  },
];

export const ProjectsSection: React.FC = () => {
  const { visitSection, addScore, earnAchievement, achievements } = useArcade();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewedProjects, setViewedProjects] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'planned'>('all');

  useEffect(() => {
    visitSection('projects');
    addScore(5);
  }, [visitSection, addScore]);

  // Check for project viewer achievement
  useEffect(() => {
    if (viewedProjects.size >= projects.length) {
      const achievement = achievements.find(a => a.id === 'project_viewer');
      if (achievement && !achievement.unlocked) {
        earnAchievement('project_viewer');
      }
    }
  }, [viewedProjects, earnAchievement, achievements]);

  const handleProjectClick = (project: Project) => {
    soundManager.play('select');
    setSelectedProject(project);
    if (!viewedProjects.has(project.id)) {
      setViewedProjects(new Set(viewedProjects).add(project.id));
      addScore(10);
    }
  };

  const filteredProjects = projects.filter(
    p => filter === 'all' || p.status === filter
  );

  const statusColors = {
    completed: 'text-arcade-green',
    'in-progress': 'text-arcade-yellow',
    planned: 'text-arcade-pink',
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
          <NeonText color="pink">PROJECT LIBRARY</NeonText>
        </h1>
        <p className="font-retro text-xl text-gray-400">
          SELECT A PROJECT TO PLAY
        </p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <span className="font-pixel text-xs text-arcade-green">
            {viewedProjects.size}/{projects.length} EXPLORED
          </span>
          <ProgressBar
            progress={(viewedProjects.size / projects.length) * 100}
            showPercentage={false}
            color="green"
            className="w-32"
          />
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        className="flex justify-center gap-2 mb-8 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {(['all', 'completed', 'in-progress', 'planned'] as const).map((f) => (
          <button
            key={f}
            onClick={() => {
              soundManager.play('click');
              setFilter(f);
            }}
            className={`
              px-4 py-2 font-pixel text-[10px] uppercase rounded
              transition-colors focus-ring
              ${filter === f 
                ? 'bg-arcade-cyan text-arcade-black' 
                : 'bg-arcade-purple text-gray-400 hover:text-white'}
            `}
          >
            {f === 'all' ? 'ALL GAMES' : f.replace('-', ' ')}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <motion.button
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => soundManager.play('hover')}
                className={`
                  w-full text-left bg-gradient-to-b from-arcade-purple to-arcade-dark
                  border-2 border-${project.color === 'cyan' ? 'arcade-cyan' : project.color === 'pink' ? 'arcade-pink' : project.color === 'green' ? 'arcade-green' : project.color === 'yellow' ? 'arcade-yellow' : 'arcade-orange'}
                  rounded-lg p-4 transition-all focus-ring
                  ${viewedProjects.has(project.id) ? 'opacity-90' : ''}
                `}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-3">
                  <motion.span
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {project.icon}
                  </motion.span>
                  <span className={`font-pixel text-[8px] uppercase ${statusColors[project.status]}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Project Info */}
                <h3 className="font-pixel text-sm text-white mb-1">
                  {project.title}
                </h3>
                <p className="font-retro text-gray-400 text-sm mb-3">
                  {project.description}
                </p>

                {/* Difficulty */}
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[8px] text-gray-500">DIFFICULTY:</span>
                  <SkillMeter level={project.difficulty} maxLevel={5} />
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-arcade-black rounded font-pixel text-[8px] text-arcade-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Viewed Badge */}
                {viewedProjects.has(project.id) && (
                  <div className="absolute top-2 right-2">
                    <span className="text-arcade-green text-lg">✓</span>
                  </div>
                )}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Win95Window
                title={`${selectedProject.title}.exe`}
                onClose={() => setSelectedProject(null)}
              >
                <div className="bg-arcade-dark p-6 text-white max-h-[70vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl">{selectedProject.icon}</span>
                    <div>
                      <h2 className="font-pixel text-xl text-arcade-cyan">
                        {selectedProject.title}
                      </h2>
                      <span className={`font-pixel text-xs uppercase ${statusColors[selectedProject.status]}`}>
                        {selectedProject.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-pixel text-sm text-arcade-yellow mb-2">
                      DESCRIPTION
                    </h3>
                    <p className="font-retro text-gray-300 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="font-pixel text-sm text-arcade-yellow mb-2">
                      TECH STACK
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-arcade-purple rounded font-pixel text-xs text-arcade-cyan"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="mb-6">
                    <h3 className="font-pixel text-sm text-arcade-yellow mb-2">
                      DIFFICULTY LEVEL
                    </h3>
                    <SkillMeter level={selectedProject.difficulty} maxLevel={5} />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 flex-wrap">
                    {selectedProject.demoUrl && (
                      <PixelButton
                        onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                      >
                        🎮 PLAY DEMO
                      </PixelButton>
                    )}
                    {selectedProject.githubUrl && (
                      <PixelButton
                        onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                        variant="secondary"
                      >
                        📂 VIEW CODE
                      </PixelButton>
                    )}
                    <PixelButton
                      onClick={() => setSelectedProject(null)}
                      variant="danger"
                    >
                      ✕ CLOSE
                    </PixelButton>
                  </div>
                </div>
              </Win95Window>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsSection;
