import React from 'react';

const BlogCardSkeleton = () => {
    return (
        <div className="article-card skeleton-card">
            <div className="skeleton-image"></div>
            <div className="card-content">
                <div className="skeleton-meta"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-title short"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-footer"></div>
            </div>
            <style>{`
                .skeleton-card {
                    background: #ffffff;
                    border: 1px solid var(--border-color);
                    pointer-events: none;
                }

                .skeleton-image {
                    height: 240px;
                    background: #f0f0f0;
                    width: 100%;
                    animation: pulse 1.5s infinite ease-in-out;
                }

                .skeleton-meta {
                    height: 14px;
                    width: 80px;
                    background: #f0f0f0;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                    animation: pulse 1.5s infinite ease-in-out;
                }

                .skeleton-title {
                    height: 24px;
                    background: #f0f0f0;
                    border-radius: 6px;
                    margin-bottom: 0.5rem;
                    width: 100%;
                    animation: pulse 1.5s infinite ease-in-out;
                    animation-delay: 0.1s;
                }

                .skeleton-title.short {
                    width: 60%;
                    margin-bottom: 1.5rem;
                }

                .skeleton-text {
                    height: 16px;
                    background: #f0f0f0;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                    width: 100%;
                    animation: pulse 1.5s infinite ease-in-out;
                    animation-delay: 0.2s;
                }

                .skeleton-footer {
                    height: 32px;
                    width: 120px;
                    background: #f0f0f0;
                    border-radius: 16px;
                    margin-top: 2rem;
                    animation: pulse 1.5s infinite ease-in-out;
                    animation-delay: 0.3s;
                }

                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }

                @media (max-width: 768px) {
                    .skeleton-image {
                        height: 200px;
                    }
                }
            `}</style>
        </div>
    );
};

export default BlogCardSkeleton;
