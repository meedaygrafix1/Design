import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, List } from 'lucide-react';
import parse, { domToReact } from 'html-react-parser';
import Footer from '../components/Footer';
import { getPostBySlug } from '../lib/hygraph';

function ArticleDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostBySlug(slug);
                if (!data) {
                    setError("Article not found.");
                } else {
                    setPost(data);
                }
            } catch (err) {
                console.error("Failed to fetch post:", err);
                setError("Failed to load article.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    // Handle TOC intersection observer
    useEffect(() => {
        if (loading || !post) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0px -80% 0px' }
        );

        const headings = document.querySelectorAll('h2, h3');
        headings.forEach((heading) => observer.observe(heading));

        return () => {
            headings.forEach((heading) => observer.unobserve(heading));
        };
    }, [loading, post]);

    const { content, toc } = useMemo(() => {
        if (!post?.content?.html) return { content: null, toc: [] };

        const headings = [];
        const options = {
            replace: (domNode) => {
                if (domNode.name === 'h2' || domNode.name === 'h3') {
                    // Extract text content carefully
                    const getText = (node) => {
                        if (node.type === 'text') return node.data;
                        if (node.children) return node.children.map(getText).join('');
                        return '';
                    };

                    const text = getText(domNode);
                    const id = text
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');

                    headings.push({ id, text, level: domNode.name === 'h2' ? 2 : 3 });

                    return React.createElement(
                        domNode.name,
                        { id, className: 'article-heading' },
                        domToReact(domNode.children, options)
                    );
                }
            }
        };

        return {
            content: parse(post.content.html, options),
            toc: headings
        };
    }, [post?.content?.html]);

    if (loading) {
        return (
            <div className="container section-padding" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="container section-padding" style={{ textAlign: 'center', minHeight: '50vh' }}>
                <h2 style={{ marginBottom: '1rem' }}>Oops!</h2>
                <p className="text-muted">{error || "Article not found"}</p>
                <Link to="/articles" className="pill-btn gray" style={{ marginTop: '2rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={16} /> Back to Articles
                </Link>
            </div>
        );
    }

    return (
        <>
            <article className="container section-padding article-content">
                <div className="back-link-wrapper" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link to="/articles" className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Back to Articles
                    </Link>
                </div>

                <header style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{post.title}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }} className="text-muted">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={16} />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        {post.author && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={16} />
                                {post.author.name}
                            </div>
                        )}
                    </div>
                </header>

                {post.coverImage && (
                    <div style={{ maxWidth: '1000px', margin: '0 auto 4rem', borderRadius: '16px', overflow: 'hidden' }}>
                        <img src={post.coverImage.url} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                )}

                <div className="article-layout">
                    {/* Main Content */}
                    <div className="article-main">
                        <div className="article-body">
                            {content}
                        </div>
                    </div>

                    {/* Sidebar / TOC */}
                    {toc.length > 0 && (
                        <aside className="article-sidebar">
                            <div className="toc-sticky">
                                <div className="toc-header">
                                    <List size={18} />
                                    <span>Table of Contents</span>
                                </div>
                                <nav className="toc-nav">
                                    <ul>
                                        {toc.map((heading, index) => (
                                            <li key={`${heading.id}-${index}`} className={`toc-item level-${heading.level}`}>
                                                <a
                                                    href={`#${heading.id}`}
                                                    className={activeId === heading.id ? 'active' : ''}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                                        setActiveId(heading.id);
                                                    }}
                                                >
                                                    {heading.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    )}
                </div>

                <style>{`
                    .article-layout {
                        display: grid;
                        grid-template-columns: 1fr 280px;
                        gap: 4rem;
                        max-width: 1100px;
                        margin: 0 auto;
                        position: relative;
                    }

                    .article-heading {
                        scroll-margin-top: 100px;
                    }

                    .toc-sticky {
                        position: sticky;
                        top: 100px;
                        background: rgba(255, 255, 255, 0.5);
                        backdrop-filter: blur(10px);
                        border: 1px solid var(--border-color);
                        border-radius: 16px;
                        padding: 1.5rem;
                    }

                    .toc-header {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                        font-size: 0.95rem;
                        color: var(--text-primary);
                    }

                    .toc-nav ul {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }

                    .toc-item {
                        margin-bottom: 0.5rem;
                    }

                    .toc-item.level-3 {
                        padding-left: 1rem;
                    }

                    .toc-item a {
                        color: var(--text-secondary);
                        text-decoration: none;
                        font-size: 0.9rem;
                        display: block;
                        padding: 0.25rem 0;
                        transition: all 0.2s ease;
                        border-left: 2px solid transparent;
                        padding-left: 0.75rem;
                        line-height: 1.4;
                    }

                    .toc-item a:hover {
                        color: var(--text-primary);
                    }

                    .toc-item a.active {
                        color: var(--accent-color);
                        border-left-color: var(--accent-color);
                        font-weight: 500;
                    }

                    /* Article Body Updates */
                    .article-body h2 { font-size: 1.8rem; margin-top: 3rem; margin-bottom: 1rem; color: var(--text-primary); line-height: 1.3; }
                    .article-body h3 { font-size: 1.4rem; margin-top: 2rem; margin-bottom: 0.75rem; color: var(--text-primary); line-height: 1.3; }
                    .article-body p { margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; word-break: break-word; }
                    .article-body ul, .article-body ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                    .article-body li { margin-bottom: 0.5rem; color: var(--text-secondary); word-break: break-word; }
                    .article-body blockquote { 
                        border-left: 4px solid var(--accent-color); 
                        padding-left: 1.5rem; 
                        margin: 2rem 0; 
                        font-style: italic; 
                        color: var(--text-primary);
                        background: rgba(0,0,0,0.02);
                        padding: 1.5rem;
                        border-radius: 0 8px 8px 0;
                    }
                    .article-body img { max-width: 100%; height: auto; border-radius: 8px; margin: 2rem 0; }
                    .article-body iframe { max-width: 100%; }
                    .article-body pre { max-width: 100%; overflow-x: auto; background: #f4f4f4; padding: 1rem; border-radius: 8px; white-space: pre-wrap; word-wrap: break-word; }
                    .article-body a { color: var(--accent-color); text-decoration: underline; word-break: break-word; }
                    
                    /* Table responsiveness */
                    .article-body table { width: 100%; display: block; overflow-x: auto; margin-bottom: 1.5rem; border-collapse: collapse; }
                    .article-body th, .article-body td { padding: 0.75rem; border: 1px solid var(--border-color); min-width: 120px; }

                    /* Responsive */
                    @media (max-width: 1024px) {
                        .article-layout {
                            grid-template-columns: 1fr;
                            gap: 3rem;
                        }

                        .article-sidebar {
                            display: none; /* Hide TOC on mobile/tablet or move to top */
                        }
                    }

                    @media (max-width: 768px) {
                        .article-content.container {
                            padding-left: 1.5rem !important;
                            padding-right: 1.5rem !important;
                            overflow-x: hidden; /* Prevent horizontal scroll */
                        }
                        
                        .back-link-wrapper {
                            margin-top: 2rem;
                        }

                        h1 {
                            font-size: 1.8rem !important; /* Reduce title size on mobile to prevent overflow */
                            word-wrap: break-word;
                        }
                    }
                `}</style>
            </article>
            <Footer />
        </>
    );
}

export default ArticleDetail;
