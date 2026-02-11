import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import BlogCardSkeleton from '../components/BlogCardSkeleton';
import { getPosts } from '../lib/hygraph';

function Articles() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError("Failed to load articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <>
                <main className="container section-padding">
                    <div style={{ textAlign: 'center', marginBottom: '5rem', paddingTop: '2rem' }}>
                        <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>Articles & Thoughts</h1>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem' }}>
                            Sharing insights on design, product development, and the creative process.
                        </p>
                    </div>

                    <div className="articles-grid">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <BlogCardSkeleton key={n} />
                        ))}
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <div className="container section-padding" style={{ textAlign: 'center', minHeight: '50vh' }}>
                <h2 style={{ marginBottom: '1rem' }}>Oops!</h2>
                <p className="text-muted">{error}</p>
            </div>
        );
    }

    return (
        <>
            <main className="container section-padding">
                <div style={{ textAlign: 'center', marginBottom: '5rem', paddingTop: '2rem' }}>
                    <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>Articles & Thoughts</h1>
                    <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem' }}>
                        Sharing insights on design, product development, and the creative process.
                    </p>
                </div>

                <div className="articles-grid">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Articles;

