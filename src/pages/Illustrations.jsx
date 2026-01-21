import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { illustrations } from '../data/projects';

function Illustrations() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="illustrations-page">
            <div className="detail-container">
                <header className="detail-hero" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <Link
                        to="/"
                        className="back-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '2rem', display: 'inline-flex', textDecoration: 'none' }}
                    >
                        ← Back to Home
                    </Link>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Illustrations</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        A collection of my illustration work created in Figma
                    </p>
                    <div style={{ marginTop: '2rem', display: 'inline-block', padding: '0.5rem 1.5rem', background: 'var(--card-bg)', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                        TOOL: FIGMA
                    </div>
                </header>

                <div className="detail-content">
                    <div className="illustrations-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {illustrations.map((ill) => (
                            <motion.div
                                key={ill.id}
                                whileHover={{ y: -8 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img
                                    src={ill.image}
                                    alt={`Illustration ${ill.id}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <section className="detail-content-section" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
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
                </div>
            </div>
        </div>
    );
}

export default Illustrations;
