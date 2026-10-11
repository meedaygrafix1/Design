import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { designExplorations } from '../data/projects';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import './DesignCarousel.css';

export default function DesignCarousel() {
    const viewport = useRef(null);
    const group = useRef(null);
    const reduceMotion = useReducedMotionPreference();
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
        observer.observe(viewport.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (paused || hovered || focused || reduceMotion || !inView) return;
        const element = viewport.current;
        let frame;
        let previousTime;
        let position = element.scrollLeft;

        const advance = (time) => {
            const elapsed = previousTime === undefined ? 0 : Math.min(time - previousTime, 64);
            previousTime = time;
            const width = group.current.offsetWidth;
            if (width) {
                position = (position + elapsed * 0.035) % width;
                element.scrollLeft = position;
            }
            frame = requestAnimationFrame(advance);
        };
        frame = requestAnimationFrame(advance);
        return () => cancelAnimationFrame(frame);
    }, [paused, hovered, focused, reduceMotion, inView]);

    const step = (direction) => {
        setPaused(true);
        const element = viewport.current;
        const width = group.current.offsetWidth;
        const distance = width / designExplorations.length;
        if (direction < 0 && element.scrollLeft < distance) element.scrollLeft += width;
        if (direction > 0 && element.scrollLeft >= width) element.scrollLeft -= width;
        element.scrollBy({ left: direction * distance, behavior: reduceMotion ? 'instant' : 'smooth' });
    };

    return (
        <section className="design-explorations section-padding" aria-labelledby="explorations-heading" aria-roledescription="carousel">
            <div className="container explorations-header">
                <div>
                    <h2 id="explorations-heading">Design Explorations</h2>
                    <p>Interface ideas and visual experiments.</p>
                </div>
                <div className="explorations-controls">
                    <button type="button" onClick={() => step(-1)} aria-label="Previous design" aria-controls="explorations-viewport">
                        <ArrowLeft size={18} aria-hidden="true" />
                    </button>
                    {!reduceMotion && (
                        <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play carousel' : 'Pause carousel'} aria-controls="explorations-viewport">
                            {paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
                        </button>
                    )}
                    <button type="button" onClick={() => step(1)} aria-label="Next design" aria-controls="explorations-viewport">
                        <ArrowRight size={18} aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div
                ref={viewport}
                id="explorations-viewport"
                className="explorations-viewport"
                tabIndex={0}
                role="group"
                aria-label="Design gallery. Use arrow keys or swipe to browse."
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onPointerDown={() => setPaused(true)}
                onWheel={() => setPaused(true)}
                onKeyDown={() => setPaused(true)}
            >
                <div className="explorations-track">
                    {[false, true].map(duplicate => (
                        <ul key={String(duplicate)} ref={duplicate ? undefined : group} className="explorations-group" aria-hidden={duplicate ? true : undefined}>
                            {designExplorations.map((design, index) => (
                                <li key={design.id} className="exploration-card">
                                    <figure>
                                        <div className="exploration-image">
                                            <img src={design.image} alt={duplicate ? '' : design.title} loading="lazy" draggable="false" />
                                        </div>
                                        <figcaption>
                                            <span>{design.title}</span>
                                            <span className="exploration-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                                        </figcaption>
                                    </figure>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
