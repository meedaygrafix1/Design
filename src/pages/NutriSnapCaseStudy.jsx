import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';
import ScrollIndicator from '../components/ScrollIndicator';
import ProjectClosing from '../components/ProjectClosing';
import Footer from '../components/Footer';
import './CaseStudy.css';
import './NutriSnapCaseStudy.css';

const figmaUrl = 'https://www.figma.com/design/7QqX7aeEqHrS77XU7XwQOw/nutri-snap?node-id=0-1';
const prototypeUrl = 'https://www.figma.com/proto/7QqX7aeEqHrS77XU7XwQOw/nutri-snap?page-id=0%3A1&node-id=1-8&starting-point-node-id=1%3A8&scaling=scale-down&content-scaling=fixed';
const sections = [
    { id: 'ns-start', label: 'Why I made it' },
    { id: 'ns-first-meal', label: 'The first meal' },
    { id: 'ns-review', label: 'Check the estimate' },
    { id: 'ns-recovery', label: 'When things go wrong' },
    { id: 'ns-history', label: 'Looking back' },
    { id: 'ns-next', label: 'What comes next' },
];
const screens = {
    welcome: { title: 'The starting point', caption: 'A photo is the starting point for adding a meal.' },
    intro: { title: 'A quick introduction', caption: 'Choose a nickname and an avatar, then get started.' },
    'first-meal': { title: 'Your first meal', caption: 'The empty home screen points to one action: take a photo.' },
    camera: { title: 'Take a photo', caption: 'Capture a meal or choose a photo from the gallery.' },
    review: { title: 'Review the estimate', caption: 'See the meal and its estimated nutrition before saving.' },
    edit: { title: 'Make a correction', caption: 'Adjust the meal details, portion, and nutrition values.' },
    manual: { title: 'Add it manually', caption: 'Another way to record a meal when a photo is not useful.' },
    'scan-failed': { title: 'Try another way', caption: 'Retake an unclear photo or enter the meal manually.' },
    'save-failed': { title: 'Keep the details', caption: 'The message explains that the meal was not saved and offers a retry.' },
    weekly: { title: 'The original weekly overview', caption: 'A week of meals in one place. The sample totals here still need to be reconciled.' },
    history: { title: 'A closer look at the day', caption: 'Open a saved meal to review, edit, or delete it.' },
    'empty-day': { title: 'Nothing logged yet', caption: 'No meals recorded does not mean zero calories consumed.' },
};
const screenKeys = Object.keys(screens);

