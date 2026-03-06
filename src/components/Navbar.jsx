import { useEffect, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    const handleNameClick = () => {
        // Clear the session storage so intro shows again
        sessionStorage.removeItem('hasSeenIntro');
        // Reload the page to trigger intro
        window.location.reload();
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-4 rounded-[3rem] transition-all duration-500 w-[95%] max-w-5xl
        ${scrolled
                    ? 'bg-brand-dark/40 backdrop-blur-xl border border-brand-brown/40 shadow-[0_4px_30px_rgba(0,0,0,0.6)] text-brand-ocean'
                    : 'bg-brand-dark/0 text-brand-light border border-transparent'
                }
      `}
        >
            <div 
                onClick={handleNameClick}
                className={`font-serif font-bold tracking-[0.15em] text-lg uppercase cursor-pointer hover:-translate-y-[1px] transition-all duration-300 ${scrolled ? 'text-brand-light hover:text-brand-amber' : 'hover:text-brand-amber'}`}
            >
                Francisco Alesandroni
            </div>

            <a href="mailto:franciscoalesandroni@outlook.com" className="group relative overflow-hidden rounded-[2rem] font-sans text-sm font-bold tracking-wide px-8 py-3 transition-transform duration-300 hover:scale-[1.03] active:scale-95 bg-brand-amber text-brand-dark flex items-center justify-center">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-light">Let's Work Together</span>
                <span className="absolute inset-0 bg-brand-ocean translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block"></span>
            </a>
        </nav>
    );
}
