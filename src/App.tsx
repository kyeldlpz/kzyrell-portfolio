import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import SkillsExperience from './components/SkillsExperience';
import AllProjects from './pages/AllProjects';

function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadingDone = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = 'Kzyrell Dela Paz';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="page-shell min-h-screen bg-bg text-ink">
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      <div className="page-orb page-orb-one" />
      <div className="page-orb page-orb-two" />
      <div className="page-grid" />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <div className="reveal"><About /></div>
      <div className="section-divider" />
      <div className="reveal"><Projects /></div>
      <div className="section-divider" />
      <div className="reveal"><Gallery /></div>
      <div className="section-divider" />
      <div className="reveal"><SkillsExperience /></div>
      <div className="section-divider" />
      <div className="reveal"><Contact /></div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<AllProjects />} />
    </Routes>
  );
}
