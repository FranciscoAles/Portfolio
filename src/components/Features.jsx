import { useState, useEffect, useRef } from 'react';
import { MousePointer2 } from 'lucide-react';

function DiagnosticShuffler() {
    const [items, setItems] = useState([
        { id: 1, title: 'Geometry Generation', zIndex: 30, scale: 1, y: 0, opacity: 1 },
        { id: 2, title: 'Material Shading', zIndex: 20, scale: 0.95, y: -20, opacity: 0.7 },
        { id: 3, title: 'Rigging Dynamics', zIndex: 10, scale: 0.9, y: -40, opacity: 0.4 },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((currentItems) => {
                const newItems = [...currentItems];
                const last = newItems.pop();
                newItems.unshift(last);

                // Update visual properties based on new positions
                return newItems.map((item, index) => {
                    if (index === 0) return { ...item, zIndex: 30, scale: 1, y: 0, opacity: 1 };
                    if (index === 1) return { ...item, zIndex: 20, scale: 0.95, y: -16, opacity: 0.7 };
                    return { ...item, zIndex: 10, scale: 0.9, y: -32, opacity: 0.4 };
                });
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-brand-brown/20 border border-brand-brown/40 rounded-[2rem] p-8 h-96 flex flex-col items-center justify-end relative shadow-2xl">
            <div className="absolute top-8 left-8 text-left">
                <h3 className="font-sans font-bold text-lg text-brand-light">3D Modeling</h3>
                <p className="text-brand-light/60 text-sm mt-1">Blender & Cinema4D Architecture</p>
            </div>

            <div className="relative w-full h-40 flex justify-center items-end pb-4 perspective-1000">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="absolute w-[80%] h-24 bg-brand-dark border border-brand-brown rounded-2xl flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        style={{
                            zIndex: item.zIndex,
                            transform: `translateY(${item.y}px) scale(${item.scale})`,
                            opacity: item.opacity
                        }}
                    >
                        <span className="font-mono text-xs text-brand-ocean select-none">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TelemetryTypewriter() {
    const [text, setText] = useState('');
    const messages = [
        'NODE_GRAPH_INITIALIZED...',
        'TRACKING_CAMERA_DATA[ok]',
        'ROTO_MATTE_EXTRACTED...',
        'RENDER_PASS_COMPOSITED.',
        'AWAITING_NEW_INPUT_'
    ];

    useEffect(() => {
        let currentMsgIdx = 0;
        let currentCharIdx = 0;
        let isDeleting = false;
        let timer;

        const type = () => {
            const currentMsg = messages[currentMsgIdx];

            if (!isDeleting) {
                setText(currentMsg.substring(0, currentCharIdx + 1));
                currentCharIdx++;

                if (currentCharIdx === currentMsg.length) {
                    isDeleting = true;
                    timer = setTimeout(type, 2000); // pause at end
                } else {
                    timer = setTimeout(type, 50 + Math.random() * 50);
                }
            } else {
                setText(currentMsg.substring(0, currentCharIdx - 1));
                currentCharIdx--;

                if (currentCharIdx === 0) {
                    isDeleting = false;
                    currentMsgIdx = (currentMsgIdx + 1) % messages.length;
                    timer = setTimeout(type, 500); // pause before generic next word
                } else {
                    timer = setTimeout(type, 30);
                }
            }
        };

        timer = setTimeout(type, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-brand-brown/20 border border-brand-brown/40 rounded-[2rem] p-8 h-96 flex flex-col relative shadow-2xl">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="font-sans font-bold text-lg text-brand-light">VFX & Compositing</h3>
                    <p className="text-brand-light/60 text-sm mt-1">Nuke & After Effects</p>
                </div>
                <div className="flex items-center gap-2 bg-brand-dark/50 px-3 py-1 rounded-full border border-brand-amber/30">
                    <div className="w-2 h-2 rounded-full bg-brand-amber animate-pulse"></div>
                    <span className="font-mono text-[10px] text-brand-amber uppercase tracking-wider">Live Feed</span>
                </div>
            </div>

            <div className="flex-1 bg-brand-dark/80 rounded-xl border border-brand-brown p-4 overflow-hidden relative font-mono text-sm text-brand-ocean leading-relaxed shadow-inner">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-brand-dark/80 to-transparent pointer-events-none"></div>
                <div className="absolute top-2 left-4 text-brand-brown/50 text-[10px]">TERMINAL_STDOUT</div>
                <div className="mt-6">
                    <span className="text-brand-light/50 mr-2">{'>'}</span>
                    {text}
                    <span className="inline-block w-2.5 h-4 ml-1 bg-brand-amber animate-pulse align-middle"></span>
                </div>
            </div>
        </div>
    );
}

function CursorProtocolScheduler() {
    const [activeDay, setActiveDay] = useState(null);
    const [buttonPressed, setButtonPressed] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        let animationFrame;
        let startTime;
        const duration = 4000;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = ((timestamp - startTime) % duration) / duration;

            setActiveDay(null);
            setButtonPressed(false);

            if (cursorRef.current) {
                if (progress < 0.2) {
                    // ENTER
                    cursorRef.current.style.transform = `translate(10px, 120px)`;
                    cursorRef.current.style.opacity = progress * 5;
                } else if (progress < 0.4) {
                    // MOVE TO DAY (Wednesday - index 3)
                    const ease = (progress - 0.2) * 5; // 0 to 1
                    const x = 10 + ease * 110;
                    const y = 120 - ease * 50;
                    cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
                } else if (progress < 0.5) {
                    // CLICK DAY
                    cursorRef.current.style.transform = `translate(120px, 70px) scale(0.9)`;
                    setActiveDay(3);
                } else if (progress < 0.7) {
                    // MOVE TO SAVE
                    setActiveDay(3);
                    const ease = (progress - 0.5) * 5; // 0 to 1
                    const x = 120 - ease * 40;
                    const y = 70 + ease * 100;
                    cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
                } else if (progress < 0.8) {
                    // CLICK SAVE
                    setActiveDay(3);
                    cursorRef.current.style.transform = `translate(80px, 170px) scale(0.9)`;
                    setButtonPressed(true);
                } else {
                    // FADE OUT
                    setButtonPressed(false);
                    const opacity = 1 - ((progress - 0.8) * 5);
                    cursorRef.current.style.opacity = Math.max(0, opacity);
                    cursorRef.current.style.transform = `translate(80px, 170px)`;
                }
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="bg-brand-brown/20 border border-brand-brown/40 rounded-[2rem] p-8 h-96 flex flex-col relative shadow-2xl overflow-hidden">
            <div>
                <h3 className="font-sans font-bold text-lg text-brand-light">Cinematic Editing</h3>
                <p className="text-brand-light/60 text-sm mt-1">Premiere Pro Timelines</p>
            </div>

            <div className="flex-1 mt-8 relative">
                <div className="flex justify-between mb-8">
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs transition-colors duration-200 border
                ${activeDay === i
                                    ? 'bg-brand-ocean border-brand-ocean text-brand-dark grid-highlight'
                                    : 'bg-brand-dark border-brand-brown/50 text-brand-light/50'
                                }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <div className={`px-8 py-2 rounded-full font-mono text-xs tracking-widest transition-transform duration-100 ${buttonPressed ? 'scale-95 bg-brand-ocean text-brand-dark' : 'bg-brand-dark border border-brand-brown text-brand-light'}`}>
                        RENDER SEQUENCE
                    </div>
                </div>

                <div
                    ref={cursorRef}
                    className="absolute top-0 left-0 w-8 h-8 pointer-events-none drop-shadow-md z-50 text-brand-amber transition-transform origin-top-left"
                    style={{ willChange: 'transform, opacity' }}
                >
                    <MousePointer2 fill="#E88821" className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <section id="capabilities" className="py-32 px-6 md:px-16 relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="font-sans font-bold uppercase tracking-widest text-brand-ocean text-sm md:text-base mb-4">
                        Interactive Functional Artifacts
                    </h2>
                    <p className="font-serif italic text-4xl md:text-5xl text-brand-light max-w-2xl leading-tight">
                        The tools of the craft, elevated to precision instruments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DiagnosticShuffler />
                    <TelemetryTypewriter />
                    <CursorProtocolScheduler />
                </div>
            </div>
        </section>
    );
}
