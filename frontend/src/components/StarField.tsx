import React, { useEffect, useRef, useCallback } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    pz: number;
    alpha: number;
}

export const StarField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationFrameRef = useRef<number>(0);

    const getTheme = useCallback(() => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }, []);

    const initStars = useCallback((width: number, height: number) => {
        const stars: Star[] = [];
        for (let i = 0; i < 800; i++) {
            stars.push({
                x: Math.random() * width * 2 - width,
                y: Math.random() * height * 2 - height,
                z: Math.random() * width,
                pz: Math.random() * width,
                alpha: Math.random() * 105 + 150,
            });
        }
        starsRef.current = stars;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars(canvas.width, canvas.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouseX = 0;
        let speed = 0;
        let targetSpeed = 3.5;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            targetSpeed = (mouseX / canvas.width) * (15 - 0.5) + 0.5;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            if (!ctx || !canvas) return;

            const currentTheme = getTheme();
            const bgColor = currentTheme === 'dark' ? '13, 17, 23' : '246, 248, 250';
            const starColor = currentTheme === 'dark' ? '201, 209, 217' : '36, 41, 47';
            const lineColor = currentTheme === 'dark' ? '201, 209, 217' : '36, 41, 47';

            speed += (targetSpeed - speed) * 0.05;

            ctx.fillStyle = `rgb(${bgColor})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);

            starsRef.current.forEach((star) => {
                star.z -= speed;
                if (star.z < 1) {
                    star.z = canvas.width;
                    star.pz = star.z;
                    star.x = Math.random() * canvas.width * 2 - canvas.width;
                    star.y = Math.random() * canvas.height * 2 - canvas.height;
                }

                const sx = (star.x / star.z) * canvas.width;
                const sy = (star.y / star.z) * canvas.height;
                const r = (1 - star.z / canvas.width) * 5.5 + 0.5;
                const twinkle = Math.sin(Date.now() * 0.001 + star.z) * 50 + 205;

                ctx.fillStyle = `rgba(${starColor}, ${twinkle / 255})`;
                ctx.beginPath();
                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                ctx.fill();

                const px = (star.x / star.pz) * canvas.width;
                const py = (star.y / star.pz) * canvas.height;
                star.pz = star.z;

                ctx.strokeStyle = `rgba(${lineColor}, 0.2)`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.stroke();
            });

            ctx.restore();

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [getTheme, initStars]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0"
            style={{ pointerEvents: 'none' }}
        />
    );
};