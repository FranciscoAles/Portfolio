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

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
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

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        // Shockwaves & Bursts
        let shockwaves = [];
        let bursts = [];

        const onClick = (e) => {
            shockwaves.push({ x: e.clientX, y: e.clientY, radius: 0, life: 1 });
            // Explosion bursts
            for (let i = 0; i < 80; i++) {
                let angle = Math.random() * Math.PI * 2;
                let speed = Math.random() * 8 + 2;
                bursts.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1 + Math.random() * 0.5,
                    decay: Math.random() * 0.02 + 0.015,
                    color: Math.random() > 0.6 ? '#1F92EA' : (Math.random() > 0.5 ? '#E88821' : '#F3F6F4'),
                    size: Math.random() * 2.5 + 0.5
                });
            }
        };
        window.addEventListener('mousedown', onClick);

        // Particles (Flow Field)
        let particles = [];
        const numParticles = Math.min(1000, (width * height) / 1200); // Scale with screen, fewer particles for less distraction
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: 0,
                vy: 0,
                size: Math.random() * 1.5 + 0.5,
                baseColor: Math.random() > 0.8 ? '#1F92EA' : '#F3F6F4',
                opacity: Math.random() * 0.3 + 0.05 // Lower base opacity
            });
        }

        // Slower background ambient stars/dust to fill empty space
        let dustFields = [];
        const numDust = Math.min(800, (width * height) / 800);
        for (let i = 0; i < numDust; i++) {
            dustFields.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.2,
                opacity: Math.random() * 0.4 + 0.1,
                speedY: Math.random() * -0.2 - 0.05,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }

        const render = () => {
            time += 0.005;

            // Motion blur trail over a dark background
            ctx.fillStyle = 'rgba(16, 16, 25, 0.25)'; // brand-dark with opacity
            ctx.fillRect(0, 0, width, height);

            // Draw Flow Field Particles
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // Flow field vector
                let angle = Math.sin(p.x * 0.001 + time) * Math.cos(p.y * 0.001 + time) * Math.PI * 2;
                p.vx += Math.cos(angle) * 0.05;
                p.vy += Math.sin(angle) * 0.05;

                // General upward drift
                p.vy -= 0.02;

                // Mouse interaction - modified to push away gently but still feel magical
                if (mouse.active) {
                    let mdx = mouse.x - p.x;
                    let mdy = mouse.y - p.y;
                    let dist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (dist < 300) { // Larger area of effect
                        let force = (300 - dist) / 300;
                        // Push away gently
                        p.vx -= (mdx / dist) * force * 0.3;
                        p.vy -= (mdy / dist) * force * 0.3;

                        // Add slight swirling
                        let angleToMouse = Math.atan2(mdy, mdx);
                        p.vx += Math.cos(angleToMouse + Math.PI / 2) * force * 0.2;
                        p.vy += Math.sin(angleToMouse + Math.PI / 2) * force * 0.2;
                    }
                }

                // Shockwave displacement
                for (let sw of shockwaves) {
                    let sdx = sw.x - p.x;
                    let sdy = sw.y - p.y;
                    let sdist = Math.sqrt(sdx * sdx + sdy * sdy);
                    let diff = Math.abs(sdist - sw.radius);
                    if (diff < 40) {
                        let pull = (40 - diff) / 40;
                        p.vx += (sdx / sdist) * pull * 2;
                        p.vy += (sdy / sdist) * pull * 2;
                    }
                }

                // Friction
                p.vx *= 0.94;
                p.vy *= 0.94;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Color & Draw
                // Dynamically boost opacity if moving fast
                let speedAvg = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                let dynamicOpacity = Math.min(1, p.opacity + speedAvg * 0.1);

                // Parse base color to apply opacity
                let r, g, b;
                if (p.baseColor === '#1F92EA') { r = 31; g = 146; b = 234; }
                else { r = 243; g = 246; b = 244; }

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dynamicOpacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw background ambient dust
            for (let i = 0; i < dustFields.length; i++) {
                let d = dustFields[i];

                // Slow drift
                d.y += d.speedY;
                if (d.y < 0) d.y = height;

                // Base opacity + twinkling
                let currentOpacity = d.opacity * (0.5 + 0.5 * Math.sin(time * d.twinkleSpeed * 100 + d.twinkleOffset));

                // Mouse interaction (very faint push away)
                let drawnX = d.x;
                let drawnY = d.y;
                if (mouse.active) {
                    let mdx = mouse.x - d.x;
                    let mdy = mouse.y - d.y;
                    let dist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (dist < 200) {
                        let push = (200 - dist) / 200;
                        drawnX -= (mdx / dist) * push * 15;
                        drawnY -= (mdy / dist) * push * 15;
                    }
                }

                ctx.fillStyle = `rgba(243, 246, 244, ${currentOpacity * 0.5})`;
                ctx.beginPath();
                ctx.arc(drawnX, drawnY, d.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw Bursts
            for (let i = bursts.length - 1; i >= 0; i--) {
                let b = bursts[i];
                b.x += b.vx;
                b.y += b.vy;
                b.vx *= 0.95;
                b.vy *= 0.95;
                b.vy -= 0.05; // slight float up
                b.life -= b.decay;

                let hex = b.color;
                let r, g, bb;
                if (hex === '#1F92EA') { r = 31; g = 146; bb = 234; }
                else if (hex === '#E88821') { r = 232; g = 136; bb = 33; }
                else { r = 243; g = 246; bb = 244; }

                ctx.fillStyle = `rgba(${r}, ${g}, ${bb}, ${b.life})`;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
                ctx.fill();

                if (b.life <= 0) bursts.splice(i, 1);
            }

            // Draw Shockwaves
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                let sw = shockwaves[i];
                sw.radius += 12;
                sw.life -= 0.03;

                ctx.strokeStyle = `rgba(232, 136, 33, ${sw.life * 0.6})`; // Amber
                ctx.lineWidth = 2 + (sw.life * 2);
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.stroke();

                if (sw.life <= 0) shockwaves.splice(i, 1);
            }

            // Mouse Nebula Glow
            if (mouse.active) {
                let gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
                gradient.addColorStop(0, 'rgba(31, 146, 234, 0.08)'); // Ocean, softer
                gradient.addColorStop(0.3, 'rgba(232, 136, 33, 0.03)'); // Amber, softer
                gradient.addColorStop(1, 'rgba(16, 16, 25, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
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
