import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text, className }) => {
    return (
        <span className={className}>
            {text.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.2em] pb-[0.1em]">
                    <span className="word-reveal inline-block translate-y-full opacity-0 will-change-transform">
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default function Philosophy() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Word Reveal Animation
            gsap.to('.word-reveal', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.text-content',
                    start: 'top 80%',
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="philosophy"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-32 z-20"
        >
            <div className="relative z-10 max-w-4xl md:max-w-5xl px-4 md:px-16 text-center text-content select-none pointer-events-none">
                <div className="mb-8 md:mb-16">
                    <SplitText
                        text="Hey guys! I'm a freelance video editor."
                        className="font-sans font-medium text-lg md:text-2xl lg:text-3xl text-brand-light/60 tracking-wide"
                    />
                </div>

                <div>
                    <SplitText
                        text="I'll turn your raw footage into"
                        className="font-sans font-bold text-2xl md:text-4xl lg:text-5xl text-brand-light mb-4 block"
                    />
                    <div className="mt-6 md:mt-8">
                        <SplitText
                            text="awesome cinematic digital storytelling experiences."
                            className="drama-serif text-4xl md:text-6xl lg:text-7xl text-brand-light leading-tight"
                        />
                        <SplitText
                            text="Oh yeah."
                            className="drama-serif text-4xl md:text-6xl lg:text-7xl text-brand-amber leading-tight italic block mt-2"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
