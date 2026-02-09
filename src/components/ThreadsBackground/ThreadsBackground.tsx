
import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ThreadsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isDark } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let animationFrameId: number;
        let time = 0;

        // Palette Colors
        const colorDark = '#748CAB'; // Shadow Blue
        const bgDark = '#0D1321';    // Oxford Blue

        // Light Mode: Using a very light warm background and subtle blue-grey threads
        const colorLight = '#3E5C76'; // Paynes Gray
        const bgLight = '#F0EBD8';    // Isabelline

        // Helper to convert hex to rgba
        const hexToRgba = (hex: string, alpha: number) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        const threadColor = isDark ? colorDark : colorLight;
        const backgroundColor = isDark ? bgDark : bgLight;
        const alpha = 0.15; // Low opacity for subtle effect

        class Thread {
            y: number;
            wavelength: number;
            amplitude: number;
            speed: number;
            offset: number;

            constructor(y: number) {
                this.y = y;
                this.wavelength = 50 + Math.random() * 100;
                this.amplitude = 10 + Math.random() * 10;
                this.speed = 0.002 + Math.random() * 0.002;
                this.offset = Math.random() * Math.PI * 2;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();

                for (let x = 0; x <= width; x += 10) {
                    const y = this.y +
                        Math.sin(x / this.wavelength + time * this.speed + this.offset) * this.amplitude;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                ctx.stroke();
            }
        }

        const threads: Thread[] = [];
        const spacing = 15; // Space between threads

        // Initialize threads
        for (let y = -50; y < height + 50; y += spacing) {
            threads.push(new Thread(y));
        }

        const render = () => {
            time += 1;

            // Clear with background color
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);

            // Set thread style
            ctx.strokeStyle = hexToRgba(threadColor, alpha);
            ctx.lineWidth = 1;

            // Draw all threads
            threads.forEach(thread => thread.draw(ctx));

            animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-initialize threads on resize to cover new height
            threads.length = 0;
            for (let y = -50; y < height + 50; y += spacing) {
                threads.push(new Thread(y));
            }
        };

        window.addEventListener('resize', handleResize);
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
