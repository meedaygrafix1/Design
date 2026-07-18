import React, { useEffect, useRef, useState } from 'react';

/**
 * LazyVideo
 * Only sets the `src` (and starts loading) once the element
 * enters the viewport. Until then the video is invisible and
 * costs zero bandwidth.
 *
 * Props mirror a normal <video> element.
 */
function LazyVideo({ src, style, className, ...rest }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // start loading 200px before it enters view
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={ref}
            src={visible ? src : undefined}
            preload={visible ? 'auto' : 'none'}
            style={style}
            className={className}
            {...rest}
        />
    );
}

export default LazyVideo;
