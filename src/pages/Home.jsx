import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { getPosts } from '../lib/hygraph';
import { projects, testimonials, experiences, illustrations, designExplorations } from '../data/projects';

function Home() {
    const [projectFilter, setProjectFilter] = useState('app');
    const [recentPosts, setRecentPosts] = useState([]);

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
                        style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}
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
                            UI/UX Designer & Product Designer
                        </h1>

                        <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto 3rem', fontSize: '1.15rem', lineHeight: '1.7' }}>
                            Creating user-centered interfaces, efficient design systems, and high-impact product experiences for startups and enterprise teams worldwide.
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                            <a href="mailto:olamidebalogun56@gmail.com" className="pill-btn black" style={{ textDecoration: 'none' }}>Get in touch</a>
                            <a href="https://docs.google.com/document/d/1TpgW7XRnzpsyhmV208HeQzAr_bsdMeOBw04U9plIlJs/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="pill-btn gray" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>Read CV <ArrowUpRight size={18} /></a>
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
                                                <img src={project.image} alt={project.title} />
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
                        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
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
                        <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
                            I'm <strong>Ayanfe Olamide Balogun</strong>, a Product Designer and Educator passionate about building digital solutions that balance functionality with human-centered design. I've worked on projects across HealthTech, InsurTech, cybersecurity, and fintech, while also mentoring aspiring designers. Beyond product design, I create impactful pitch decks and presentations that help startups and businesses tell their stories with clarity. Currently, I'm the founding designer at <a href="https://spidra.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: 600 }}>Spidra.io</a>, a web scraping tool I'm building with friends.
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


            {/* Design Explorations Section */}
            <section className="section-padding" style={{ overflow: 'hidden' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Design Explorations</h2>
                </div>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                }}>
                    {/* Fade Gradient Left */}
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '80px',
                        background: 'linear-gradient(to right, #ffffff, transparent)',
                        zIndex: 10,
                        pointerEvents: 'none',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        maskImage: 'linear-gradient(to right, black, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, black, transparent)'
                    }}></div>

                    {/* Fade Gradient Right */}
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '80px',
                        background: 'linear-gradient(to left, #ffffff, transparent)',
                        zIndex: 10,
                        pointerEvents: 'none',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        maskImage: 'linear-gradient(to left, black, transparent)',
                        WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
                    }}></div>

                    {/* Infinite Scrolling Track */}
                    <div
                        className="marquee-track"
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            width: 'max-content'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.animationPlayState = 'paused';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.animationPlayState = 'running';
                        }}
                    >
                        {/* Duplicate the array to create seamless loop */}
                        {[...designExplorations, ...designExplorations].map((item, index) => (
                            <motion.div
                                key={`${item.id}-${index}`}
                                whileHover={{ y: -10 }}
                                className="clean-card"
                                style={{
                                    minWidth: '350px',
                                    height: '240px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    flexShrink: 0
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '1rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                    color: 'white',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                                    className="hover-reveal"
                                >
                                    <p style={{ margin: 0, fontWeight: 500 }}>{item.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .clean-card:hover .hover-reveal {
                        opacity: 1 !important;
                    }
                    .marquee-track {
                        animation: marquee 40s linear infinite;
                    }
                    @media (max-width: 768px) {
                        .marquee-track {
                            animation-duration: 60s;
                        }
                    }
                `}</style>

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
