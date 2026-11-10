import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { NewTwitterIcon, Linkedin01Icon, Mail01Icon, NewsIcon, MediumIcon, InstagramIcon, TiktokIcon } from 'hugeicons-react';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import './Footer.css';

const SOCIALS = [
    { href: 'https://twitter.com/Meedayyy', label: 'Twitter', icon: <NewTwitterIcon size={19} /> },
    { href: 'https://www.linkedin.com/in/meeday/', label: 'LinkedIn', icon: <Linkedin01Icon size={19} /> },
    { href: 'https://www.instagram.com/designwithmeeday/', label: 'Instagram', icon: <InstagramIcon size={19} /> },
    { href: 'https://www.tiktok.com/@meedaydesign', label: 'TikTok', icon: <TiktokIcon size={19} /> },
    { href: 'mailto:olamidebalogun56@gmail.com', label: 'Email', icon: <Mail01Icon size={19} /> },
    { href: 'https://meeday.substack.com/', label: 'Substack', icon: <NewsIcon size={19} /> },
    { href: 'https://medium.com/@olamidebalogun56', label: 'Medium', icon: <MediumIcon size={19} /> },
];

// The site ends in a meadow: the page fades into a living field,
// with the footer content resting on top of it.
function Footer() {
    const reduceMotion = useReducedMotionPreference();
    const footerRef = useRef(null);
    const videoRef = useRef(null);
    const noObserver = typeof IntersectionObserver === 'undefined';
    const [inView, setInView] = useState(noObserver);
    const [loaded, setLoaded] = useState(noObserver);

    // Load the meadow only when the footer is near, and pause it when off-screen
    useEffect(() => {
        const node = footerRef.current;
        if (!node || noObserver) return undefined;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setLoaded(true);
            setInView(entry.isIntersecting);
        }, { rootMargin: '200px 0px', threshold: 0.1 });
        observer.observe(node);
        return () => observer.disconnect();
    }, [noObserver]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !loaded) return;
        if (inView && !reduceMotion) video.play().catch(() => {});
        else video.pause();
    }, [inView, loaded, reduceMotion]);

    // The field drifts gently with the pointer
    useEffect(() => {
        const node = footerRef.current;
        if (!node || reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
        const move = (e) => {
            const r = node.getBoundingClientRect();
            node.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
            node.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        };
        const leave = () => {
            node.style.setProperty('--mx', 0);
            node.style.setProperty('--my', 0);
        };
        node.addEventListener('mousemove', move);
        node.addEventListener('mouseleave', leave);
        return () => {
            node.removeEventListener('mousemove', move);
            node.removeEventListener('mouseleave', leave);
        };
    }, [reduceMotion]);

    const backToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

    return (
        <footer ref={footerRef} className={`site-footer${inView || reduceMotion ? ' is-in' : ''}`}>
            <div className="site-footer-scene" aria-hidden="true">
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/footer/meadow-poster.webp"
                >
                    {loaded && <source src="/footer/meadow.webm" type="video/webm" />}
                    {loaded && <source src="/footer/meadow.mp4" type="video/mp4" />}
                </video>
            </div>

            <div className="container site-footer-content">
                <div className="site-footer-row">
                    <div className="site-footer-brand">
                        <span className="site-footer-logo">Meeday</span>
                        <p>Designed with precision &amp; care.</p>
                    </div>
                    <nav className="site-footer-links" aria-label="Social links">
                        {SOCIALS.map(({ href, label, icon }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                {icon}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="site-footer-row site-footer-bottom">
                    <span>© {new Date().getFullYear()} Balogun Ayanfe Olamide</span>
                    <button type="button" onClick={backToTop} className="site-footer-top-btn">
                        Back to top <ArrowUp size={15} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
