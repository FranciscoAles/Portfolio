import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.reveal-text',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 clip-overflow"
        >
            {/* Content Layer */}
            <div className="relative z-10 max-w-4xl text-left">
                <h1 className="flex flex-col gap-2 md:gap-4 mb-8">
                    <span className="reveal-text font-sans font-bold uppercase tracking-widest text-brand-ocean text-sm md:text-base mb-2">
                        Francisco Alesandroni — Video Editor & VFX
                    </span>
                    <span className="reveal-text font-sans font-medium text-4xl md:text-6xl text-brand-light leading-tight">
                        We don't just assemble clips.
                    </span>
                    <span className="reveal-text drama-serif text-6xl md:text-8xl lg:text-[7.5rem] text-brand-amber leading-none mt-2">
                        We craft cinema.
                    </span>
                </h1>

                <div className="reveal-text mt-8">
                    <a href="#work" className="group relative inline-flex overflow-hidden rounded-[2.5rem] font-sans text-sm md:text-base font-bold tracking-widest px-10 py-4 transition-transform duration-300 hover:scale-[1.03] active:scale-95 bg-brand-ocean text-brand-dark items-center justify-center">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-light">ENTER SHOWREEL</span>
                        <span className="absolute inset-0 bg-brand-amber translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block"></span>
                    </a>
                </div>
            </div>
        </section>
    );
}
