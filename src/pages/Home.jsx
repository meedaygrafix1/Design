import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Quote } from 'lucide-react';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { getPosts } from '../lib/hygraph';
import { projects, testimonials, experiences, illustrations, designExplorations } from '../data/projects';

function Home() {
    const [projectFilter, setProjectFilter] = useState('app');
    const [recentPosts, setRecentPosts] = useState([]);
    const [activeExpIndex, setActiveExpIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveExpIndex((prev) => (prev + 1) % designExplorations.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const data = await getPosts();
                setRecentPosts(data.slice(0, 3));
            } catch (err) {
                console.error("Failed to fetch recent posts:", err);
            }
        };
        fetchRecentPosts();
    }, []);

    // Get current date formatted
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <>
            <Helmet>
                <title>Ayanfe Olamide Balogun | AI Native UI/UX & Product Designer</title>
                <meta name="description" content="I am Ayanfe Olamide Balogun, an AI Native Product Designer and Educator dedicated to crafting functional and intuitive digital solutions. Founder at Spidra.io and builder of ZOFU." />
                <link rel="canonical" href="https://www.meedaydesign.xyz/" />
                <meta property="og:title" content="Ayanfe Olamide Balogun | AI Native UI/UX & Product Designer" />
                <meta property="og:description" content="Portfolio of Ayanfe Olamide Balogun (Meeday). Creating user-centered generative AI interfaces, efficient design systems, and high-impact digital products." />
                <meta property="og:url" content="https://www.meedaydesign.xyz/" />
            </Helmet>
            <main>
                {/* Hero / Entry Point */}
                <section className="container hero-container" style={{
                    minHeight: 'auto', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '6rem'
                }}>
                    <div className="hero-bg">
                        <div className="hero-lines"></div>
                        <div className="hero-abstract-lines"></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ position: 'relative', zIndex: 1, maxWidth: '800px', }}
                        className='home-sc'
                    >
                        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>{currentDate}</p>

                        <motion.div
                            className="profile-stack"
                            whileHover="hover"
                            initial="initial"
                        >
                            {/* Card 1 (Left) */}
                            <motion.div
                                className="profile-img-card"
                                variants={{
                                    initial: { rotate: 0, x: 0 },
                                    hover: { rotate: -15, x: -60, y: 10 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <img src="/profile-0.png" alt="Meeday" />
                            </motion.div>

                            {/* Card 2 (Center) */}
                            <motion.div
                                className="profile-img-card"
                                variants={{
                                    initial: { rotate: 0, y: 0, scale: 1 },
                                    hover: { rotate: 0, y: -20, scale: 1.05 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                style={{ zIndex: 2 }}
                            >
                                <img src="/profile-1.jpg" alt="Meeday" />
                            </motion.div>

                            {/* Card 3 (Right) */}
                            <motion.div
                                className="profile-img-card"
                                variants={{
                                    initial: { rotate: 0, x: 0 },
                                    hover: { rotate: 15, x: 60, y: 10 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                style={{ zIndex: 1 }}
                            >
                                <img src="/profile-2.jpg" alt="Meeday" />
                            </motion.div>
                        </motion.div>

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
                    </motion.div>
                </section>

                {/* Operational Logs (Projects) */}
                <section id="work" className="container section-padding">
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <p className="text-muted" style={{ marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Case Studies</p>
                        <h2 style={{ marginBottom: '1.5rem' }}>Selected Projects</h2>

                        <div className="tab-switcher">
                            <div
                                className="tab-slider"
                                style={{
                                    width: projectFilter === 'app' ? '165px' : '120px',
                                    transform: projectFilter === 'app' ? 'translateX(0)' : 'translateX(165px)'
                                }}
                            />
                            <button
                                className={`tab-btn ${projectFilter === 'app' ? 'active' : ''}`}
                                onClick={() => setProjectFilter('app')}
                                style={{ width: '165px' }}
                            >
                                Web/Mobile App
                            </button>
                            <button
                                className={`tab-btn ${projectFilter === 'website' ? 'active' : ''}`}
                                onClick={() => setProjectFilter('website')}
                                style={{ width: '120px' }}
                            >
                                Websites
                            </button>
                        </div>
                    </div>

                    <div className="projects-grid" style={{ position: 'relative' }}>
                        <AnimatePresence mode="popLayout">
                            {projects.filter(p => p.type === projectFilter).map((project, idx) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    className="project-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Link
                                        to={project.link ? project.link : `/project/${project.slug}`}
                                        target={project.link ? '_blank' : undefined}
                                        rel={project.link ? 'noopener noreferrer' : undefined}
                                        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                                        onClick={(e) => {
                                            if (project.link) {
                                                e.preventDefault();
                                                window.open(project.link, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                    >
                                        <div className="card-visual">
                                            <div className="visual-inner">
                                                {project.coverVideo ? (
                                                    <video
                                                        src={project.coverVideo}
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        poster={project.image}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                                    />
                                                ) : (
                                                    <img src={project.image} alt={project.title} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="card-details" style={{
                                            '--card-accent-bg': project.theme.bg,
                                            '--card-accent-text': project.theme.text
                                        }}>
                                            <div className="details-bg"></div>
                                            <div className="details-content">
                                                <h3>{project.title}</h3>
                                                <p>{project.desc}</p>
                                                <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', color: project.theme.text }}>
                                                        {project.link ? 'View Live Site' : 'Explore Project'} <ArrowUpRight size={16} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="section-padding" style={{ background: 'var(--card-bg)' }}>
                    <div className="container">
                        <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Professional Journey</h2>
                        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }} className="experience-table">
                            {experiences.map((exp, idx) => (
                                <div key={idx} style={{
                                    padding: '2rem',
                                    borderBottom: idx !== experiences.length - 1 ? '1px solid var(--border-color)' : 'none',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                                    gap: '2rem'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company}</h4>
                                        <div className="text-muted" style={{ fontSize: '0.95rem' }}>{exp.role} {exp.location && `• ${exp.location}`}</div>
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{exp.period}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recent Writings Section */}
                {recentPosts.length > 0 && (
                    <section className="container section-padding" style={{ textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '3rem' }}>Recent Writings</h2>

                        <div className="articles-grid" style={{ marginBottom: '3rem', textAlign: 'left' }}>
                            {recentPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>

                        <Link to="/articles" className="pill-btn gray" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            Read all <ArrowUpRight size={18} />
                        </Link>
                    </section>
                )}

                {/* Illustrations Section */}
                <section className="container section-padding" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '3rem' }}>Some of my illustrations</h2>

                    <div className="illustrations-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {illustrations.slice(0, 4).map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="clean-card"
                                style={{
                                    aspectRatio: '1/1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1rem'
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt="Illustration"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <Link to="/illustrations" className="pill-btn gray" style={{ textDecoration: 'none' }}>
                        View all <ArrowUpRight size={18} />
                    </Link>
                </section>

                {/* About Me Section */}
                <section id="about" className="container section-padding" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '2.5rem' }}>About Me</h2>

                    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(0, 255, 65, 0.02)', padding: '3rem', border: '1px solid var(--border-color)' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 500 }}>
                            I'm <strong>Ayanfe Olamide Balogun</strong>, an AI Native Product Designer who turns operational chaos into systems people trust. I've cut billing errors by 60% and paper-based processes by 90% redesigning hospital workflows, and reduced content creation time by 95% designing an AI-powered productivity tool. My background spans HealthTech and fintech, with a growing focus on generative AI interfaces.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 500, marginTop: '1.25rem' }}>
                            I also mentor emerging designers (80+ trained) and partner with startups to build pitch decks that help them raise and sell.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 500, marginTop: '1.25rem' }}>
                            Currently I'm shaping design direction at{' '}
                            <span style={{ position: 'relative', display: 'inline-block' }}
                                onMouseEnter={(e) => {
                                    const tooltip = e.currentTarget.querySelector('.spidra-preview');
                                    if (tooltip) tooltip.style.opacity = '1';
                                    if (tooltip) tooltip.style.pointerEvents = 'auto';
                                    if (tooltip) tooltip.style.transform = 'translateX(-50%) translateY(0)';
                                }}
                                onMouseLeave={(e) => {
                                    const tooltip = e.currentTarget.querySelector('.spidra-preview');
                                    if (tooltip) tooltip.style.opacity = '0';
                                    if (tooltip) tooltip.style.pointerEvents = 'none';
                                    if (tooltip) tooltip.style.transform = 'translateX(-50%) translateY(8px)';
                                }}
                            >
                                <a href="https://spidra.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 700 }}>Spidra.io</a>
                                <div className="spidra-preview" style={{
                                    position: 'absolute',
                                    bottom: 'calc(100% + 12px)',
                                    left: '50%',
                                    transform: 'translateX(-50%) translateY(8px)',
                                    width: '320px',
                                    background: '#fff',
                                    borderRadius: '12px',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                                    overflow: 'hidden',
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                                    zIndex: 100
                                }}>
                                    <img src="/spidra-og.png" alt="Spidra.io Preview"
                                        style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                                    />
                                    <div style={{ padding: '12px 16px' }}>
                                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>Spidra.io</p>
                                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#666', fontWeight: 400 }}>spidra.io</p>
                                    </div>
                                </div>
                            </span>, a web scraping tool, and building <a href="http://zofu.quest/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 700 }}>ZOFU</a>, an AI resume optimization platform.
                        </p>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="container section-padding">
                    <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Kind Words from Collaborators</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                        {testimonials.map((t) => (
                            <div key={t.id} className="clean-card" style={{ padding: '2.5rem' }}>
                                <Quote size={28} style={{ opacity: 0.2, marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
                                <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem', color: 'var(--text-secondary)' }}>"{t.text}"</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.name}</div>
                                        <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{t.role}</div>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 600 }}>{t.rating}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Design Explorations Section (Slideshow) */}
            <section className="section-padding">
                <div className="container">
                    <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Design Explorations</h2>
                    
                    <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', background: '#ffffff' }}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeExpIndex}
                                    src={designExplorations[activeExpIndex].image}
                                    alt={designExplorations[activeExpIndex].title}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        background: '#ffffff',
                                        padding: '1.5rem',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </AnimatePresence>
                        </div>
                        
                        {/* Progress Indicators */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                            {designExplorations.map((_, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        width: idx === activeExpIndex ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: idx === activeExpIndex ? 'var(--text-primary)' : 'var(--border-color)',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container section-padding" style={{ marginBottom: '4rem' }}>
                <div className="cta-modern">
                    <div className="cta-ring-left"></div>
                    <div className="cta-ring-right"></div>

                    <div className="cta-content">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Let's Build Something Meaningful
                        </h2>
                        <p className="text-muted" style={{
                            fontSize: '1.1rem',
                            marginBottom: '3rem',
                            maxWidth: '600px',
                            margin: '0 auto 3rem',
                            lineHeight: '1.6'
                        }}>
                            I'm open to freelance design work, product collaborations, and long-term partnerships.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="mailto:olamidebalogun56@gmail.com" className="pill-btn black" style={{ textDecoration: 'none' }}>
                                Work With Me
                            </a>
                            <a
                                href="https://docs.google.com/document/d/1TpgW7XRnzpsyhmV208HeQzAr_bsdMeOBw04U9plIlJs/edit?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pill-btn gray"
                                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                Read CV <ArrowUpRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;
