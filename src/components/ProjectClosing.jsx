import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './ProjectClosing.css';

export default function ProjectClosing() {
    return (
        <footer className="project-closing">
            <div className="container project-closing-inner">
                <div>
                    <span className="project-closing-eyebrow">Have a product worth figuring out?</span>
                    <h2 className="project-closing-title">Let’s make it clearer.</h2>
                    <a className="project-closing-contact" href="mailto:olamidebalogun56@gmail.com">
                        Get in touch <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                </div>
                <Link to="/" className="project-closing-back">
                    <ArrowLeft size={16} aria-hidden="true" /> Back to all projects
                </Link>
            </div>
        </footer>
    );
}
