import { useEffect, useRef } from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';
import './InteractiveCursor.css';

const interactiveSelector = 'a[href], button:not(:disabled), [role="button"], summary';
const nativeSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, video';
const spring = { stiffness: 550, damping: 38, mass: 0.45 };

export default function InteractiveCursor() {
    const cursor = useRef(null);
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);

    useEffect(() => {
        const element = cursor.current;
        const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
        const controller = new AbortController();
        const options = { passive: true, signal: controller.signal };
        let visible = false;

        const hide = () => {
            visible = false;
            element.dataset.visible = 'false';
            element.dataset.pressed = 'false';
        };

        const updateTarget = (target) => {
            if (!(target instanceof Element) || target.closest(nativeSelector)) {
                hide();
                return false;
            }
            element.dataset.interactive = String(Boolean(target.closest(interactiveSelector)));
            return true;
        };

        const move = (event) => {
            if (!media.matches || event.pointerType !== 'mouse') {
                hide();
                return;
            }
            if (!updateTarget(event.target)) return;

            pointerX.set(event.clientX);
            pointerY.set(event.clientY);
            if (!visible) {
                // Re-enter at the pointer instead of flying across the screen.
                x.jump(event.clientX);
                y.jump(event.clientY);
                visible = true;
                element.dataset.visible = 'true';
            }
        };

        const press = (event) => {
            if (event.pointerType !== 'mouse') {
                hide();
                return;
            }
            if (visible) element.dataset.pressed = 'true';
        };
        const release = () => { element.dataset.pressed = 'false'; };
        const leave = (event) => { if (!event.relatedTarget) hide(); };

        window.addEventListener('pointermove', move, options);
        window.addEventListener('pointerdown', press, options);
        window.addEventListener('pointerup', release, options);
        window.addEventListener('pointercancel', hide, options);
        window.addEventListener('pointerout', leave, options);
        window.addEventListener('blur', hide, options);
        window.addEventListener('keydown', hide, options);
        window.addEventListener('scroll', hide, { ...options, capture: true });
        document.addEventListener('visibilitychange', hide, options);
        media.addEventListener('change', hide, options);

        return () => controller.abort();
    }, [pointerX, pointerY, x, y]);

    return (
        <Motion.div
            ref={cursor}
            className="interactive-cursor"
            data-visible="false"
            aria-hidden="true"
            style={{ x, y }}
        >
            <span className="interactive-cursor-ring" />
        </Motion.div>
    );
}