function ScreenImage({ name, eager = false }) {
    return <img src={`/nutri-snap/${name}.png`} alt={`${screens[name].title}. ${screens[name].caption}`} width="402" height="874" loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

export default function NutriSnapCaseStudy({ project }) {
    const [selected, setSelected] = useState(null);
    const dialogRef = useRef(null);
    const openerRef = useRef(null);

    useEffect(() => {
        if (!selected) return;
        const dialog = dialogRef.current;
        if (!dialog.open) {
            dialog.showModal();
            dialog.querySelector('[aria-label="Close enlarged screen"]').focus();
        }
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [selected]);

    const openScreen = (name, event) => {
        openerRef.current = event.currentTarget;
        setSelected(name);
    };
    const moveScreen = step => {
        setSelected(current => screenKeys[(screenKeys.indexOf(current) + step + screenKeys.length) % screenKeys.length]);
        dialogRef.current.querySelector('.ns-dialog-image')?.scrollTo(0, 0);
    };
    const gallery = (names, tone = '') => (
        <div className={`ns-gallery ${tone}`}>
            {names.map(name => <figure key={name}>
                <button className="ns-screen-button" onClick={event => openScreen(name, event)} aria-label={`Enlarge ${screens[name].title}`}>
                    <ScreenImage name={name} />
                    <span className="ns-expand"><Expand size={14} aria-hidden="true" /> View screen</span>
                </button>
                <figcaption><strong>{screens[name].title}</strong><span>{screens[name].caption}</span></figcaption>
            </figure>)}
        </div>
    );

    return <>
        <Helmet>
            <title>Nutri-Snap — A simple way to track my calories | Ayanfe Olamide Balogun</title>
            <meta name="description" content={project.desc} />
            <link rel="canonical" href="https://www.meedaydesign.xyz/project/nutri-snap" />
            <meta property="og:title" content="Nutri-Snap — A simple way to track my calories" />
            <meta property="og:description" content={project.desc} />
            <meta property="og:image" content="https://www.meedaydesign.xyz/nutri-snap/cover.png" />
        </Helmet>
        <main className="case-study-page ns-page container">
            <ScrollIndicator sections={sections} />
            <header className="case-study-header">
                <Link to="/" className="case-study-back"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
                <div className="case-study-title-row">
                    <p className="case-study-eyebrow">Nutri-Snap / Product design case study</p>
                    <span className="case-study-tag">Personal project · Mobile app</span>
                </div>
                <h1>A simple way to<br /><em>track my calories.</em></h1>
                <p className="case-study-description">Take a photo. Check the estimate. Save the meal.<br />That’s the idea behind Nutri-Snap.</p>
                <a className="ns-text-link" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Explore the Figma prototype <ArrowUpRight size={17} aria-hidden="true" /></a>
                <div className="ns-hero">
                    <div className="ns-hero-copy"><span className="ns-wordmark">Nutri-Snap</span><p>One meal<br />at a time.</p><span>A PERSONAL CALORIE-TRACKING CONCEPT</span></div>
                    <div className="ns-hero-screens">{['welcome', 'review', 'history'].map(name => <button key={name} onClick={event => openScreen(name, event)} aria-label={`Enlarge ${screens[name].title}`}><ScreenImage name={name} eager /></button>)}</div>
                </div>
                <dl className="ns-metadata">
                    <div><dt>Project</dt><dd>Personal concept</dd></div>
                    <div><dt>Focus</dt><dd>Product & UI design</dd></div>
                    <div><dt>Platform</dt><dd>Mobile app</dd></div>
                    <div><dt>Tool</dt><dd>Figma</dd></div>
                </dl>
            </header>

            <section id="ns-start" className="ns-section ns-intro">
                <p className="case-study-eyebrow">01 / Where it started</p>
                <div><h2>I wanted a simple app<br />to track my calories.</h2>
                    <p>That was where Nutri-Snap started. The idea was to take a photo of a meal, get a nutrition estimate, and save it. Then I could come back and see what I’d logged throughout the week.</p>
                    <p>The main question was how to keep that process simple while still giving someone a chance to check the estimate before saving it.</p>
                    <ol className="ns-flow" aria-label="The meal tracking flow">{['Take a photo', 'Analyse the meal', 'Review the estimate', 'Save the meal'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}{index < 3 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol>
                </div>
            </section>

            <section id="ns-first-meal" className="ns-section">
                <div className="ns-section-heading"><p className="case-study-eyebrow">02 / Getting started</p><h2>Start with the first meal.</h2><p>The introduction asks for a nickname and an avatar. From there, the empty home screen gives the user a clear next step: take a photo of their first meal.</p><p>The camera also sits in the middle of the bottom navigation. Adding a meal is something people would return to regularly, so it needed to be easy to find.</p></div>
                {gallery(['intro', 'first-meal', 'camera'])}
            </section>

            <section id="ns-review" className="ns-section">
                <div className="ns-section-heading"><p className="case-study-eyebrow">03 / Reviewing a meal</p><h2>A photo gets things started.<br />There’s still room to make changes.</h2><p>The review screen brings the meal photo, name, calories, protein, carbs, and fat together. The nutrition is labelled as an AI estimate, with an option to edit the details before saving.</p></div>
                {gallery(['review', 'edit', 'manual'], 'ns-gallery--peach')}
                <div className="ns-notes"><div><h3>Check what the photo missed</h3><p>The meal details, portion, and nutrition values can be changed. That gives the user a way to account for things like sauces or ingredients that aren’t clear in the photo.</p></div><div><h3>Leave another way in</h3><p>Manual entry makes it possible to add a meal when a photo isn’t useful. It leads back to the same review step, so the details can still be checked before saving.</p></div></div>
            </section>

            <section id="ns-recovery" className="ns-section">
                <div className="ns-section-heading"><p className="case-study-eyebrow">04 / When things go wrong</p><h2>Give people a next step.</h2><p>A failed scan shouldn’t leave someone wondering what to do. They can take another photo or enter the meal themselves. If saving fails, the message explains that their details are still there and lets them try again.</p><p>The prototype also includes camera permissions, a loading state, and a lost-connection screen. Each one explains what’s happening before asking the user to do something else.</p></div>
                {gallery(['scan-failed', 'save-failed'], 'ns-gallery--burgundy')}
            </section>

            <section id="ns-history" className="ns-section">
                <div className="ns-section-heading"><p className="case-study-eyebrow">05 / Looking back</p><h2>See what’s been logged.</h2><p>The weekly overview brings the days together. Meal history lets the user look closer, open a saved meal, and edit or delete it.</p><p>An empty day gets its own message too. No meals logged doesn’t mean no calories consumed. It means there’s nothing recorded for that day.</p></div>
                {gallery(['weekly', 'history', 'empty-day'], 'ns-gallery--sage')}
                <p className="ns-small-note">The original weekly overview is shown here alongside the added history screens. Its sample calorie total and day labels still need to be brought into line with the meal records.</p>
            </section>

            <section className="ns-section ns-visual" aria-labelledby="ns-visual-title">
                <div><p className="case-study-eyebrow">The look & feel</p><h2 id="ns-visual-title">Keep it warm.<br />Keep the food in view.</h2><p>Orange, burgundy, food photography, and illustrated details give the app a casual feel. Light panels separate the numbers from the bright background, while the meal photo stays visible during review.</p></div>
                <img src="/nutri-snap/cover.png" alt="Nutri-Snap welcome screen shown on a phone held in one hand" width="1080" height="1350" loading="lazy" decoding="async" />
            </section>

            <section id="ns-next" className="ns-section ns-next">
                <div className="ns-section-heading"><p className="case-study-eyebrow">06 / What comes next</p><h2>The idea is simple.<br />The next step is to try it with people.</h2></div>
                <div className="ns-notes"><div><h3>What I’d check</h3><ul><li>Can someone add their first meal without help?</li><li>Do they understand that the nutrition is an estimate?</li><li>Can they correct it and find the saved meal again?</li><li>Do they know what to do when a scan or save fails?</li></ul></div></div>
                <div className="ns-actions"><a className="ns-primary-link" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Try the prototype <ArrowUpRight size={18} aria-hidden="true" /></a><a className="ns-text-link" href={figmaUrl} target="_blank" rel="noopener noreferrer">View the Figma file <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            </section>
        </main>
        <ProjectClosing />
        <Footer />
        <dialog ref={dialogRef} className="ns-dialog" aria-labelledby="ns-dialog-title" onClose={() => { setSelected(null); openerRef.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); moveScreen(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); moveScreen(-1); } }}>
            {selected && <><div className="ns-dialog-toolbar"><div aria-live="polite"><span>{screenKeys.indexOf(selected) + 1} / {screenKeys.length}</span><h2 id="ns-dialog-title">{screens[selected].title}</h2></div><div className="ns-dialog-controls"><button aria-label="Previous screen" onClick={() => moveScreen(-1)}><ArrowLeft size={20} /></button><button aria-label="Next screen" onClick={() => moveScreen(1)}><ArrowRight size={20} /></button><button aria-label="Close enlarged screen" onClick={() => dialogRef.current.close()}><X size={22} /></button></div></div><div className="ns-dialog-image"><ScreenImage name={selected} eager /><p>{screens[selected].caption}</p></div></>}
        </dialog>
    </>;
}
