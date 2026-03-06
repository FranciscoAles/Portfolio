import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import Intro from './components/Intro';

function App() {
  const [showIntro, setShowIntro] = useState(true); // Always show intro for now

  useEffect(() => {
    // Temporarily bypass sessionStorage for testing
    // const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    // if (!hasSeenIntro) {
    //   setShowIntro(true);
    //   sessionStorage.setItem('hasSeenIntro', 'true');
    // }
    
    // Ensure site starts at top on reload
    window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Ensure we're at the top when intro completes
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen selection:bg-brand-ocean selection:text-brand-dark relative w-full overflow-hidden">
      {/* Background Canvas - always rendered */}
      <BackgroundCanvas />
      
      {/* Cinematic Intro */}
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      
      {/* Main Site Content */}
      <div className={showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}>
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Philosophy />
          <Protocol />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
