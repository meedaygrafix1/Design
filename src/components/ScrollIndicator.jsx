import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollIndicator
 * Fixed right-side tab. Hover to expand a panel to the LEFT.
 * Never overlaps main content.
 *
 * Props:
 *  sections – array of { id: string, label: string }
 */
function ScrollIndicator({ sections }) {
    const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
    const [expanded, setExpanded] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        if (!sections.length) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observerRef.current.observe(el);
        });

        return () => { if (observerRef.current) observerRef.current.disconnect(); };
    }, [sections]);

    const handleClick = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (!sections.length) return null;

    return (
        <div
            className={`si-wrapper${expanded ? ' si-wrapper--open' : ''}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {/* Panel slides out to the LEFT of the tab */}
            <nav className="si-panel" aria-label="Page sections">
                <ul className="si-list">
                    {sections.map(({ id, label }) => {
                        const isActive = activeId === id;
                        return (
                            <li key={id} className={`si-item${isActive ? ' si-item--active' : ''}`}>
                                <button
                                    className="si-btn"
                                    onClick={() => handleClick(id)}
                                    aria-current={isActive ? 'true' : undefined}
                                >
                                    <span className="si-dot" aria-hidden="true" />
                                    <span className="si-label">{label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Tab handle — always visible on the right edge */}
            <div className="si-tab" aria-hidden="true">
                <span className="si-tab__line" />
                <span className="si-tab__line" />
                <span className="si-tab__line" />
            </div>
        </div>
    );
}

export default ScrollIndicator;
