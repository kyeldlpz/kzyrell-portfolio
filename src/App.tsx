import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import SkillsExperience from './components/SkillsExperience';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllProjects from './pages/AllProjects';
import LoadingScreen from './components/LoadingScreen';

function Divider() {
  return <div className="section-divider" />;
}

function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadingDone = useCallback(() => setLoading(false), []);

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
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-foreground">
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Marquee />
        <div className="reveal"><About /></div>
        <Divider />
        <div className="reveal"><Projects /></div>
        <Divider />
        <div className="reveal"><Gallery /></div>
        <Divider />
        <div className="reveal"><SkillsExperience /></div>
        <Divider />
        <div className="reveal"><Contact /></div>
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
