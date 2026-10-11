import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import { ArrowUpRight, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProjectFolder.css';

export default function ProjectFolder({ project, index }) {
    const reduceMotion = useReducedMotionPreference();

    return (
        <Link
            className="project-folder"
            to={project.link || `/project/${project.slug}`}
            target={project.link ? '_blank' : undefined}
            rel={project.link ? 'noopener noreferrer' : undefined}
            aria-label={`${project.title}: ${project.link ? 'view live site (opens in a new tab)' : 'view case study'}`}
        >
            <div className="folder-stage" aria-hidden="true">
                <div className="folder-back" />
                <div className="folder-paper" />
                <div className="folder-preview">
                    {project.coverVideo && !reduceMotion ? (
                        <video src={project.coverVideo} autoPlay muted loop playsInline poster={project.image} />
                    ) : (
                        <img src={project.image} alt="" loading="lazy" />
                    )}
                </div>
            </div>
            <div className="folder-cover">
                <span className="folder-tab" aria-hidden="true">
                    <Folder size={14} strokeWidth={1.5} />
                    PROJECT {String(index + 1).padStart(2, '0')}
                </span>
                <div className="folder-meta">
                    <span>{project.industry}</span>
                    <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="folder-description">{project.desc}</p>
                <div className="folder-footer">
                    <span>{project.link ? 'View live site' : 'View case study'}</span>
                    <span className="folder-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
                </div>
            </div>
        </Link>
    );
}
