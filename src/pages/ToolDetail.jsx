import React, { Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import { getTool } from '../data/tools';
import './Tools.css';

function ToolDetail() {
    const { slug } = useParams();
    const tool = getTool(slug);

    if (!tool || tool.status !== 'live') {
        return (
            <main className="container section-padding" style={{ textAlign: 'center', minHeight: '50vh' }}>
                <h2 style={{ marginBottom: '1rem' }}>Tool not found</h2>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    This one doesn't exist yet, or it's still being built.
                </p>
                <Link to="/tools" className="pill-btn gray">
                    <ArrowLeft size={16} /> All tools
                </Link>
            </main>
        );
    }

    // Case-study tools own their whole page layout
    if (tool.page) {
        const Page = tool.page;
        return (
            <Suspense fallback={<main className="container section-padding" style={{ minHeight: '100vh' }} />}>
                <Page tool={tool} />
            </Suspense>
        );
    }

    const ToolComponent = tool.component;
    const title = `${tool.name} | Tools | Ayanfe Olamide Balogun`;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={tool.description} />
                <link rel="canonical" href={`https://www.meedaydesign.xyz/tools/${tool.slug}`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={tool.description} />
            </Helmet>
            <main className="container section-padding">
                <Link to="/tools" className="tool-back">
                    <ArrowLeft size={16} /> All tools
                </Link>

                <header className="tool-detail-header">
                    <div className="tool-detail-tags">
                        {tool.tags.map((tag) => (
                            <span key={tag} className="tool-tag">{tag}</span>
                        ))}
                    </div>
                    <h1>{tool.name}</h1>
                    <p className="text-muted">{tool.description}</p>
                </header>

                <Suspense fallback={<div className="tool-loading" aria-label="Loading tool" />}>
                    <ToolComponent />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}

export default ToolDetail;
