import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        title: 'Video Editing',
        description: 'This is the basic cutting up footage and adding transitions, text, sound effects, music, and motion graphics. I use <a href="https://www.adobe.com/products/premiere.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">Premiere Pro</a> and <a href="https://www.adobe.com/products/aftereffects.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">After Effects</a> (industry standard tools for this kind of thing). The showreel itself (up at the top) is an example of what a video could look like.',
        visual: 'geometric'
    },
    {
        title: 'Visual Effects',
        description: 'For more advanced edits, I can add 3D elements to a video and make it look like they\'re really there. First I\'ll use <a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">Blender</a> to motion/camera track the footage and then create, animate, and render the 3D elements. For the compositing, I might use <a href="https://www.adobe.com/products/aftereffects.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">After Effects</a> or <a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">Blender</a>, or sometimes even <a href="https://www.foundry.com/products/nuke" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">Nuke</a>. Jumping out of a burning building or the flying in the showreel are examples.',
        visual: 'scanner'
    },
    {
        title: '3D Animation',
        description: 'And if you want a fully animated clip, that\'s also possible in <a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">Blender</a>. Usually I\'ll get any models I need off <a href="https://sketchfab.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">Sketchfab</a> or <a href="https://www.cgtrader.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">CGTrader</a> or <a href="https://www.mecabricks.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors underline relative z-10">Mecabricks</a> - though it\'s also possible to make them from scratch. The LEGO Movie is would be an example of an animated short.',
        visual: 'waveform'
    }
];

const GeometricMotif = () => (
    <div className="w-full h-full flex items-center justify-center relative">
        {/* Video Editing - Full Timeline with Multiple Clips & Cursor */}
        <div className="absolute inset-2 flex flex-col justify-center">
            {/* Multiple timeline tracks */}
            <div className="relative h-6 mb-3">
                <div className="absolute inset-0 bg-brand-brown/20 rounded"></div>
                <div className="absolute left-4 top-1 w-24 h-4 bg-brand-ocean/70 rounded-sm"></div>
                <div className="absolute left-32 top-1 w-32 h-4 bg-brand-amber/70 rounded-sm"></div>
                <div className="absolute right-8 top-1 w-20 h-4 bg-brand-ocean/70 rounded-sm"></div>
            </div>
            <div className="relative h-6 mb-3">
                <div className="absolute inset-0 bg-brand-brown/20 rounded"></div>
                <div className="absolute left-8 top-1 w-28 h-4 bg-brand-amber/70 rounded-sm"></div>
                <div className="absolute left-40 top-1 w-24 h-4 bg-brand-ocean/70 rounded-sm"></div>
                <div className="absolute right-12 top-1 w-16 h-4 bg-brand-amber/70 rounded-sm"></div>
            </div>
            <div className="relative h-6 mb-3">
                <div className="absolute inset-0 bg-brand-brown/20 rounded"></div>
                <div className="absolute left-12 top-1 w-20 h-4 bg-brand-ocean/70 rounded-sm"></div>
                <div className="absolute left-36 top-1 w-36 h-4 bg-brand-amber/70 rounded-sm"></div>
                <div className="absolute right-4 top-1 w-24 h-4 bg-brand-ocean/70 rounded-sm"></div>
            </div>
            <div className="relative h-6">
                <div className="absolute inset-0 bg-brand-brown/20 rounded"></div>
                <div className="absolute left-6 top-1 w-32 h-4 bg-brand-amber/70 rounded-sm"></div>
                <div className="absolute left-44 top-1 w-20 h-4 bg-brand-ocean/70 rounded-sm"></div>
                <div className="absolute right-16 top-1 w-28 h-4 bg-brand-amber/70 rounded-sm"></div>
            </div>
            
            {/* Moving playhead - simplified for mobile */}
            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] hidden md:block animate-[cursorMove_8s_ease-in-out_infinite]">
                <div className="absolute -top-2 -left-2 w-5 h-5 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 -left-8 w-6 h-0.5 bg-white/80 -translate-y-1/2"></div>
            </div>
            
            {/* Time markers */}
            <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-brand-light/40 font-mono">
                <span>00:00</span>
                <span>00:30</span>
                <span>01:00</span>
                <span>01:30</span>
                <span>02:00</span>
            </div>
        </div>
        <style>{`
            @keyframes cursorMove {
                0% { left: 0%; }
                20% { left: 25%; }
                40% { left: 45%; }
                60% { left: 70%; }
                80% { left: 90%; }
                100% { left: 100%; }
            }
        `}</style>
    </div>
);

