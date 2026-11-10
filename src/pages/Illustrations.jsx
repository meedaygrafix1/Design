import React, { useEffect } from 'react';
import ContactCTA from '../components/ContactCTA';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { illustrations } from '../data/projects';
import { Helmet } from 'react-helmet-async';

function Illustrations() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <Helmet>
                <title>Illustrations | Ayanfe Olamide Balogun</title>
                <meta name="description" content="A collection of illustration work created in Figma by Ayanfe Olamide Balogun." />
                <link rel="canonical" href="https://www.meedaydesign.xyz/illustrations" />
                <meta property="og:title" content="Illustrations | Ayanfe Olamide Balogun" />
                <meta property="og:description" content="A collection of illustration work created in Figma by Ayanfe Olamide Balogun." />
            </Helmet>
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
                        <ContactCTA />
                    </section>
                </div>
            </div>
        </div>
        </>
    );
}

export default Illustrations;
