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
        <section
            ref={containerRef}
            className="relative h-[100dvh] w-full flex items-center justify-center px-6 md:px-16"
        >
            {/* Video Container */}
            <div className="reveal-video relative w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                    src="https://www.youtube.com/embed/oKkQcwaRiW0?autoplay=0&mute=0&playsinline=1&loop=1&playlist=oKkQcwaRiW0&controls=1&modestbranding=1&rel=0"
                    title="Francisco Alesandroni Showreel"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        </section>
    );
}
