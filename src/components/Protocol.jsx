import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        step: '01',
        title: 'Pre-production & Assets',
        description: 'We architect the foundation. 3D modeling, asset gathering, and narrative blocking to establish the core visual language before a single frame is cut.',
        visual: 'geometric'
    },
    {
        step: '02',
        title: 'The Editing Protocol',
        description: 'Applying rhythmic precision. We cut not just for continuity, but for emotional resonance, ensuring the pacing tightens the viewer\'s focus.',
        visual: 'scanner'
    },
    {
        step: '03',
        title: 'VFX & Final Polish',
        description: 'Elevating the frame. Compositing, color grading, and telemetry mapping transform raw footage into a polished, cinematic digital instrument.',
        visual: 'waveform'
    }
];

const GeometricMotif = () => (
    <div className="w-full h-full flex items-center justify-center relative">
        <div className="absolute w-64 h-64 border-[1px] border-brand-brown rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute w-48 h-48 border-[1px] border-dotted border-brand-ocean rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute w-32 h-32 border-[2px] border-dashed border-brand-amber rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="w-16 h-16 bg-brand-dark border border-brand-brown flex items-center justify-center rounded-xl rotate-45">
            <div className="w-4 h-4 bg-brand-ocean rounded-full animate-pulse"></div>
        </div>
    </div>
);

const ScannerMotif = () => (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden px-8">
        <div className="grid grid-cols-12 grid-rows-6 gap-2 w-full h-48 opacity-20">
            {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="bg-brand-brown w-full h-full rounded-[2px]"></div>
            ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-amber shadow-[0_0_15px_#E88821] animate-[scan_3s_ease-in-out_infinite_alternate] z-10 box-border pointer-events-none"></div>
        <style>{`
      @keyframes scan {
        0% { transform: translateY(0); }
        100% { transform: translateY(12rem); }
      }
    `}</style>
    </div>
);

const WaveformMotif = () => (
    <div className="w-full h-full flex items-center justify-center relative px-8">
        <svg viewBox="0 0 400 100" className="w-full h-auto drop-shadow-[0_0_8px_rgba(31,146,234,0.6)]">
            <path
                d="M 0 50 L 100 50 L 120 20 L 150 90 L 180 10 L 210 80 L 230 50 L 400 50"
                fill="transparent"
                stroke="#1F92EA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="path-anim"
            />
        </svg>
        <style>{`
      .path-anim {
        stroke-dasharray: 600;
        stroke-dashoffset: 600;
        animation: dash 3s linear infinite;
      }
      @keyframes dash {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
    </div>
);

export default function Protocol() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // We create a ScrollTrigger that pins the entire container and scrubs through an animation timeline
        const ctx = gsap.context(() => {
            const cards = cardsRef.current;

            cards.forEach((card, index) => {
                if (index === cards.length - 1) return; // Last card doesn't get pushed back

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    endTrigger: cards[index + 1],
                    end: 'top top',
                    pin: true,
                    pinSpacing: false,
                    scrub: true,
                    animation: gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.4,
                        filter: 'blur(10px)',
                        ease: 'none'
                    })
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="relative pb-[100vh] bg-brand-dark z-30">
            <div className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative z-40">
                <h2 className="font-sans font-bold uppercase tracking-widest text-brand-ocean text-sm md:text-base mb-2">
                    Methodology
                </h2>
                <p className="drama-serif text-5xl md:text-6xl text-brand-light leading-tight mb-8">
                    Sticky Stacking Archive
                </p>
            </div>

            <div className="relative">
                {protocols.map((protocol, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className="card-panel h-screen w-full flex items-center justify-center sticky top-0 px-6 md:px-16"
                    >
                        <div className="w-full max-w-6xl bg-brand-dark/95 border border-brand-brown/50 rounded-[3rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-12 backdrop-blur-3xl overflow-hidden h-[75vh]">

                            <div className="flex-1 flex flex-col justify-center">
                                <div className="font-mono text-xs md:text-sm text-brand-amber border border-brand-amber/30 rounded-full py-1 px-4 self-start mb-8 tracking-widest">
                                    STEP // {protocol.step}
                                </div>
                                <h3 className="font-sans font-bold text-3xl md:text-5xl text-brand-light mb-6 leading-tight">
                                    {protocol.title}
                                </h3>
                                <p className="font-sans text-brand-light/70 text-base md:text-lg max-w-md leading-relaxed">
                                    {protocol.description}
                                </p>
                            </div>

                            <div className="flex-1 bg-brand-dark border border-brand-brown/40 rounded-[2rem] overflow-hidden hidden md:block relative">
                                {protocol.visual === 'geometric' && <GeometricMotif />}
                                {protocol.visual === 'scanner' && <ScannerMotif />}
                                {protocol.visual === 'waveform' && <WaveformMotif />}

                                {/* Glitch Overlay Effect */}
                                <div className="absolute inset-0 bg-brand-ocean/5 mix-blend-overlay pointer-events-none"></div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
