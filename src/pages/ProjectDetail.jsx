import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects, getProjectBySlug } from '../data/projects';
import { Helmet } from 'react-helmet-async';
import ScrollIndicator from '../components/ScrollIndicator';

function ProjectDetail() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    // Build sections list dynamically based on what this project has
    const sections = useMemo(() => {
        if (!project) return [];
        const list = [
            { id: 'section-overview', label: 'Project overview' },
        ];
        if (project.challenge)         list.push({ id: 'section-challenge',         label: 'The Challenge' });
        if (project.goals)             list.push({ id: 'section-goals',             label: 'Goals' });
        if (project.researchInsights)  list.push({ id: 'section-research',          label: 'Research & Insights' });
        if (project.title === 'Fundora') list.push({ id: 'section-ui-fundora',       label: 'UI Solution' });
        if (project.solutions)         list.push({ id: 'section-solutions',         label: 'Solutions' });
        if (!project.challenge && project.problem) list.push({ id: 'section-problem', label: 'Problem' });
        if (!project.solutions && project.solution) list.push({ id: 'section-solution', label: 'Solution' });
        if (project.title === 'RealVEST') {
            list.push({ id: 'section-design-process', label: 'Design Process' });
            list.push({ id: 'section-ui-realvest',    label: 'UI Solution' });
        }
        if (project.uiScreens?.length)  list.push(...project.uiScreens.map((s, i) => ({ id: `section-ui-${i}`, label: s.title })));
        if (project.challenges)         list.push({ id: 'section-challenges',        label: 'Challenge' });
        if (project.impactLearnings)    list.push({ id: 'section-impact',            label: 'Impact & Learnings' });
        if (!project.impactLearnings && project.impact) list.push({ id: 'section-impact-legacy', label: 'The Impact' });
        return list;
    }, [project]);

    if (!project) {
        return (
            <>
                <Helmet>
                    <title>Project Not Found | Ayanfe Olamide Balogun</title>
                </Helmet>
                <div className="detail-container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
                    <h1>Project not found</h1>
                    <Link to="/" className="back-link" style={{ marginTop: '2rem', display: 'inline-block' }}>
                        ← Back to Home
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>{project.title} | Ayanfe Olamide Balogun</title>
                <meta name="description" content={project.desc || `Case study for ${project.title}`} />
                <link rel="canonical" href={`https://www.meedaydesign.xyz/project/${project.slug}`} />
                <meta property="og:title" content={`${project.title} | Ayanfe Olamide Balogun`} />
                <meta property="og:description" content={project.desc || `Case study for ${project.title}`} />
                {project.image && <meta property="og:image" content={`https://www.meedaydesign.xyz${project.image.startsWith('/') ? project.image : '/' + project.image}`} />}
            </Helmet>
            <div className="project-detail-page project-detail-layout">
                <ScrollIndicator sections={sections} />
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
                    {project.coverVideo ? (
                        <video
                            src={project.coverVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="detail-main-img"
                            style={{ width: '100%', display: 'block' }}
                        />
                    ) : (
                        <img src={project.image} alt={project.title} className="detail-main-img" />
                    )}

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
                    <section id="section-overview" className="detail-content-section">
                        <h3>Project overview</h3>
                        <p>{project.desc}</p>
                    </section>

                    {/* Fundora-specific Challenge section */}
                    {project.challenge && (
                        <section id="section-challenge" className="detail-content-section">
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
                        <section id="section-goals" className="detail-content-section">
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
                        <section id="section-research" className="detail-content-section">
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
                        <section id="section-ui-fundora" className="detail-content-section">
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
                        <section id="section-solutions" className="detail-content-section">
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
                        <section id="section-problem" className="detail-content-section">
                            <h3>Problem</h3>
                            <p>{project.problem}</p>
                        </section>
                    )}

                    {/* Legacy Solution section (for projects without solutions field) */}
                    {!project.solutions && project.solution && (
                        <section id="section-solution" className="detail-content-section">
                            <h3>Solution</h3>
                            <p>{project.solution}</p>
                        </section>
                    )}

                    {/* RealVEST-specific sections */}
                    {project.title === "RealVEST" && (
                        <>
                            <section id="section-design-process" className="detail-content-section">
                                <h3>My design process</h3>
                                <img src="/design-process.png" alt="Design Process" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto', display: 'block', borderRadius: '12px' }} />
                            </section>

                            <section id="section-ui-realvest" className="detail-content-section">
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
                        <section key={i} id={`section-ui-${i}`} className="detail-content-section">
                            <h3>{screen.title}</h3>
                            <p>{screen.description}</p>
                            {screen.video ? (
                                <video
                                    src={screen.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    style={{ width: '100%', marginTop: '2rem', borderRadius: '12px', display: 'block' }}
                                />
                            ) : screen.image ? (
                                <img src={screen.image} alt={screen.title} style={{ width: '100%', marginTop: '2rem' }} />
                            ) : null}
                        </section>
                    ))}

                    {project.challenges && (
                        <section id="section-challenges" className="detail-content-section">
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
                        <section id="section-impact" className="detail-content-section">
                            <h3>Impact & Learnings</h3>
                            <p>{project.impactLearnings.impact}</p>
                            <h4 style={{ fontSize: '1.1rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Personal Growth:</h4>
                            <p>{project.impactLearnings.personalGrowth}</p>
                        </section>
                    )}

                    {/* Legacy Impact section (for projects without impactLearnings field) */}
                    {!project.impactLearnings && project.impact && (
                        <section id="section-impact-legacy" className="detail-content-section">
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
        </>
    );
}

export default ProjectDetail;
