import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import { tools } from '../data/tools';
import './Tools.css';

const formatDate = (ym) =>
    new Date(`${ym}-01T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

function ToolRow({ tool, index }) {
    const isLive = tool.status === 'live';
    const inner = (
        <>
            <span className="tool-row-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="tool-row-main">
                <h3 className="tool-row-name">{tool.name}</h3>
                <p className="tool-row-tagline">{tool.tagline}</p>
            </div>
            <div className="tool-row-meta">
                {tool.tags.map((tag) => (
                    <span key={tag} className="tool-tag">{tag}</span>
                ))}
                {isLive ? (
                    <span className="tool-row-date">{formatDate(tool.date)}</span>
                ) : (
                    <span className="tool-status">In progress</span>
                )}
            </div>
            {isLive && <ArrowUpRight className="tool-row-arrow" size={20} aria-hidden="true" />}
        </>
    );

    return (
        <motion.li
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
        >
            {isLive ? (
                <Link to={`/tools/${tool.slug}`} className="tool-row">{inner}</Link>
            ) : (
                <div className="tool-row is-building">{inner}</div>
            )}
        </motion.li>
    );
}

function Tools() {
    const description =
        'Small, focused tools for designers and engineers, built by Ayanfe Olamide Balogun while working at the line between design and code.';

    return (
        <>
            <Helmet>
                <title>Tools | Ayanfe Olamide Balogun</title>
                <meta name="description" content={description} />
                <link rel="canonical" href="https://www.meedaydesign.xyz/tools" />
                <meta property="og:title" content="Tools | Ayanfe Olamide Balogun" />
                <meta property="og:description" content={description} />
            </Helmet>
            <main className="container section-padding">
                <header className="tools-header">
                    <h1>Tools</h1>
                    <p className="text-muted">
                        Small, focused tools I build to work through problems at the line between
                        design and code. Each one solves something I kept running into.
                    </p>
                </header>

                <ul className="tools-list">
                    {tools.map((tool, i) => (
                        <ToolRow key={tool.slug} tool={tool} index={i} />
                    ))}
                </ul>
            </main>
            <Footer />
        </>
    );
}

export default Tools;
