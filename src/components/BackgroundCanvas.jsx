import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });

        let width, height;
        let animationFrameId;
        let time = 0;

        let mouse = { x: -1000, y: -1000, active: false };

        // Initialize particles array
        let particles = [];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            
            // Recalculate particles based on new dimensions
            const targetNumParticles = Math.min(50, (width * height) / 20000);
            const currentNumParticles = particles.filter(p => !p.temporary).length;
            
            if (targetNumParticles > currentNumParticles) {
                // Add more particles
                for (let i = 0; i < targetNumParticles - currentNumParticles; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: Math.random() * 3 + 1,
                        baseColor: Math.random() > 0.7 ? '#1F92EA' : (Math.random() > 0.5 ? '#E88821' : '#F3F6F4'),
                        opacity: Math.random() * 0.3 + 0.1,
                        pulsePhase: Math.random() * Math.PI * 2
                    });
                }
            } else if (targetNumParticles < currentNumParticles) {
                // Remove excess particles (keep temporary ones)
                let removed = 0;
                for (let i = particles.length - 1; i >= 0 && removed < (currentNumParticles - targetNumParticles); i--) {
                    if (!particles[i].temporary) {
                        particles.splice(i, 1);
                        removed++;
                    }
                }
            }
        };
        window.addEventListener('resize', resize);
        resize();

        // Mouse Events
        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };
        const onMouseLeave = () => { mouse.active = false; };

        // Click ripples
        let ripples = [];

        const onClick = (e) => {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: 200,
                life: 1,
                color: Math.random() > 0.5 ? '#1F92EA' : '#E88821'
            });
            
            // Spawn a few extra particles on click
            for (let i = 0; i < 8; i++) {
                let angle = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * 3,
                    vy: Math.sin(angle) * 3,
                    size: Math.random() * 2 + 1,
                    baseColor: Math.random() > 0.5 ? '#1F92EA' : '#E88821',
                    opacity: 0.6,
                    pulsePhase: Math.random() * Math.PI * 2,
                    temporary: true
                });
            }
        };
        window.addEventListener('mousedown', onClick);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        // Initialize particles after resize is defined
        const numParticles = Math.min(50, (width * height) / 20000);
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                baseColor: Math.random() > 0.7 ? '#1F92EA' : (Math.random() > 0.5 ? '#E88821' : '#F3F6F4'),
                opacity: Math.random() * 0.3 + 0.1,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }

        const render = () => {
            time += 0.01;

            // Clear with dark background
            ctx.fillStyle = 'rgba(16, 16, 25, 1)';
            ctx.fillRect(0, 0, width, height);

            // Draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                let p = particles[i];

                // Gentle floating motion
                p.x += p.vx + Math.sin(time + p.pulsePhase) * 0.2;
                p.y += p.vy + Math.cos(time + p.pulsePhase) * 0.1;

                // Mouse interaction - gentle attraction
                if (mouse.active) {
                    let mdx = mouse.x - p.x;
                    let mdy = mouse.y - p.y;
                    let dist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (dist < 200 && dist > 20) {
                        let force = (200 - dist) / 200 * 0.02;
                        p.vx += (mdx / dist) * force;
                        p.vy += (mdy / dist) * force;
                    }
                }

                // Apply friction
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Wrap around edges
                if (p.x < -50) p.x = width + 50;
                if (p.x > width + 50) p.x = -50;
                if (p.y < -50) p.y = height + 50;
                if (p.y > height + 50) p.y = -50;

                // Handle temporary particles (from clicks)
                if (p.temporary) {
                    p.opacity -= 0.01;
                    if (p.opacity <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }
                }

                // Gentle pulsing opacity
                let dynamicOpacity = p.opacity + Math.sin(time * 2 + p.pulsePhase) * 0.1;
                dynamicOpacity = Math.max(0.05, Math.min(0.6, dynamicOpacity));

                // Draw particle with soft glow
                let r, g, b;
                if (p.baseColor === '#1F92EA') { r = 31; g = 146; b = 234; }
                else if (p.baseColor === '#E88821') { r = 232; g = 136; b = 33; }
                else { r = 243; g = 246; b = 244; }

                // Create soft gradient for each particle
                let grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${dynamicOpacity})`);
                grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${dynamicOpacity * 0.5})`);
                grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw click ripples
            for (let i = ripples.length - 1; i >= 0; i--) {
                let ripple = ripples[i];
                ripple.radius += 4;
                ripple.life -= 0.02;

                if (ripple.life <= 0) {
                    ripples.splice(i, 1);
                    continue;
                }

                let r, g, b;
                if (ripple.color === '#1F92EA') { r = 31; g = 146; b = 234; }
                else { r = 232; g = 136; b = 33; }

                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ripple.life * 0.6})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.stroke();

                // Inner glow
                let grad = ctx.createRadialGradient(ripple.x, ripple.y, 0, ripple.x, ripple.y, ripple.radius);
                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${ripple.life * 0.1})`);
                grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Subtle mouse glow
            if (mouse.active) {
                let gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
                gradient.addColorStop(0, 'rgba(31, 146, 234, 0.05)');
                gradient.addColorStop(0.5, 'rgba(232, 136, 33, 0.02)');
                gradient.addColorStop(1, 'rgba(16, 16, 25, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('mousedown', onClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
        />
    );
}
