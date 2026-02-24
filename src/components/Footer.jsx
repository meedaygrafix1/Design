import React from 'react';
import { NewTwitterIcon, Linkedin01Icon, Mail01Icon, NewsIcon, MediumIcon } from 'hugeicons-react';

function Footer() {
    return (
        <footer className="container footer">
            <div>
                <div className="logo" style={{ fontSize: '1.1rem', fontWeight: 600 }}>MEEDAY</div>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>© 2026. Designed with precision & care.</p>
            </div>
            <div className="footer-links">
                <a href="https://twitter.com/Meedayyy" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <NewTwitterIcon size={20} />
                </a>
                <a href="https://www.linkedin.com/in/meeday/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin01Icon size={20} />
                </a>
                <a href="mailto:olamidebalogun56@gmail.com" aria-label="Email">
                    <Mail01Icon size={20} />
                </a>
                <a href="https://meeday.substack.com/" target="_blank" rel="noopener noreferrer" aria-label="Substack">
                    <NewsIcon size={20} />
                </a>
                <a href="https://medium.com/@olamidebalogun56" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                    <MediumIcon size={20} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
