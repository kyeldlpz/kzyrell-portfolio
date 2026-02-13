import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useArcade } from '../../context/ArcadeContext';
import { NeonText, SkillMeter, ProgressBar } from '../ui/GameElements';
import { PixelButton } from '../ui/PixelButton';
import { soundManager } from '../../utils/soundManager';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'soft';
  icon: string;
  xp: number;
  maxXp: number;
}

const skills: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', level: 5, category: 'frontend', icon: '⚛️', xp: 4500, maxXp: 5000 },
  { id: 'typescript', name: 'TypeScript', level: 5, category: 'frontend', icon: '📘', xp: 4200, maxXp: 5000 },
  { id: 'javascript', name: 'JavaScript', level: 5, category: 'frontend', icon: '🟨', xp: 4800, maxXp: 5000 },
  { id: 'html-css', name: 'HTML/CSS', level: 5, category: 'frontend', icon: '🎨', xp: 4900, maxXp: 5000 },
  { id: 'tailwind', name: 'Tailwind CSS', level: 4, category: 'frontend', icon: '🌊', xp: 3800, maxXp: 5000 },
  { id: 'nextjs', name: 'Next.js', level: 4, category: 'frontend', icon: '▲', xp: 3500, maxXp: 5000 },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', level: 4, category: 'backend', icon: '🟢', xp: 3600, maxXp: 5000 },
  { id: 'python', name: 'Python', level: 4, category: 'backend', icon: '🐍', xp: 3400, maxXp: 5000 },
  { id: 'postgresql', name: 'PostgreSQL', level: 3, category: 'backend', icon: '🐘', xp: 2800, maxXp: 5000 },
  { id: 'sqlite', name: 'SQLite', level: 4, category: 'backend', icon: '🗃️', xp: 3200, maxXp: 5000 },
  
  // Tools
  { id: 'git', name: 'Git', level: 5, category: 'tools', icon: '📦', xp: 4700, maxXp: 5000 },
  { id: 'aws', name: 'AWS', level: 4, category: 'tools', icon: '☁️', xp: 3600, maxXp: 5000 },
  { id: 'claude', name: 'Claude AI', level: 5, category: 'tools', icon: '🤖', xp: 4500, maxXp: 5000 },
  { id: 'chatgpt', name: 'ChatGPT', level: 5, category: 'tools', icon: '💭', xp: 4400, maxXp: 5000 },
  { id: 'vscode', name: 'VS Code', level: 5, category: 'tools', icon: '💻', xp: 4600, maxXp: 5000 },
  { id: 'cpp', name: 'C++', level: 4, category: 'tools', icon: '⚙️', xp: 3800, maxXp: 5000 },
  { id: 'colab', name: 'Google Colab', level: 4, category: 'tools', icon: '📓', xp: 3500, maxXp: 5000 },
  
  // Soft Skills
  { id: 'teamwork', name: 'Teamwork', level: 5, category: 'soft', icon: '🤝', xp: 4800, maxXp: 5000 },
  { id: 'communication', name: 'Communication', level: 4, category: 'soft', icon: '💬', xp: 3900, maxXp: 5000 },
  { id: 'problem-solving', name: 'Problem Solving', level: 5, category: 'soft', icon: '🧩', xp: 4500, maxXp: 5000 },
  { id: 'creativity', name: 'Creativity', level: 4, category: 'soft', icon: '✨', xp: 3700, maxXp: 5000 },
];

const categoryInfo = {
  frontend: { name: 'Frontend', icon: '🖥️', color: 'cyan' as const },
  backend: { name: 'Backend', icon: '⚙️', color: 'green' as const },
  tools: { name: 'Tools', icon: '🛠️', color: 'yellow' as const },
  soft: { name: 'Soft Skills', icon: '💡', color: 'pink' as const },
};

