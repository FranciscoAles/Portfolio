import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({ title, description, tools, icon, index, totalCards }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Staggered entrance animation based on scroll
        gsap.fromTo(card,
            {
                y: 100,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Hover effect
        const handleMouseEnter = () => {
            gsap.to(card, {
                scale: 1.02,
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative bg-brand-dark/40 border border-brand-brown/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:border-brand-amber/50"
        >
            {/* Background gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-ocean/5 via-transparent to-brand-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Icon */}
            <div className="relative z-10 mb-6">
                <div className="w-16 h-16 bg-brand-amber/20 rounded-2xl flex items-center justify-center text-brand-amber text-2xl font-bold group-hover:bg-brand-amber/30 transition-colors duration-300">
                    {icon}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="font-sans font-bold text-2xl md:text-3xl text-brand-light mb-4 group-hover:text-brand-amber transition-colors duration-300">
                    {title}
                </h3>
                
                <p className="font-sans text-brand-light/80 text-base md:text-lg leading-relaxed mb-6">
                    {description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                    {tools.map((tool, toolIndex) => (
                        <span
                            key={toolIndex}
                            className="px-3 py-1 bg-brand-ocean/20 border border-brand-ocean/30 rounded-full text-xs md:text-sm font-mono text-brand-ocean group-hover:bg-brand-ocean/30 transition-colors duration-300"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand-amber/30 group-hover:border-brand-amber/60 transition-colors duration-300"></div>
        </div>
    );
};

export default function Skills() {
    const sectionRef = useRef(null);

    const skills = [
        {
            title: 'Video Editing',
            description: 'Transforming raw footage into compelling narratives through precise cuts, rhythmic pacing, and emotional storytelling. I craft seamless transitions and maintain perfect continuity while enhancing the overall impact of your vision.',
            tools: ['Premiere Pro', 'After Effects'],
            icon: '🎬'
        },
        {
            title: 'Visual Effects',
            description: 'Creating stunning visual elements that blend reality with imagination. From particle systems and motion tracking to compositing and color grading, I bring impossible concepts to life with technical precision and artistic flair.',
            tools: ['After Effects', 'Photoshop'],
            icon: '✨'
        },
        {
            title: '3D Animation',
            description: 'Building immersive 3D worlds and animations from concept to completion. I model, rig, and animate characters and environments, creating dynamic scenes that captivate audiences and push creative boundaries.',
            tools: ['Blender', 'After Effects'],
            icon: '🎭'
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Section title animation
        gsap.fromTo('.section-title',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                }
            }
        );

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="py-32 px-6 md:px-16 relative z-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="section-title font-sans font-bold uppercase tracking-widest text-brand-ocean text-sm md:text-base mb-6">
                        Core Competencies
                    </h2>
                    <p className="drama-serif text-4xl md:text-6xl text-brand-light leading-tight">
                        Crafted with precision, <br />
                        <span className="text-brand-amber">delivered with passion.</span>
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={index}
                            title={skill.title}
                            description={skill.description}
                            tools={skill.tools}
                            icon={skill.icon}
                            index={index}
                            totalCards={skills.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
