import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects, getProjectBySlug } from '../data/projects';

function ProjectDetail() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    if (!project) {
        return (
            <div className="detail-container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
                <h1>Project not found</h1>
                <Link to="/" className="back-link" style={{ marginTop: '2rem', display: 'inline-block' }}>
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="project-detail-page">
            <div className="detail-container">
                <header className="detail-hero">
                    <Link
                        to="/"
                        className="back-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '2rem', display: 'inline-flex', textDecoration: 'none' }}
                    >
                        ← Back to Home
                    </Link>
                    <h1>{project.title}</h1>
                    <img src={project.image} alt={project.title} className="detail-main-img" />

                    <div className="detail-context-grid">
                        <div className="context-item">
                            <label>Industry</label>
                            <span>{project.industry}</span>
                        </div>
                        <div className="context-item">
                            <label>Year</label>
                            <span>{project.year}</span>
                        </div>
                        <div className="context-item">
                            <label>Tool</label>
                            <span>{project.tool}</span>
                        </div>
                    </div>
                </header>

                <div className="detail-content">
                    <section className="detail-content-section">
                        <h3>Project overview</h3>
                        <p>{project.desc}</p>
                    </section>

                    {/* Fundora-specific Challenge section */}
                    {project.challenge && (
                        <section className="detail-content-section">
                            <h3>The Challenge</h3>
                            <p>{project.challenge.description}</p>
                            <ul>
                                {project.challenge.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                            {project.challenge.designQuestion && (
                                <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: 'var(--text-primary)', fontWeight: 600 }}>
                                    Design Question: {project.challenge.designQuestion}
                                </p>
                            )}
                        </section>
                    )}

                    {/* Fundora-specific Goals section */}
                    {project.goals && (
                        <section className="detail-content-section">
                            <h3>Goals</h3>
                            <ul>
                                {project.goals.map((goal, i) => (
                                    <li key={i}>{goal}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Fundora-specific Research & Insights section */}
                    {project.researchInsights && (
                        <section className="detail-content-section">
                            <h3>Research & Insights</h3>
                            <p>{project.researchInsights.description}</p>
                            <h4 style={{ fontSize: '1.1rem', marginTop: '2rem', marginBottom: '1rem' }}>Findings:</h4>
                            <ul>
                                {project.researchInsights.findings.map((finding, i) => (
                                    <li key={i}>{finding}</li>
                                ))}
                            </ul>
                            <h4 style={{ fontSize: '1.1rem', marginTop: '2rem', marginBottom: '1rem' }}>Key Insights:</h4>
                            <ul>
                                {project.researchInsights.keyInsights.map((insight, i) => (
                                    <li key={i}>{insight}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Fundora-specific UI solution section */}
                    {project.title === "Fundora" && (
                        <section className="detail-content-section">
                            <h3>UI solution</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                                <img src="/fundora-ui-1.png" alt="Fundora UI - My Groups and Home" style={{ width: '100%' }} />
                                <img src="/fundora-ui-2.png" alt="Fundora UI - Group Creation Flow" style={{ width: '100%' }} />
                                <img src="/fundora-ui-3.png" alt="Fundora UI - Group Details and Members" style={{ width: '100%' }} />
                                <img src="/fundora-ui-4.png" alt="Fundora UI - Payments and Transactions" style={{ width: '100%' }} />
                            </div>
                        </section>
                    )}

                    {/* Fundora-specific Solutions section */}
                    {project.solutions && (
                        <section className="detail-content-section">
                            <h3>Solutions</h3>
                            {project.solutions.map((sol, i) => (
                                <div key={i} style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                        {i + 1}. {sol.title}
                                    </h4>
                                    <p>{sol.description}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Legacy Problem section (for projects without challenge field) */}
                    {!project.challenge && project.problem && (
                        <section className="detail-content-section">
                            <h3>Problem</h3>
                            <p>{project.problem}</p>
                        </section>
                    )}

                    {/* Legacy Solution section (for projects without solutions field) */}
                    {!project.solutions && project.solution && (
                        <section className="detail-content-section">
                            <h3>Solution</h3>
                            <p>{project.solution}</p>
                        </section>
                    )}

                    {/* RealVEST-specific sections */}
                    {project.title === "RealVEST" && (
                        <>
                            <section className="detail-content-section">
                                <h3>My design process</h3>
                                <img src="/design-process.png" alt="Design Process" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto', display: 'block', borderRadius: '12px' }} />
                            </section>

                            <section className="detail-content-section">
                                <h3>UI solution</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                                    <img src="/realvest-ui-1.png" alt="RealVEST UI - Home and Details" style={{ width: '100%' }} />
                                    <img src="/realvest-ui-2.png" alt="RealVEST UI - Portfolio and Profile" style={{ width: '100%' }} />
                                    <img src="/realvest-ui-3.png" alt="RealVEST UI - Transactions" style={{ width: '100%' }} />
                                </div>
                            </section>
                        </>
                    )}

                    {/* Trackly-specific UI Screens sections */}
                    {project.uiScreens && project.uiScreens.map((screen, i) => (
                        <section key={i} className="detail-content-section">
                            <h3>{screen.title}</h3>
                            <p>{screen.description}</p>
                            {screen.image && (
                                <img src={screen.image} alt={screen.title} style={{ width: '100%', marginTop: '2rem' }} />
                            )}
                        </section>
                    ))}

                    {project.challenges && (
                        <section className="detail-content-section">
                            <h3>Challenge</h3>
                            <ul>
                                {project.challenges.map((challenge, i) => (
                                    <li key={i}>{challenge}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Fundora-specific Impact & Learnings section */}
                    {project.impactLearnings && (
                        <section className="detail-content-section">
                            <h3>Impact & Learnings</h3>
                            <p>{project.impactLearnings.impact}</p>
                            <h4 style={{ fontSize: '1.1rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Personal Growth:</h4>
                            <p>{project.impactLearnings.personalGrowth}</p>
                        </section>
                    )}

                    {/* Legacy Impact section (for projects without impactLearnings field) */}
                    {!project.impactLearnings && project.impact && (
                        <section className="detail-content-section">
                            <h3>The Impact</h3>
                            <ul>
                                {project.impact.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </section>
                    )}

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

export default ProjectDetail;
