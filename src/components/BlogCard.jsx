import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BlogCard = ({ post }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -8 }}
            className="article-card"
        >
            <Link to={`/articles/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-image-wrapper">
                    {post.coverImage && (
                        <img
                            src={post.coverImage.url}
                            alt={post.title}
                            className="card-image"
                        />
                    )}
                    <div className="card-overlay">
                        <span className="read-more-btn">Read Article <ArrowUpRight size={16} /></span>
                    </div>
                </div>

                <div className="card-content">
                    <div className="card-meta">
                        <span className="date">
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h3 className="card-title">{post.title}</h3>

                    <p className="card-excerpt">
                        {post.excerpt}
                    </p>

                    <div className="card-footer">
                        {post.author && (
                            <div className="author-info">
                                {post.author.picture && (
                                    <img src={post.author.picture.url} alt={post.author.name} className="author-avatar" />
                                )}
                                <span className="author-name">{post.author.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
            <style>{`
                .article-card {
                    background: #ffffff;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.04);
                    transition: box-shadow 0.3s ease;
                    border: 1px solid rgba(0,0,0,0.03);
                    display: flex;
                    flex-direction: column;
                }
                
                .article-card:hover {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                }

                .card-image-wrapper {
                    height: 240px;
                    overflow: hidden;
                    position: relative;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .article-card:hover .card-image {
                    transform: scale(1.05);
                }

                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .article-card:hover .card-overlay {
                    opacity: 1;
                }

                .read-more-btn {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(4px);
                    color: #1a1a1a;
                    padding: 0.75rem 1.25rem;
                    border-radius: 50px;
                    font-weight: 500;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transform: translateY(10px);
                    transition: transform 0.3s ease;
                }

                .article-card:hover .read-more-btn {
                    transform: translateY(0);
                }

                .card-content {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .card-meta {
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .date {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .card-title {
                    font-size: 1.5rem;
                    line-height: 1.3;
                    margin-bottom: 1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .card-excerpt {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    flex: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-footer {
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .author-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .author-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .author-name {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--text-primary);
                }

                @media (max-width: 768px) {
                    .card-image-wrapper {
                        height: 200px;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default BlogCard;