const ScannerMotif = () => (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Visual Effects - Complex Layer System */}
        <div className="absolute inset-4">
            {/* Multiple overlapping layers - simplified for mobile */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-ocean/15 via-brand-amber/10 to-brand-brown/15 rounded-2xl transform rotate-2 hidden md:block animate-[layerFloat_6s_ease-in-out_infinite]"></div>
            <div className="absolute inset-4 bg-gradient-to-tr from-brand-amber/15 via-brand-ocean/10 to-brand-light/15 rounded-xl transform -rotate-1 hidden md:block animate-[layerFloat_6s_ease-in-out_infinite_reverse]" style={{animationDelay: '1s'}}></div>
            
            {/* Layer blend modes - simplified for mobile */}
            <div className="absolute top-8 left-8 w-32 h-20 bg-brand-ocean/20 rounded-lg transform rotate-12 hidden md:block animate-[pulse_4s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-8 right-8 w-28 h-16 bg-brand-amber/20 rounded-lg transform -rotate-6 hidden md:block animate-[pulse_4s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
            
            {/* Multiple cursors working on different layers - simplified for mobile */}
            <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden md:block animate-[cursorLayer_5s_ease-in-out_infinite]">
                <div className="absolute w-6 h-6 border border-white/40 rounded-full -top-1.5 -left-1.5 animate-ping"></div>
            </div>
            
            {/* Adjustment sliders - desktop only */}
            <div className="absolute top-4 right-4 w-2 h-20 bg-brand-brown/30 rounded-full overflow-hidden hidden md:block">
                <div className="absolute bottom-0 w-full bg-brand-amber rounded-full animate-[sliderAdjust_3s_ease-in-out_infinite]"></div>
            </div>
        </div>
        <style>{`
            @keyframes layerFloat {
                0%, 100% { transform: translateY(0px) rotate(2deg); }
                50% { transform: translateY(-8px) rotate(-2deg); }
            }
            @keyframes cursorLayer {
                0% { left: 20%; top: 25%; }
                25% { left: 65%; top: 35%; }
                50% { left: 75%; top: 60%; }
                75% { left: 35%; top: 70%; }
                100% { left: 20%; top: 25%; }
            }
            @keyframes sliderAdjust {
                0%, 100% { height: 30%; }
                50% { height: 70%; }
            }
        `}</style>
    </div>
);

