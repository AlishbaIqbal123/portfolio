import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface NaqabAvatarProps {
    className?: string;
    size?: number;
    interactive?: boolean;
}

export function NaqabAvatar({ className = '', size = 100, interactive = true }: NaqabAvatarProps) {
    const avatarRef = useRef<HTMLDivElement>(null);
    
    // Motion values for tracking cursor
    const mouseX = useMotionValue(0.5); // normalized 0 to 1
    const mouseY = useMotionValue(0.5); // normalized 0 to 1

    // Spring configurations for ultra smooth lag-behind motion
    const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Eyelid state for active blinks (independent of mouse tracking)
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        if (!interactive) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize coordinate system relative to screen size
            const nx = e.clientX / window.innerWidth;
            const ny = e.clientY / window.innerHeight;
            
            mouseX.set(nx);
            mouseY.set(ny);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [interactive, mouseX, mouseY]);

    // Periodic automatic blinking
    useEffect(() => {
        const triggerBlink = () => {
            setIsBlinking(true);
            setTimeout(() => {
                setIsBlinking(false);
            }, 120); // Blink duration
        };

        // Blink every 3 to 6 seconds randomly
        const interval = setInterval(() => {
            if (Math.random() > 0.3) {
                triggerBlink();
            }
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    // 2.5D Parallax translations for the cartoon head
    const headX = useTransform(springX, [0, 1], [-18, 18]);
    const headY = useTransform(springY, [0, 1], [-8, 10]);
    const headRotate = useTransform(springX, [0, 1], [-6, 6]);

    // Eye pupils position offsets
    const pupilX = useTransform(springX, [0, 1], [-4.5, 4.5]);
    const pupilY = useTransform(springY, [0, 1], [-3.5, 3.5]);

    // Eyelids droop based on cursor Y (closes slightly when looking down)
    // Map cursor Y (0 to 1) to vertical radius ry of eyeball (8 to 5).
    // If blinking, force ry to 0.5 (nearly closed).
    const baseLidHeight = useTransform(springY, [0, 1], [8.5, 5.0]);
    
    // We combine the blinking state with cursor tracking
    const [lidHeight, setLidHeight] = useState(8);
    
    useEffect(() => {
        if (isBlinking) {
            setLidHeight(0.3);
        } else {
            return baseLidHeight.on('change', (latest) => {
                setLidHeight(latest);
            });
        }
    }, [isBlinking, baseLidHeight]);

    return (
        <div 
            ref={avatarRef}
            className={`relative flex items-center justify-center select-none overflow-visible ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Glow / Shadow Aura behind the head */}
            <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/20 blur-xl animate-pulse" />

            <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-lg overflow-visible"
            >
                {/* Background circle badge for aesthetic matching */}
                <circle 
                    cx="60" 
                    cy="60" 
                    r="52" 
                    className="fill-muted/40 stroke-primary/10 dark:stroke-primary/20" 
                    strokeWidth="1.5"
                />

                {/* Main animated head group */}
                <motion.g
                    style={{
                        x: headX,
                        y: headY,
                        rotate: headRotate,
                        transformOrigin: "60px 80px"
                    }}
                >
                    {/* Inner Hijab cap - framing the forehead */}
                    <path
                        d="M32 55C32 38 42 28 60 28C78 28 88 38 88 55H32Z"
                        className="fill-primary/20 dark:fill-primary/30"
                    />

                    {/* Skin/Forehead area under the hijab (only area visible except eyes) */}
                    <path
                        d="M34 56C34 40 44 32 60 32C76 32 86 40 86 56C86 64 80 66 60 66C40 66 34 64 34 56Z"
                        className="fill-[hsl(34,50%,80%)] dark:fill-[hsl(34,35%,70%)]"
                    />

                    {/* Eyes and Eyelids Container */}
                    <g className="eyes-container">
                        {/* LEFT EYE */}
                        <g transform="translate(47, 52)">
                            {/* Eyeball / Sclera (White background) clipped by animated eyelid radius */}
                            <ellipse
                                cx="0"
                                cy="0"
                                rx="9"
                                ry={lidHeight}
                                className="fill-card-foreground dark:fill-background stroke-primary/30 dark:stroke-primary/50"
                                strokeWidth="1"
                            />
                            
                            {/* Left Pupil - restricted movement */}
                            <g clipPath="url(#eye-clip-left)">
                                <ellipse
                                    cx="0"
                                    cy="0"
                                    rx="9"
                                    ry={lidHeight}
                                    className="fill-white"
                                />
                                <motion.circle
                                    style={{ x: pupilX, y: pupilY }}
                                    cx="0"
                                    cy="0"
                                    r="3.8"
                                    className="fill-primary dark:fill-accent"
                                />
                                {/* Sparkle shine in pupil */}
                                <motion.circle
                                    style={{ x: useTransform(pupilX, (v) => v + 1), y: useTransform(pupilY, (v) => v - 1) }}
                                    cx="0"
                                    cy="0"
                                    r="1.2"
                                    className="fill-white"
                                />
                            </g>

                            {/* Upper lash/brow line for premium look */}
                            <path 
                                d="M-11 -3 Q-4 -8 10 -3" 
                                className="stroke-primary dark:stroke-foreground fill-none" 
                                strokeWidth="2.2" 
                                strokeLinecap="round"
                            />
                        </g>

                        {/* RIGHT EYE */}
                        <g transform="translate(73, 52)">
                            {/* Eyeball / Sclera (White background) clipped by animated eyelid radius */}
                            <ellipse
                                cx="0"
                                cy="0"
                                rx="9"
                                ry={lidHeight}
                                className="fill-card-foreground dark:fill-background stroke-primary/30 dark:stroke-primary/50"
                                strokeWidth="1"
                            />

                            {/* Right Pupil - restricted movement */}
                            <g clipPath="url(#eye-clip-right)">
                                <ellipse
                                    cx="0"
                                    cy="0"
                                    rx="9"
                                    ry={lidHeight}
                                    className="fill-white"
                                />
                                <motion.circle
                                    style={{ x: pupilX, y: pupilY }}
                                    cx="0"
                                    cy="0"
                                    r="3.8"
                                    className="fill-primary dark:fill-accent"
                                />
                                {/* Sparkle shine in pupil */}
                                <motion.circle
                                    style={{ x: useTransform(pupilX, (v) => v + 1), y: useTransform(pupilY, (v) => v - 1) }}
                                    cx="0"
                                    cy="0"
                                    r="1.2"
                                    className="fill-white"
                                />
                            </g>

                            {/* Upper lash/brow line */}
                            <path 
                                d="M-10 -3 Q4 -8 11 -3" 
                                className="stroke-primary dark:stroke-foreground fill-none" 
                                strokeWidth="2.2" 
                                strokeLinecap="round"
                            />
                        </g>
                    </g>

                    {/* Naqab / Niqab (Lower Face Veil) */}
                    {/* Covers cheeks, nose and mouth, starting right under the eyes */}
                    <path
                        d="M26 62
                           C28 62, 38 61, 46 61
                           C54 61, 66 61, 74 61
                           C82 61, 92 62, 94 62
                           C98 75, 96 98, 88 108
                           C80 114, 60 116, 60 116
                           C60 116, 40 114, 32 108
                           C24 98, 22 75, 26 62Z"
                        className="fill-primary dark:fill-primary-foreground stroke-primary/20 dark:stroke-primary/30"
                        strokeWidth="1.5"
                    />

                    {/* Naqab middle fold/seam details for realistic look */}
                    <path
                        d="M60 61V115"
                        className="stroke-black/10 dark:stroke-white/10"
                        strokeWidth="1"
                    />

                    {/* Hijab wrap drape (Surrounding the head) */}
                    <path
                        d="M32 50
                           C30 32, 42 22, 60 22
                           C78 22, 90 32, 88 50
                           C88 64, 96 74, 98 84
                           C100 96, 96 112, 84 116
                           C72 120, 60 120, 60 120
                           C60 120, 48 120, 36 116
                           C24 112, 20 96, 22 84
                           C24 74, 32 64, 32 50Z"
                        className="fill-none stroke-primary dark:stroke-primary"
                        strokeWidth="6.5"
                        strokeLinecap="round"
                    />

                    {/* Inner styling/shading on Hijab folds */}
                    <path
                        d="M25 42C28 32, 42 25, 60 25C78 25, 92 32, 95 42"
                        className="stroke-primary-foreground/30 dark:stroke-accent/20 fill-none"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </motion.g>

                {/* Clip paths definition for pupils */}
                <defs>
                    <clipPath id="eye-clip-left">
                        <ellipse cx="0" cy="0" rx="9" ry={lidHeight} />
                    </clipPath>
                    <clipPath id="eye-clip-right">
                        <ellipse cx="0" cy="0" rx="9" ry={lidHeight} />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}
