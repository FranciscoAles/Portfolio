import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.reveal-video',
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <iframe
                    src="https://www.youtube.com/embed/oKkQcwaRiW0?autoplay=0&mute=0&playsinline=1&loop=1&playlist=oKkQcwaRiW0&controls=1&modestbranding=1&rel=0"
                    title="Francisco Alesandroni Showreel"
                    className="reveal-video w-full max-w-5xl aspect-video rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </section>
    );
}