const WaveformMotif = () => (
    <div className="w-full h-full flex items-center justify-center relative">
        {/* 3D Animation - Complex 3D Scene */}
        <div className="absolute inset-0 flex items-center justify-center" style={{perspective: '1200px'}}>
            {/* Multiple 3D objects */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Main rotating cube - simplified for mobile */}
                <div className="w-32 h-32 relative hidden md:block animate-[rotate3d_12s_linear_infinite]" style={{transformStyle: 'preserve-3d'}}>
                    <div className="absolute w-32 h-32 border-2 border-brand-amber/50 bg-brand-amber/5" style={{transform: 'translateZ(64px)'}}></div>
                    <div className="absolute w-32 h-32 border-2 border-brand-ocean/50 bg-brand-ocean/5" style={{transform: 'rotateY(90deg) translateZ(64px)'}}></div>
                    <div className="absolute w-32 h-32 border-2 border-brand-brown/50 bg-brand-brown/5" style={{transform: 'rotateY(180deg) translateZ(64px)'}}></div>
                    <div className="absolute w-32 h-32 border-2 border-brand-light/50 bg-brand-light/5" style={{transform: 'rotateY(-90deg) translateZ(64px)'}}></div>
                </div>
                
                {/* Simple static cube for mobile */}
                <div className="w-24 h-24 border-2 border-brand-amber/50 bg-brand-amber/10 rounded-lg md:hidden"></div>
                
                {/* Secondary rotating tetrahedron - desktop only */}
                <div className="absolute w-20 h-20 hidden md:block animate-[rotateTetra_8s_linear_infinite]" style={{transformStyle: 'preserve-3d', left: '25%', top: '30%'}}>
                    <div className="absolute w-20 h-20 border border-brand-ocean/60" style={{transform: 'rotateY(0deg) translateZ(40px)'}}></div>
                    <div className="absolute w-20 h-20 border border-brand-amber/60" style={{transform: 'rotateY(120deg) translateZ(40px)'}}></div>
                    <div className="absolute w-20 h-20 border border-brand-brown/60" style={{transform: 'rotateY(240deg) translateZ(40px)'}}></div>
                </div>
                
                {/* Orbiting sphere - desktop only */}
                <div className="absolute w-16 h-16 border-2 border-brand-light/60 rounded-full hidden md:block animate-[orbitSphere_10s_linear_infinite]" style={{right: '20%', top: '25%'}}></div>
                
                {/* Grid floor - desktop only */}
                <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 hidden md:block">
                    <div className="w-full h-full bg-gradient-to-t from-brand-brown/20 to-transparent" style={{transform: 'rotateX(70deg) translateZ(-100px)'}}></div>
                    <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(brand-brown/20 1px, transparent 1px), linear-gradient(90deg, brand-brown/20 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                </div>
                
                {/* Multiple 3D cursors - simplified for mobile */}
                <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] hidden md:block animate-[cursor3D_7s_ease-in-out_infinite]">
                    <div className="absolute w-8 h-8 border-2 border-white/40 rounded-full -top-2.5 -left-2.5 animate-ping"></div>
                </div>
                
                {/* Particle effects - reduced for mobile */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 bg-brand-amber rounded-full ${i < 4 ? 'animate-[particle3D_4s_ease-in-out_infinite]' : 'hidden md:block animate-[particle3D_4s_ease-in-out_infinite]'}`}
                        style={{
                            left: `${20 + (i * 10)}%`,
                            top: `${30 + (i * 5)}%`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}
            </div>
        </div>
        <style>{`
            @keyframes rotate3d {
                0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
            }
            @keyframes rotateTetra {
                0% { transform: rotateX(0deg) rotateY(0deg); }
                100% { transform: rotateX(360deg) rotateY(360deg); }
            }
            @keyframes orbitSphere {
                0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
            }
            @keyframes cursor3D {
                0% { left: 20%; top: 30%; transform: translateZ(50px); }
                25% { left: 70%; top: 20%; transform: translateZ(-30px); }
                50% { left: 75%; top: 65%; transform: translateZ(40px); }
                75% { left: 30%; top: 70%; transform: translateZ(-50px); }
                100% { left: 20%; top: 30%; transform: translateZ(50px); }
            }
            @keyframes particle3D {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
                50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
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

            // Use matchMedia to disable animations on mobile for better performance
            const mm = gsap.matchMedia();
            
            mm.add("(min-width: 768px)", () => {
                cards.forEach((card, index) => {
                    if (index === cards.length - 1) return; // Last card doesn't get pushed back

                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top top',
                        endTrigger: cards[index + 1],
                        end: 'top top',
                        pin: true,
                        pinSpacing: false,
                        scrub: 1, // Reduce scrub for smoother performance
                        animation: gsap.to(card, {
                            scale: 0.9,
                            opacity: 0.4,
                            filter: 'blur(8px)', // Reduce blur for performance
                            ease: 'none'
                        })
                    });
                });
            });

        }, containerRef);

        return () => {
            ctx.revert();
            // Clean up matchMedia
            gsap.matchMedia().clear();
        };
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="relative pb-32 z-40">
            <div className="relative">
                {protocols.map((protocol, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className="card-panel h-screen w-full flex items-center justify-center sticky top-0 px-6 md:px-16"
                    >
                        <div className="w-full max-w-4xl md:max-w-6xl bg-brand-dark/40 border border-brand-brown/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-8 md:gap-12 backdrop-blur-xl overflow-hidden h-[70vh] md:h-[75vh]">

                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="font-sans font-bold text-2xl md:text-4xl lg:text-5xl text-brand-light mb-4 md:mb-6 leading-tight">
                                    {protocol.title}
                                </h3>
                                <p 
                                    className="font-sans text-brand-light/70 text-sm md:text-base lg:text-lg max-w-md leading-relaxed [&_a]:text-blue-500 [&_a]:underline [&_a:hover]:text-blue-400"
                                    dangerouslySetInnerHTML={{ __html: protocol.description }}
                                />
                            </div>

                            <div className="flex-1 bg-brand-dark border border-brand-brown/40 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hidden md:block relative h-40 md:h-auto">
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
