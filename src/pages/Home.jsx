import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import Hero from '../components/Hero';
import ProjectFolder from '../components/ProjectFolder';
import DesignCarousel from '../components/DesignCarousel';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Quote } from 'lucide-react';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { getPosts } from '../lib/hygraph';
import { projects, testimonials, experiences, illustrations } from '../data/projects';

function Home() {
    const reduceMotion = useReducedMotionPreference();
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
                <Hero />

                {/* Operational Logs (Projects) */}
                <section id="work" className="container section-padding" tabIndex={-1} aria-label="Selected projects">
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
                                <Motion.div
                                    key={project.title}
                                    layout={!reduceMotion}
                                    className="project-folder-shell"
                                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ duration: reduceMotion ? 0 : 0.4 }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <ProjectFolder project={project} index={idx} />
                                </Motion.div>
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
                            <Motion.div
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
                            </Motion.div>
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
                            I'm <strong>Ayanfe Olamide Balogun</strong>, a Product Designer and Design Engineer. I help teams turn complex workflows into products people can use with confidence. Across healthcare, fintech, and AI, I connect product thinking, interface design, and implementation to make everyday tasks simpler.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 500, marginTop: '1.25rem' }}>
                            My work has helped <strong>cut hospital billing errors by 60%</strong>, <strong>reduce paper-based processes by 90%</strong>, and <strong>shorten content creation time by 95%</strong>. I design for outcomes that matter to both users and the business: fewer mistakes, faster workflows, and less time spent figuring out what to do next.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 500, marginTop: '1.25rem' }}>
                            I currently lead design at{' '}
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
                            </span>, a web scraping tool, and I'm building <a href="http://zofu.quest/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 700 }}>ZOFU</a>, an AI platform that helps job seekers tailor their resumes. I've also trained 80+ emerging designers and helped startups tell a clearer story through pitch decks.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 500, marginTop: '1.25rem' }}>
                            If you're building a new product or improving one that people already rely on, I can help you find the right problems to solve and turn them into thoughtful, usable experiences.{' '}
                            <a href="mailto:olamidebalogun56@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 700 }}>Let's talk.</a>
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
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <DesignCarousel />

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
