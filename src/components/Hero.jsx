import { motion as Motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowUpRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <section className="container hero-container" style={{
            minHeight: 'auto', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '6rem'
        }}>
            <div className="hero-bg">
                <div className="hero-lines"></div>
                <div className="hero-abstract-lines"></div>
            </div>

            <Motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ position: 'relative', zIndex: 1, maxWidth: '800px', }}
                className='home-sc'
            >
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>{currentDate}</p>

                <Motion.div
                    className="profile-stack"
                    whileHover="hover"
                    initial="initial"
                >
                    {/* Card 1 (Left) */}
                    <Motion.div
                        className="profile-img-card"
                        variants={{
                            initial: { rotate: 0, x: 0 },
                            hover: { rotate: -15, x: -60, y: 10 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <img src="/profile-0.png" alt="Meeday" />
                    </Motion.div>

                    {/* Card 2 (Center) */}
                    <Motion.div
                        className="profile-img-card"
                        variants={{
                            initial: { rotate: 0, y: 0, scale: 1 },
                            hover: { rotate: 0, y: -20, scale: 1.05 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ zIndex: 2 }}
                    >
                        <img src="/profile-1.jpg" alt="Meeday" />
                    </Motion.div>

                    {/* Card 3 (Right) */}
                    <Motion.div
                        className="profile-img-card"
                        variants={{
                            initial: { rotate: 0, x: 0 },
                            hover: { rotate: 15, x: 60, y: 10 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ zIndex: 1 }}
                    >
                        <img src="/profile-2.jpg" alt="Meeday" />
                    </Motion.div>
                </Motion.div>

                <h1 style={{ marginBottom: '1rem' }}>
                    <TypeAnimation
                        sequence={[
                            'Product Designer',
                            2000,
                            'AI Native UI/UX Designer',
                            2000,
                            'Design Engineer',
                            2000
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                    />
                </h1>

                <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto 3rem', fontSize: '1.15rem', lineHeight: '1.7' }}>
                    I leverage AI-assisted design tooling (including Figma AI and other generative AI tools) to accelerate end-to-end UI/UX design workflows, from discovery and wireframes through high-fidelity mockups and interactive prototypes.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <a href="mailto:olamidebalogun56@gmail.com" className="pill-btn black" style={{ textDecoration: 'none' }}>Get in touch</a>
                    <a href="https://docs.google.com/document/d/1Gn4Z_rYKmXA2Mfq2sbyPCn6fkT3yTnotnTN2YUDayX4/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="pill-btn gray" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>Read CV <ArrowUpRight size={18} /></a>
                </div>
            </Motion.div>
        </section>
    );
}
