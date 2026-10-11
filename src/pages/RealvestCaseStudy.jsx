import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Expand, X, ZoomIn, ZoomOut } from 'lucide-react';
import ScrollIndicator from '../components/ScrollIndicator';
import Footer from '../components/Footer';
import ProjectClosing from '../components/ProjectClosing';
import { realvestScreens, realvestSections, realvestAdminSections, realvestAdminScreenKeys } from '../data/realvest';
import RealvestAdminStory from './RealvestAdminStory';
import './RealvestCaseStudy.css';

function ScreenImage({ name, eager = false }) {
    const screen = realvestScreens[name];
    return <img src={`/realvest/${name}.png`} alt={`${screen.title}: ${screen.caption}`} width={screen.width} height={screen.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

function SectionHeading({ number, eyebrow, title, children }) {
    return (
        <div className="rv-section-heading">
            <p className="rv-eyebrow"><span>{number}</span> {eyebrow}</p>
            <h2>{title}</h2>
            {children && <p className="rv-lead">{children}</p>}
        </div>
    );
}

function ScreenGallery({ names, dark = false, desktop = false, onOpen }) {
    const [active, setActive] = useState(0);
    const id = useId();
    const sequence = desktop && names.length > 1;
    const visibleNames = sequence ? [names[active]] : names;

    const handleTabKey = (event, index) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % names.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + names.length) % names.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = names.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        setActive(next);
        event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next].focus();
    };

    return (
        <div className={sequence ? 'rv-screen-sequence' : undefined}>
            {sequence && <div className="rv-screen-tabs" role="tablist" aria-label={`${realvestScreens[names[0]].title} screens`}>
                {names.map((name, index) => <button key={name} id={`${id}-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => handleTabKey(event, index)}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{realvestScreens[name].title}</button>)}
            </div>}
            <div id={sequence ? `${id}-panel` : undefined} role={sequence ? 'tabpanel' : undefined} aria-labelledby={sequence ? `${id}-tab-${active}` : undefined} className={`rv-gallery${dark ? ' rv-gallery--dark' : ''}${desktop ? ' rv-gallery--desktop' : ''}`}>
                {visibleNames.map(name => <figure key={name} className="rv-screen-figure">
                    <button className="rv-screen-button" onClick={event => onOpen(name, event)} aria-label={`Enlarge ${realvestScreens[name].title}`}>
                        <ScreenImage name={name} />
                        <span className="rv-expand"><Expand size={15} aria-hidden="true" /> View screen</span>
                    </button>
                    <figcaption><strong>{realvestScreens[name].title}</strong><span>{realvestScreens[name].caption}</span></figcaption>
                </figure>)}
            </div>
        </div>
    );
}

export default function RealvestCaseStudy({ project }) {
    const isAdmin = project.slug === 'realvest-admin';
    const screenKeys = isAdmin ? realvestAdminScreenKeys : Object.keys(realvestScreens).filter(name => !realvestAdminScreenKeys.includes(name));
    const [selected, setSelected] = useState(null);
    const [fullSize, setFullSize] = useState(false);
    const dialogRef = useRef(null);
    const openerRef = useRef(null);

    useEffect(() => {
        if (selected === null) return;
        const dialog = dialogRef.current;
        if (!dialog.open) {
            dialog.showModal();
            dialog.querySelector('[aria-label="Close enlarged screen"]')?.focus();
        }
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [selected]);

    const openScreen = (name, event) => {
        openerRef.current = event.currentTarget;
        setFullSize(false);
        setSelected(name);
    };
    const closeScreen = () => dialogRef.current.close();
    const moveScreen = (step) => {
        setSelected(current => screenKeys[(screenKeys.indexOf(current) + step + screenKeys.length) % screenKeys.length]);
        dialogRef.current.querySelector('.rv-lightbox-image')?.scrollTo(0, 0);
    };

    const gallery = (names, options = {}) => <ScreenGallery key={names.join('-')} names={names} {...options} onOpen={openScreen} />;

    return (
        <>
            <Helmet>
                <title>{project.title} — {isAdmin ? 'Helping the team keep things moving' : 'Property investing, made clearer'} | Ayanfe Olamide Balogun</title>
                <meta name="description" content={project.desc} />
                <link rel="canonical" href={`https://www.meedaydesign.xyz/project/${project.slug}`} />
                <meta property="og:title" content={`${project.title} — ${isAdmin ? 'Helping the team keep things moving' : 'Property investing, made clearer'}`} />
                <meta property="og:description" content={project.desc} />
                <meta property="og:image" content={`https://www.meedaydesign.xyz${project.image}`} />
            </Helmet>

            <main className="rv-page container">
                <ScrollIndicator sections={isAdmin ? realvestAdminSections : realvestSections} />
                <header className="rv-header">
                    <Link to="/" className="rv-back"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
                    <div className="rv-title-row"><p className="rv-eyebrow">{project.title} / Product design case study</p><span className="rv-project-tag">Personal project · 2026</span></div>
                    {isAdmin ? <h1>Behind every investment,<br /><em>a team keeping it moving.</em></h1> : <h1>A clearer way into<br /><em>property investing.</em></h1>}
                    <p className="rv-header-description">{isAdmin ? 'Designing the workspace behind RealVEST: from verifying investors and publishing properties to reconciling payments, resolving withdrawals and managing team access.' : 'A mobile app that helps people invest in a share of a property, understand the costs, and keep track of their money.'}</p>
                    {isAdmin && <nav className="rva-story-links" aria-label="Explore the admin case study"><a href="#rva-onboarding">Staff onboarding <ArrowRight size={14} aria-hidden="true" /></a><a href="#rva-payments">Money operations <ArrowRight size={14} aria-hidden="true" /></a><a href="#rva-permissions">Team & permissions <ArrowRight size={14} aria-hidden="true" /></a></nav>}

                    <div className={`rv-cover${isAdmin ? ' rv-cover--admin' : ''}`}>
                        <div className="rv-cover-copy"><span className="rv-wordmark">{isAdmin ? 'RealVest Admin' : 'RealVest'}</span><p>{isAdmin ? <>A clearer view.<br />A connected team.</> : <>A little ownership.<br />A lot more clarity.</>}</p><span className="rv-cover-label">{isAdmin ? 'THE TEAM WORKSPACE' : 'THE INVESTOR MOBILE APP'}</span></div>
                        <div className={isAdmin ? 'rv-cover-desktop' : 'rv-cover-screens'}>
                            {(isAdmin ? ['admin'] : ['intro', 'discover', 'portfolio']).map(name => <button key={name} onClick={event => openScreen(name, event)} aria-label={`Enlarge ${realvestScreens[name].title}`}><ScreenImage name={name} eager /></button>)}
                        </div>
                    </div>
                    <dl className="rv-metadata">
                        <div><dt>Project</dt><dd>Personal project</dd></div>
                        <div><dt>Focus</dt><dd>Product & UI design</dd></div>
                        <div><dt>Platform</dt><dd>{isAdmin ? 'Admin web app' : 'Investor mobile app'}</dd></div>
                        <div><dt>Tool</dt><dd>Figma</dd></div>
                    </dl>
                </header>

                {isAdmin ? <RealvestAdminStory gallery={gallery} /> : <>
                <section id="rv-overview" className="rv-section rv-overview">
                    <p className="rv-eyebrow">The overview</p>
                    <div><h2>You don’t need to buy a whole building<br />to invest in property.</h2>
                        <p>RealVEST brings people together to invest in a property. Each person pays for a share instead of covering the full price alone. Their investment may earn money from rent or an increase in the property’s value, but returns depend on how the property performs.</p>
                        <p>I designed the mobile app to explain this process one step at a time: find a property, understand the costs and risks, choose an amount, review the payment, and track the investment. The goal is to help someone make sense of the decision even if they have never invested in property before.</p>
                    </div>
                </section>

                <section id="rv-problem" className="rv-section">
                    <SectionHeading number="01" eyebrow="The problem" title="Finding a property is only the first question.">For someone new to investing, a photo of a building and a percentage are not enough. They need to know how much to pay, how their money might grow, and when they may be able to take it out.</SectionHeading>
                    <div className="rv-problem-grid">
                        <article><span>01 / Understanding</span><h3>What am I actually buying?</h3><p>The app needs to explain what a share represents, what fees apply, and how long the money is expected to stay invested. These details belong alongside the possible earnings.</p></article>
                        <article><span>02 / Confidence</span><h3>What happens to my money?</h3><p>The estimated value of a property share is different from money available to spend. People need to see which money is invested, which is available, and which is still being transferred.</p></article>
                        <article><span>03 / Getting unstuck</span><h3>Can I pick up where I left off?</h3><p>Someone may need to confirm their identity or set a security PIN before paying. Their chosen property and amount should still be there when they finish.</p></article>
                    </div>
                    <div className="rv-design-question"><span className="rv-eyebrow">The design question</span><p>How might we make shared property investing easier to understand, from the first introduction to the moments when something goes wrong?</p></div>
                    <div className="rv-approach"><h3>How I approached the design</h3><p>I organised the experience around the questions a person needs answered before and after paying. That meant designing the steps to get started, the information needed to choose a property, and the guidance needed if a payment or identity check does not go as expected.</p></div>
                </section>

                <section id="rv-onboarding" className="rv-section">
                    <SectionHeading number="02" eyebrow="Getting started" title="Understand the app before filling in the details.">The first screens explain that people can invest in part of a property. They can explore the opportunity before completing the identity and payment-security checks needed to make their first investment.</SectionHeading>
                    {gallery(['intro', 'risk', 'setup'])}
                    <div className="rv-notes-row"><article><h3>Explain what the person can do</h3><p>“Invest in a share of a property” gives a first-time visitor a direct explanation of the app. The following screen encourages them to understand both the opportunity and its risks before deciding.</p></article><article><h3>Keep their choice while they set up</h3><p>Before paying, the person confirms who they are and creates a PIN to approve payments. Their chosen property and amount remain visible so they know what they are returning to. The app also explains that it will check the price and available shares again before payment.</p></article></div>
                </section>

                <section id="rv-discovery" className="rv-section">
                    <SectionHeading number="03" eyebrow="Choosing a property" title="Show what the investment involves.">Each property card puts the key details beside the photo. A person can see the smallest amount they can invest, the possible yearly return, and how long they should expect their money to remain invested.</SectionHeading>
                    {gallery(['discover', 'property'])}
                    <div className="rv-notes-row"><article><h3>Make the numbers understandable</h3><p>“Projected annual return” means an estimate of what the investment could earn in a year, rather than a promised payment. “Holding period” is the expected time the money stays invested. The funding bar shows how much of the property’s target amount has been raised.</p></article><article><h3>Let people look closer</h3><p>The property page separates a general overview, the money breakdown, supporting documents, and the risks. Someone can check costs or read the conditions for leaving an investment without searching through one long description.</p></article></div>
                </section>

                <section id="rv-investment" className="rv-section">
                    <SectionHeading number="04" eyebrow="Review & confirm" title="Know the total before saying yes.">Before any payment is approved, the review screen brings the property, chosen amount, fees and total together. The person can change the amount or go back if something does not look right.</SectionHeading>
                    {gallery(['review', 'confirmation'], { dark: true })}
                    <div className="rv-notes-row"><article><h3>Show the calculation</h3><p>In the screen shown here, ten units—ten shares priced at ₦10,000 each—cost ₦100,000. A ₦1,000 purchase fee makes the total ₦101,000. The review also shows the ₦149,000 that would remain in the wallet, so the person can see the effect of the payment.</p></article><article><h3>Confirm without losing the details</h3><p>A panel opens over the review screen and asks for the payment PIN. It repeats the property and total, and the payment button says “Invest ₦101,000.” “Back to review” lets the person check the details again before proceeding.</p></article></div>
                </section>

                <section id="rv-money" className="rv-section">
                    <SectionHeading number="05" eyebrow="Keeping track" title="Separate available money from invested money.">The wallet shows money ready to use. The portfolio is a list of the person’s investments and their estimated value. Giving them separate screens helps explain why a growing investment does not automatically mean more cash is available to withdraw.</SectionHeading>
                    {gallery(['wallet', 'portfolio'])}
                    <div className="rv-notes-row"><article><h3>Money ready to use</h3><p>The wallet puts the available balance first, followed by money added, investments paid for and withdrawals. It explains that money tied up in properties or transfers still being processed is shown separately.</p></article><article><h3>Money already invested</h3><p>The portfolio shows how much the person paid in, what their shares are estimated to be worth, and income they have received. “Unrealised change” means a change in estimated value that has not been turned into cash by selling. A date shows when that estimate applies.</p></article></div>
                </section>

                <section id="rv-recovery" className="rv-section rv-recovery-section">
                    <div><SectionHeading number="06" eyebrow="When things go wrong" title="Explain the problem and what to do next.">If a withdrawal does not reach the bank, a generic error message leaves the person wondering where their money is. This screen explains what happened and gives them a way to follow up.</SectionHeading>
                        <ul className="rv-check-list"><li><strong>Say what happened.</strong> The bank transfer did not complete, and the return of the money is being checked.</li><li><strong>Keep a record visible.</strong> The amount, fee and reference number help the person identify the payment when asking for help.</li><li><strong>Show the next step.</strong> They can track the money being returned or contact support, instead of trying the same withdrawal again.</li></ul>
                        <p className="rv-small-note">Other screens explain what to do when a verification code expires, a PIN is forgotten, a property sells out, or an identity check needs more information.</p>
                    </div>
                    {gallery(['recovery'])}
                </section>

                <section id="rv-system" className="rv-section">
                    <SectionHeading number="07" eyebrow="Look & feel" title="Make important information easy to spot.">Purple highlights the main actions. Dark plum brings attention to balances, while light backgrounds give the text and numbers room to breathe. The Space Grotesk typeface gives the app a consistent look.</SectionHeading>
                    <div className="rv-system-board">
                        <div className="rv-type-specimen"><span className="rv-eyebrow">Typography / Space Grotesk</span><p>Aa</p><span>Clear labels. Readable terms.<br />Numbers with context.</span></div>
                        <div className="rv-system-details"><div className="rv-swatches">{[['Purple', '#6840D8'], ['Plum', '#281D39'], ['Lavender', '#F0EBFA'], ['Paper', '#FAF9F6']].map(([label, color]) => <div key={label}><span style={{ background: color }} /><strong>{label}</strong><small>{color}</small></div>)}</div><p>Buttons, forms and payment summaries use the same styles throughout the app. Once someone learns how to select an option, enter information or review a payment, the next screen follows a familiar pattern.</p></div>
                    </div>
                </section>

                <section id="rv-reflection" className="rv-section">
                    <SectionHeading number="08" eyebrow="Reflection & next steps" title="Help people understand each decision.">RealVEST brings property discovery, payment and money tracking into one journey. Every stage is built around a practical question: what am I investing in, what will I pay, and what happens afterwards?</SectionHeading>
                    <div className="rv-reflection-grid"><div><h3>What I took from this project</h3><p>The small explanations matter: showing a fee beside the total, adding a date to an estimate, or explaining how to follow up on a failed payment. I gave those moments the same attention as the property browsing screens because they help people understand what they are doing with their money.</p></div><div><h3>What I want to check with a prototype</h3><ol><li>Can a first-time user explain what they are buying and find the fees, risks and expected investment length?</li><li>Can they finish account setup and return to their chosen property?</li><li>Can they tell available cash apart from the estimated value of their investments?</li><li>Can they work out what to do when a payment does not go through?</li></ol></div></div>
                </section>
                </>}

                <div className="rv-related"><p className="rv-eyebrow">Another side of RealVEST</p><Link className="rv-text-link" to={isAdmin ? '/project/realvest' : '/project/realvest-admin'}>{isAdmin ? 'Read the investor app case study' : 'Read the admin workspace case study'} <ArrowRight size={17} aria-hidden="true" /></Link></div>

            </main>
            <ProjectClosing />
            <Footer />

            <dialog ref={dialogRef} className="rv-lightbox" aria-labelledby="rv-lightbox-title" onClose={() => { setSelected(null); openerRef.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) closeScreen(); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); moveScreen(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); moveScreen(-1); } }}>
                {selected && <>
                    <div className="rv-lightbox-toolbar">
                        <div><span>{screenKeys.indexOf(selected) + 1} / {screenKeys.length}</span><h2 id="rv-lightbox-title">{realvestScreens[selected].title}</h2></div>
                        <div className="rv-lightbox-controls">
                            {isAdmin && <button onClick={() => { setFullSize(current => !current); dialogRef.current.querySelector('.rv-lightbox-image')?.scrollTo(0, 0); }} aria-label={fullSize ? 'Fit screen to window' : 'View screen at full size'} aria-pressed={fullSize} title={fullSize ? 'Fit to window' : 'View full size'}>{fullSize ? <ZoomOut size={20} /> : <ZoomIn size={20} />}</button>}
                            <button onClick={() => moveScreen(-1)} aria-label="Previous screen"><ArrowLeft size={20} /></button>
                            <button onClick={() => moveScreen(1)} aria-label="Next screen"><ArrowRight size={20} /></button>
                            <button onClick={closeScreen} aria-label="Close enlarged screen" autoFocus><X size={21} /></button>
                        </div>
                    </div>
                    {isAdmin && <p className="rv-lightbox-hint" aria-live="polite">{fullSize ? 'Full size. Scroll across and down to explore the details.' : 'Use the zoom control to read the screen at full size.'}</p>}
                    <div className={`rv-lightbox-image${isAdmin ? ' rv-lightbox-image--desktop' : ''}${isAdmin && fullSize ? ' rv-lightbox-image--full' : ''}`} tabIndex={isAdmin && fullSize ? 0 : undefined} role={isAdmin && fullSize ? 'region' : undefined} aria-label={isAdmin && fullSize ? 'Full-size screen, scroll to explore' : undefined} onKeyDown={event => { if (fullSize && ['ArrowLeft', 'ArrowRight'].includes(event.key)) event.stopPropagation(); }}><ScreenImage name={selected} eager /><p>{realvestScreens[selected].caption}</p></div>
                </>}
            </dialog>
        </>
    );
}
