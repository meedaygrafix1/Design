import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './index.css';

// Page imports
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Illustrations from './pages/Illustrations';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        if (target === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app-wrapper">
      <nav className="container" style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '1.5rem 0',
        position: 'sticky',
        top: '1rem',
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <motion.div
          className={`nav-pill-container ${isMenuOpen ? 'expanded' : ''}`}
          animate={{
            borderRadius: isMenuOpen ? '24px' : '50px'
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: '#1a1a1a',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Top row - Logo and Nav */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            width: '100%'
          }}>
            <Link
              to="/"
              className="logo"
              onClick={(e) => handleNavClick(e, 'top')}
              style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#ffffff', cursor: 'pointer', textDecoration: 'none' }}
            >
              MEEDAY
            </Link>

            <div className="nav-links desktop-only" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
              <a href="#" onClick={(e) => handleNavClick(e, 'top')} style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.3s', cursor: 'pointer' }}>Home</a>
              <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.3s', cursor: 'pointer' }}>Experience</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.3s', cursor: 'pointer' }}>About Me</a>
            </div>

            <div className="nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: 'auto' }}>
              <a href="mailto:olamidebalogun56@gmail.com" className="pill-btn-yellow desktop-only" style={{
                background: '#ffffff',
                color: '#1a1a1a',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                textDecoration: 'none',
                display: 'inline-block'
              }}>Contact</a>

              <button className="mobile-toggle" onClick={toggleMenu} style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Items - Expands below */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="mobile-menu-items"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  overflow: 'hidden',
                  marginTop: '1rem',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '1rem'
                }}
              >
                {['Home', 'Experience', 'About Me'].map((item, idx) => (
                  <a
                    key={idx}
                    href={item === 'Experience' ? '#experience' : item === 'About Me' ? '#about' : '#'}
                    onClick={(e) => handleNavClick(e, item === 'Home' ? 'top' : item === 'Experience' ? 'experience' : 'about')}
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '0.75rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="mailto:olamidebalogun56@gmail.com"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: '#ffffff',
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    padding: '0.75rem 0.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    marginTop: '0.5rem'
                  }}
                >
                  Contact
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/illustrations" element={<Illustrations />} />
      </Routes>
    </div>
  );
}

export default App;
