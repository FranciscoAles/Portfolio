import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Intro({ onComplete }) {
    const containerRef = useRef(null);
    const flashRef = useRef(null);
    const nameRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const flash = flashRef.current;
        const name = nameRef.current;
        const particles = particlesRef.current;

        if (!container || !flash || !name || !particles) {
            console.error('Intro elements not found');
            return;
        }

        console.log('Intro starting...');

        // Disable scrolling during intro
        document.body.style.overflow = 'hidden';
        
        // Force scroll to top
        window.scrollTo(0, 0);
        
        // Prevent any scroll attempts
        const preventScroll = (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        };
        window.addEventListener('scroll', preventScroll);
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });

        // Create timeline for quick intro
        const tl = gsap.timeline({
            onComplete: () => {
                console.log('Intro completed');
                // Clean up scroll prevention
                window.removeEventListener('scroll', preventScroll);
                window.removeEventListener('wheel', preventScroll);
                window.removeEventListener('touchmove', preventScroll);
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    onComplete();
                }, 100);
            }
        });

        // Initial states
        gsap.set(container, { opacity: 1 });
        gsap.set(flash, { opacity: 0, scale: 0 });
        gsap.set(name, { 
            opacity: 0, 
            scale: 0.3,
            rotationY: -90
        });
        gsap.set(particles.children, { 
            scale: 0, 
            opacity: 0,
            transformOrigin: 'center'
        });

        // Quick professional sequence
        tl.to(name, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        })
        .to(particles.children, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.02,
            ease: 'back.out(1.2)'
        }, '-=0.3')
        // Quick pause
        .to({}, { duration: 0.3 })
        // NAME EXPLODES!
        .to(name, {
            opacity: 0,
            scale: 3,
            duration: 0.25,
            ease: 'power2.in'
        })
        // MASSIVE PARTICLE EXPLOSION!
        .to(particles.children, {
            scale: 4,
            opacity: 0,
            x: (i) => gsap.utils.random(-600, 600),
            y: (i) => gsap.utils.random(-600, 600),
            duration: 0.6,
            stagger: 0.005,
            ease: 'power2.out'
        }, '-=0.2')
        // DIP TO WHITE TRANSITION!
        .to(flash, {
            opacity: 1,
            scale: 8,
            duration: 0.3,
            ease: 'power2.in'
        }, '-=0.2')
        // Hold white briefly
        .to(flash, {
            opacity: 1,
            duration: 0.1
        })
        // White fades out revealing ENTIRE site
        .to(flash, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        })
        // Container fades out DURING white fade
        .to(container, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in'
        }, '-=0.4');

        return () => {
            tl.kill();
            // Ensure cleanup
            window.removeEventListener('scroll', preventScroll);
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-brand-dark flex items-center justify-center overflow-hidden"
        >
            {/* MASSIVE Particle explosion */}
            <div ref={particlesRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(48)].map((_, i) => {
                    const angle = (i / 48) * Math.PI * 2;
                    const distance = 50 + (i % 4) * 25;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    
                    return (
                        <div
                            key={i}
                            className="absolute w-2.5 h-2.5 bg-brand-amber rounded-full"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                            }}
                        />
                    );
                })}
            </div>

            {/* Main content */}
            <div ref={nameRef} className="relative z-10 text-center">
                <h1 className="drama-serif text-5xl md:text-7xl lg:text-8xl font-bold text-brand-light leading-none">
                    FRANCISCO<br/>ALESANDRONI
                </h1>
            </div>

            {/* WHITE FLASH! */}
            <div 
                ref={flashRef}
                className="absolute inset-0 bg-white pointer-events-none"
            />
        </div>
    );
}