export const SkillsSection: React.FC = () => {
  const { visitSection, addScore, earnAchievement, achievements } = useArcade();
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryInfo>('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [exploredSkills, setExploredSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    visitSection('skills');
    addScore(5);
  }, [visitSection, addScore]);

  // Check for skill seeker achievement
  useEffect(() => {
    if (exploredSkills.size >= skills.length) {
      const achievement = achievements.find(a => a.id === 'skill_seeker');
      if (achievement && !achievement.unlocked) {
        earnAchievement('skill_seeker');
      }
    }
  }, [exploredSkills, earnAchievement, achievements]);

  const handleSkillHover = (skillId: string) => {
    setHoveredSkill(skillId);
    if (!exploredSkills.has(skillId)) {
      setExploredSkills(new Set(exploredSkills).add(skillId));
      soundManager.play('blip');
      addScore(2);
    }
  };

  const filteredSkills = skills.filter(s => s.category === activeCategory);
  
  const totalXp = skills.reduce((sum, s) => sum + s.xp, 0);
  const maxTotalXp = skills.length * 5000;

  return (
    <div className="min-h-[80vh] py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-pixel text-2xl md:text-4xl mb-2">
          <NeonText color="green">POWER UPS</NeonText>
        </h1>
        <p className="font-retro text-xl text-gray-400">
          SKILLS & ABILITIES
        </p>
        
        {/* Total XP Bar */}
        <div className="max-w-md mx-auto mt-6">
          <div className="flex justify-between mb-1">
            <span className="font-pixel text-[10px] text-arcade-yellow">TOTAL XP</span>
            <span className="font-pixel text-[10px] text-arcade-green">
              {totalXp.toLocaleString()} / {maxTotalXp.toLocaleString()}
            </span>
          </div>
          <ProgressBar
            progress={(totalXp / maxTotalXp) * 100}
            color="yellow"
          />
        </div>

        {/* Exploration Progress */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <span className="font-pixel text-xs text-arcade-cyan">
            {exploredSkills.size}/{skills.length} EXPLORED
          </span>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        className="flex justify-center gap-4 mb-8 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((cat) => (
          <motion.button
            key={cat}
            onClick={() => {
              soundManager.play('click');
              setActiveCategory(cat);
            }}
            className={`
              px-6 py-3 rounded-lg font-pixel text-xs uppercase
              border-2 transition-all focus-ring
              ${activeCategory === cat 
                ? `border-arcade-${categoryInfo[cat].color} bg-arcade-${categoryInfo[cat].color} bg-opacity-20 text-arcade-${categoryInfo[cat].color}` 
                : 'border-gray-600 bg-arcade-purple text-gray-400 hover:text-white'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{categoryInfo[cat].icon}</span>
            {categoryInfo[cat].name}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => handleSkillHover(skill.id)}
              onFocus={() => handleSkillHover(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`
                bg-arcade-dark border-2 rounded-lg p-4
                transition-all cursor-pointer
                ${hoveredSkill === skill.id 
                  ? `border-arcade-${categoryInfo[activeCategory].color} shadow-lg` 
                  : 'border-gray-700'}
                ${exploredSkills.has(skill.id) ? '' : 'opacity-80'}
              `}
              tabIndex={0}
              role="button"
              aria-label={`${skill.name}: Level ${skill.level} of 5`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-3xl"
                    animate={hoveredSkill === skill.id ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon}
                  </motion.span>
                  <div>
                    <h3 className="font-pixel text-sm text-white">{skill.name}</h3>
                    <span className="font-pixel text-[8px] text-gray-500">
                      LVL {skill.level}
                    </span>
                  </div>
                </div>
                <SkillMeter level={skill.level} maxLevel={5} />
              </div>

              {/* XP Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-pixel text-[8px] text-gray-500">XP</span>
                  <span className="font-pixel text-[8px] text-arcade-green">
                    {skill.xp.toLocaleString()} / {skill.maxXp.toLocaleString()}
                  </span>
                </div>
                <ProgressBar
                  progress={(skill.xp / skill.maxXp) * 100}
                  showPercentage={false}
                  color={categoryInfo[activeCategory].color}
                />
              </div>

              {/* Explored indicator */}
              {exploredSkills.has(skill.id) && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 text-arcade-green text-sm"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="flex justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-gray-500">PROFICIENCY:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`w-3 h-4 ${n <= 3 ? 'bg-gray-600' : ''} ${n === 4 ? 'bg-arcade-yellow' : ''} ${n === 5 ? 'bg-arcade-green' : ''} border border-gray-500`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-4 bg-gray-600 border border-gray-500" />
            <span className="font-pixel text-[8px] text-gray-500">LEARNING</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-4 bg-arcade-yellow border border-arcade-yellow" />
            <span className="font-pixel text-[8px] text-gray-500">PROFICIENT</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-4 bg-arcade-green border border-arcade-green" />
            <span className="font-pixel text-[8px] text-gray-500">EXPERT</span>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <PixelButton
          onClick={() => soundManager.play('powerUp')}
          variant="success"
        >
          ⚡ LEVEL UP!
        </PixelButton>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
