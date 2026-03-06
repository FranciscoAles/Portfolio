import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';

function App() {
  useEffect(() => {
    // Ensure site starts at top on reload
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-ocean selection:text-brand-dark relative w-full overflow-hidden">
      <BackgroundCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Philosophy />
        <Protocol />
      </main>
      <Footer />
    </div>
  );
}

export default App;
