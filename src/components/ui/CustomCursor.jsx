import { useEffect, useRef } from 'react';


const CustomCursor = () => {
    // Actually, let's use refs entirely to avoid re-renders
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorOutline = cursorOutlineRef.current;

        if (!cursorDot || !cursorOutline) return;

        // Mouse position state for smooth animation
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instant update for the small dot
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
        };

        const animateOutline = () => {
            // Smooth follow for the outline
            const speed = 0.2; // Adjust for lag/smoothness

            outlineX += (mouseX - outlineX) * speed;
            outlineY += (mouseY - outlineY) * speed;

            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

            requestAnimationFrame(animateOutline);
        };

        const onMouseOver = (e) => {
            const isHover = e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('.cursor-hover') ||
                e.target.closest('[role="button"]');

            if (isHover) {
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            } else {
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`;
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);

        const animationId = requestAnimationFrame(animateOutline);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Small Dot - Instant Follow */}
            <div
                ref={cursorDotRef}
                className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full -mt-1 -ml-1 opacity-0 transition-opacity duration-300 pointer-events-none mix-blend-difference"
            />
            {/* Large Circle - Smooth Follow */}
            <div
                ref={cursorOutlineRef}
                className="absolute top-0 left-0 w-8 h-8 border border-white rounded-full -mt-4 -ml-4 opacity-0 transition-opacity duration-300 pointer-events-none mix-blend-difference"
            />
        </div>
    );
};

export default CustomCursor;
