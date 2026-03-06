import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';

function App() {
  return (
    <div className="min-h-screen selection:bg-brand-ocean selection:text-brand-dark relative w-full overflow-hidden">
      <BackgroundCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
