import AppShowcase from './AppShowcase';
import './CaseStudyCover.css';

// The project's animated card cover, shown full width as a case study's hero
export default function CaseStudyCover({ project }) {
    return (
        <div className="case-study-cover" role="img" aria-label={`${project.title} app walkthrough`}>
            <AppShowcase url={project.title} {...project.showcase} />
        </div>
    );
}
