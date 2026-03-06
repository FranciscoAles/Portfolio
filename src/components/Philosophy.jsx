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
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32"
        >
            <div className="relative z-10 max-w-5xl px-6 md:px-16 text-center text-content select-none pointer-events-none">
                <div className="mb-12 md:mb-20">
                    <SplitText
                        text="Most editors focus on: assembling clips in a timeline."
                        className="font-sans font-medium text-xl md:text-3xl text-brand-light/60 tracking-wide"
                    />
                </div>

                <div>
                    <SplitText
                        text="We focus on:"
                        className="font-sans font-bold text-3xl md:text-5xl text-brand-light mb-4 block"
                    />
                    <div className="mt-8">
                        <SplitText
                            text="crafting digital experiences that feel like "
                            className="drama-serif text-5xl md:text-7xl lg:text-[6rem] text-brand-light leading-tight"
                        />
                        <SplitText
                            text="cinema."
                            className="drama-serif text-5xl md:text-7xl lg:text-[6rem] text-brand-amber leading-tight italic block mt-2"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
