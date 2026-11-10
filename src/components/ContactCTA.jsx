import { ArrowUpRight } from 'lucide-react';
import './ContactCTA.css';

const EMAIL = 'olamidebalogun56@gmail.com';
const CV_URL = 'https://docs.google.com/document/d/1TpgW7XRnzpsyhmV208HeQzAr_bsdMeOBw04U9plIlJs/edit?usp=sharing';

// Closing call to action: clean type on the page, using theme colours, so it
// contrasts with the meadow footer below and works in light and dark mode.
export default function ContactCTA() {
    return (
        <div className="contact-cta">
            <div className="contact-cta-content">
                <span className="contact-cta-badge">
                    <span className="contact-cta-dot" aria-hidden="true" />
                    Available for new projects
                </span>

                <h2 className="contact-cta-title">
                    Let&apos;s build something <em>meaningful</em>
                </h2>

                <p className="contact-cta-text">
                    I&apos;m open to freelance design work, product collaborations, and long-term partnerships.
                </p>

                <div className="contact-cta-actions">
                    <a href={`mailto:${EMAIL}`} className="pill-btn black">
                        Work with me
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                    <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="pill-btn gray">
                        Read CV
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                </div>

                <a href={`mailto:${EMAIL}`} className="contact-cta-email">{EMAIL}</a>
            </div>
        </div>
    );
}
