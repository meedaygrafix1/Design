import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppShowcase from './AppShowcase';
import './ProjectCard.css';

// What the browser mockup's address bar shows
const addressFor = (project) => {
    try {
        return new URL(project.link).hostname.replace(/^www\./, '');
    } catch {
        return project.title;
    }
};

export default function ProjectCard({ project }) {
    const reduceMotion = useReducedMotionPreference();
    const isLive = Boolean(project.link);

    return (
        <Link
            className="project-card"
            to={project.link || `/project/${project.slug}`}
            target={isLive ? '_blank' : undefined}
            rel={isLive ? 'noopener noreferrer' : undefined}
            aria-label={`${project.title}: ${isLive ? 'view live site (opens in a new tab)' : 'view case study'}`}
        >
            <div className="project-card-media" aria-hidden="true">
                {project.showcase ? (
                    <AppShowcase url={addressFor(project)} {...project.showcase} />
                ) : project.coverVideo && !reduceMotion ? (
                    <video src={project.coverVideo} autoPlay muted loop playsInline poster={project.image} />
                ) : (
                    <img src={project.image} alt="" loading="lazy" />
                )}
            </div>

            <div className="project-card-body">
                <div className="project-card-heading">
                    <h3>{project.title}</h3>
                    <span className="project-card-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span>
                </div>
                <p className="project-card-meta">
                    {project.industry} <span aria-hidden="true">·</span> {project.year}
                </p>
                <p className="project-card-desc">{project.desc}</p>
            </div>
        </Link>
    );
}
