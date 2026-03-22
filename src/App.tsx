import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import SkillsExperience from './components/SkillsExperience';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AllProjects from './pages/AllProjects';
import LoadingScreen from './components/LoadingScreen';

function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleLoadingDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-foreground">
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      <div
        className="fixed top-0 left-0 h-0.5 bg-accent z-[60] transition-[width] duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      <Navbar />
      <div className="pt-16">
        <div className="reveal"><About /></div>
        <div className="reveal"><SkillsExperience /></div>
        <div className="reveal"><Projects /></div>
        <div className="reveal"><Gallery /></div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<AllProjects />} />
    </Routes>
  );
}

export default App;
