import { motion as Motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import './Hero.css';

const CV_URL = 'https://docs.google.com/document/d/1Gn4Z_rYKmXA2Mfq2sbyPCn6fkT3yTnotnTN2YUDayX4/edit?usp=sharing';

// Small inline pieces that make the prose feel alive
const Mark = ({ children }) => <mark className="hero-mark">{children}</mark>;
const Ext = ({ href, children }) => (
    <a className="hero-link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

export default function Hero() {
    const reduceMotion = useReducedMotionPreference();

    // Paragraphs rise in one after another
    const item = (i) => ({
        initial: reduceMotion ? false : { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.15 + i * 0.12, ease: 'easeOut' },
    });

    return (
        <section id="about" className="container hero-container">
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-lines"></div>
            </div>

            <div className="hero-prose">
                <Motion.h1 className="hero-name" {...item(0)}>Meeday</Motion.h1>

                <Motion.p {...item(2)}>
                    I&apos;m{' '}
                    <span className="hero-avatar" aria-hidden="true"><img src="/profile-1.jpg" alt="" /></span>
                    <strong>Ayanfe Olamide Balogun</strong>, a <span className="hero-tag">Product Designer</span> and
                    Design Engineer. I help teams turn complex workflows into products people can use with confidence.
                    Across healthcare, fintech, and AI, I connect product thinking, interface design,
                    and implementation to make everyday tasks simpler.
                </Motion.p>

                <Motion.p {...item(3)}>
                    My work has helped <Mark>cut hospital billing errors by 60%</Mark>,{' '}
                    <Mark>reduce paper-based processes by 90%</Mark>, and{' '}
                    <Mark>shorten content creation time by 95%</Mark>. I design for outcomes that matter to both users
                    and the business: <Mark>fewer mistakes, faster workflows</Mark>, and less
                    time spent figuring out what to do next.
                </Motion.p>

                <Motion.p {...item(4)}>
                    I currently lead design at{' '}
                    <span className="hero-preview-anchor">
                        <Ext href="https://spidra.io">Spidra.io</Ext>
                        <span className="hero-preview" role="presentation">
                            <img src="/spidra-og.png" alt="" />
                            <span className="hero-preview-meta">
                                <strong>Spidra.io</strong>
                                <span>spidra.io</span>
                            </span>
                        </span>
                    </span>
                    , a web scraping tool, and I&apos;m building <Ext href="http://zofu.quest/">ZOFU</Ext>, an AI
                    platform that helps job seekers tailor their resumes. I&apos;ve also trained <strong>80+ emerging designers</strong> and helped
                    startups tell a clearer story through pitch decks.
                </Motion.p>

                <Motion.p {...item(5)}>
                    If you&apos;re building a new product or improving one that people already rely on, I can help you
                    find the right problems to solve and turn them into thoughtful, usable experiences.{' '}
                    <a className="hero-link" href="mailto:olamidebalogun56@gmail.com">Let&apos;s talk.</a>
                </Motion.p>

                <Motion.div className="hero-actions" {...item(6)}>
                    <a href="mailto:olamidebalogun56@gmail.com" className="pill-btn black">Get in touch</a>
                    <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="pill-btn gray">
                        Read CV <ArrowUpRight size={18} />
                    </a>
                </Motion.div>
            </div>
        </section>
    );
}
