import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import ScrollIndicator from '../../components/ScrollIndicator';
import Footer from '../../components/Footer';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';
import '../CaseStudy.css';
import './ScanlightCaseStudy.css';
import './CoverStudioCaseStudy.css';

/*
 * Spidra Cover Hub is an internal tool, so there is no live link.
 * Uses the shared tool case-study layout (sl-*) with its own accent (cs-*).
 */

const KUBAI_GITHUB = 'https://github.com/kubai087/kubai-icons';

const sections = [
    { id: 'cs-start', label: 'Why I built it' },
    { id: 'cs-rule', label: 'The rule that fixed it' },
    { id: 'cs-how', label: 'How a cover gets made' },
    { id: 'cs-covers', label: 'One look, every post' },
    { id: 'cs-editor', label: 'The editor' },
    { id: 'cs-export', label: 'Getting it out' },
    { id: 'cs-details', label: 'Small stuff' },
    { id: 'cs-learned', label: 'What I learned' },
];

const covers = [
    ['cover-1', 'How to scrape Amazon prices with Python'],
    ['cover-2', 'Build a price tracker that alerts you on Slack'],
    ['cover-3', 'Extracting tables from PDFs at scale'],
    ['cover-4', 'How to rotate proxies without getting blocked'],
    ['cover-5', 'Turn any website into a JSON API'],
    ['cover-6', 'Scraping Google Maps for local leads'],
    ['cover-7', 'Give your AI agent live web data with MCP'],
    ['cover-8', 'Monitor Reddit comments for brand complaints'],
];

const flow = [
    ['Post title', ''],
    ['Match topics', 'Kubai icon tags'],
    ['Claude composes', 'Layout, icons, captions'],
    ['Validate', 'House style enforced'],
    ['Editable cover', ''],
];

function Pipeline() {
    return (
        <figure className="sl-flow" aria-labelledby="cs-flow-caption">
            <ol>
                {flow.map(([step, note]) => (
                    <li key={step}>
                        <strong>{step}</strong>
                        {note && <span>{note}</span>}
                    </li>
                ))}
            </ol>
            <figcaption id="cs-flow-caption">The matcher hands Claude a shortlist. If Claude can't be reached, a local layout engine builds the cover from the same shortlist.</figcaption>
        </figure>
    );
}

function KubaiLink({ children }) {
    return <a className="sl-link" href={KUBAI_GITHUB} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function CoverStudioCaseStudy({ tool }) {
    const reduceMotion = useReducedMotionPreference();
    const videoProps = {
        autoPlay: !reduceMotion,
        controls: reduceMotion,
        muted: true,
        loop: true,
        playsInline: true,
        preload: 'metadata',
    };

    return <>
        <Helmet>
            <title>Spidra Cover Hub: Blog covers without the design queue | Ayanfe Olamide Balogun</title>
            <meta name="description" content={tool.description} />
            <link rel="canonical" href="https://www.meedaydesign.xyz/tools/cover-studio" />
            <meta property="og:title" content="Spidra Cover Hub: Blog covers without the design queue" />
            <meta property="og:description" content={tool.description} />
            <meta property="og:image" content="https://www.meedaydesign.xyz/coverhub/og.jpg" />
        </Helmet>
        <main className="case-study-page sl-page cs-page container">
            <ScrollIndicator sections={sections} />
            <header className="case-study-header">
                <Link to="/tools" className="case-study-back"><ArrowLeft size={16} aria-hidden="true" /> All tools</Link>
                <div className="case-study-title-row">
                    <p className="case-study-eyebrow">Tool case study</p>
                    <span className="case-study-tag">Internal tool · AI</span>
                </div>
                <h1>Spidra Cover Hub</h1>
                <p className="case-study-description">
                    Spidra Cover Hub turns a blog post title into an on-brand cover in a few seconds. Claude picks the layout
                    and icons, the tool keeps everything inside the house style, and anyone on the team can tweak it and export it.
                </p>
                <div className="sl-hero-media cs-hero-media">
                    <video
                        src="/coverhub/demo.mp4"
                        poster="/coverhub/demo-poster.webp"
                        {...videoProps}
                        aria-label="Spidra Cover Hub demo: typing a post title, generating a cover, then moving and resizing a card in the editor"
                    />
                </div>
                <dl className="sl-metadata">
                    <div><dt>Role</dt><dd>Design and build, end to end</dd></div>
                    <div><dt>Stack</dt><dd>React, TypeScript, Vite, Tailwind</dd></div>
                    <div><dt>AI</dt><dd>Claude Haiku, structured output</dd></div>
                    <div><dt>Used by</dt><dd>The content team</dd></div>
                </dl>
            </header>

            <section id="cs-start" className="sl-section">
                <h2>Every post was waiting on a designer.</h2>
                <p>Every blog post needs a cover, and at Spidra that meant every post went through a designer. Brief them, wait, review, ask for a change, wait again. A post that took an afternoon to write could spend days waiting on its cover.</p>
                <p>The covers didn't match either. Different designers, different weeks, different moods. Scroll the blog index and it looked like five blogs stitched together.</p>
                <p>Writers didn't want to become designers, and designers didn't want to spend their week on blog covers. So I set out to take covers off both their plates. The brief was short:</p>
                <ul className="sl-list">
                    <li><strong>Consistent.</strong> Every cover should look like the same person made it, no matter who actually did.</li>
                    <li><strong>Fast.</strong> Title in, cover out, in about the time it takes to write the meta description.</li>
                    <li><strong>No design skill needed.</strong> A writer should get a good cover without knowing what a layout grid is.</li>
                    <li><strong>Still editable.</strong> If the first try isn't right, you fix it yourself. No request, no waiting.</li>
                </ul>
            </section>

            <section id="cs-rule" className="sl-section">
                <h2>I took the headline off the cover.</h2>
                <p>My first versions put the post title on the cover, like most blogs do. Most of my time went into fitting text: long titles, short titles, titles with code in them. The covers still looked samey, because the illustration got squeezed into whatever space the words left.</p>
                <p>Then I realised the title already sits right above the cover on the blog page. Saying it twice wasn't helping anyone. So every cover became a full-bleed illustration of what the post is about. That one rule turned a typography problem into a picture problem, and pictures are much easier to keep consistent.</p>
                <figure className="sl-shot cs-shot">
                    <img src="/coverhub/create.webp" alt="The Spidra Cover Hub create screen: a post title field, three example titles, two style cards called Blueprint and Soft, and a Generate cover button" width="1440" height="900" loading="lazy" decoding="async" />
                    <figcaption>The whole first step: a title, one of two styles, and a button. Everything else waits until there's a cover to look at.</figcaption>
                </figure>
                <p>There are two styles: <strong>Blueprint</strong>, a crisp technical grid that's the house look, and <strong>Soft</strong>, pastel and a bit friendlier. Under the hood there are ten templates and eighteen illustrations, but writers never see that menu. Fewer choices up front is what keeps the blog looking like one blog.</p>
            </section>

            <section id="cs-how" className="sl-section">
                <h2>Claude gets a menu, not a blank canvas.</h2>

                <h3>Finding the topics</h3>
                <p>Before any AI gets involved, a matcher reads the title and works out what it's about. It checks a short list of hand-picked concepts first, then falls back to the tags on every icon in <KubaiLink>Kubai icons</KubaiLink>, so "honey prices" still finds a bee. Matches are ranked by subject, then action, then output, then tech. Words like "secure" swap in a badged version of an icon, so a database becomes a locked database.</p>
                <p>Kubai is an open-source set of 3,000+ layered icons that move on hover, and it's MIT licensed. If you want to try it in your own project, it's <KubaiLink>on GitHub</KubaiLink>.</p>

                <h3>Letting Claude design it</h3>
                <Pipeline />
                <p>The title, the chosen style and that shortlist of icons go to a small server function, which asks Claude Haiku for a cover. The system prompt is really a design brief: the house style, every template, background and layout, and when to use each one.</p>
                <p>Claude doesn't return pixels. It returns a composition: which cards, tiles, pills and connectors go where, which icons go in them, and what the captions say. That answer has to match a strict schema, and the schema is type-checked against the app's own types, so if I add a template and forget to tell Claude about it, the build fails. The browser then checks the result. Icons Claude made up get looked up in the real library or dropped, and backgrounds from the wrong style get swapped out.</p>

                <h3>Working without the AI</h3>
                <p>If there's no API key, the network is down, or Claude declines, writers still get a cover. A local layout engine scores every layout against the shape of the title: how many topics there are, and whether it's a flow ("X into Y"), a comparison ("X vs Y") or a roundup. A bit of randomness, seeded by the title, breaks ties.</p>
                <p className="sl-quote">Similar posts get different covers, but the same title always gets the same cover.</p>
                <p>It needs no model and no network, so it runs anywhere. It was the first version of the tool, and it's still the safety net under the AI.</p>
            </section>

            <section id="cs-covers" className="sl-section">
                <h2>Eight posts, one look.</h2>
                <p>Each of these came from a title and one click. Different subjects, different layouts, and they still sit together on one blog index.</p>
                <div className="cs-loop">
                    <video
                        src="/coverhub/covers.mp4"
                        poster="/coverhub/covers-poster.webp"
                        {...videoProps}
                        aria-label="A loop fading through eight generated blog covers in the Blueprint and Soft styles"
                    />
                </div>
                <ul className="cs-gallery">
                    {covers.map(([file, title]) => (
                        <li key={file}>
                            <img src={`/coverhub/${file}.webp`} alt={`Generated cover for "${title}"`} width="1200" height="630" loading="lazy" decoding="async" />
                            <p>{title}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section id="cs-editor" className="sl-section">
                <h2>The first try is a draft, not a final.</h2>
                <p>The AI gets you most of the way, and the editor handles the rest. I didn't want "regenerate until it's right" to be the only way to fix a cover.</p>
                <figure className="sl-shot cs-shot">
                    <img src="/coverhub/editor.webp" alt="The Spidra Cover Hub editor: a layers list on the left, a cover showing Amazon and Python cards flowing into a Prices card in the middle, and title, style, size and background controls on the right" width="1440" height="900" loading="lazy" decoding="async" />
                    <figcaption>"How to scrape Amazon prices with Python", straight out of Generate. Every part is a layer you can select, move, restyle or delete.</figcaption>
                </figure>
                <ul className="sl-list">
                    <li><strong>It works like Figma.</strong> Layers on the left, canvas in the middle, properties on the right, tools in a floating bar. Drag to move, pull handles to resize, snap to an 8-unit grid with red guides. If you've opened a design file before, you already know how to use it.</li>
                    <li><strong>One undo takes back the whole AI answer.</strong> A generated cover lands as a single step. If Claude's version is worse than what you had, Ctrl+Z puts it back.</li>
                    <li><strong>Your edits are safe.</strong> Once you've moved or changed anything by hand, Regenerate asks before it throws your layout away.</li>
                    <li><strong>Swapping an icon keeps the layout.</strong> Cards, pills and connectors point at a topic, not a position. Click an icon, pick any of the 3,000+ Kubai icons, and the connectors and captions follow it.</li>
                    <li><strong>The design panel follows your selection.</strong> Nothing selected: title, style, size and background. One part: position, icon, caption, badge and accent colour. Several parts: align and distribute. You only see what you can use right now.</li>
                </ul>
            </section>

            <section id="cs-export" className="sl-section">
                <h2>What you see is what gets published.</h2>
                <ul className="sl-list">
                    <li><strong>PNG:</strong> 1200×630, or 2× for sharp screens. Press Ctrl+E and it's in your downloads, named after the post.</li>
                    <li><strong>SVG:</strong> a real vector with the Geist font embedded, so it looks the same on any machine. The PNG is that same SVG drawn onto a canvas, which is why the export always matches the preview.</li>
                    <li><strong>Sharing:</strong> drafts save in the browser. To hand a cover to a teammate, copy a share link. The whole design lives in the URL, so there's no database and no accounts.</li>
                </ul>
            </section>

            <section id="cs-details" className="sl-section">
                <h2>The bits nobody asks about.</h2>
                <p>You'd only notice most of these if they were missing.</p>
                <ul className="sl-list">
                    <li>Text is measured with the real Geist font metrics, then wrapped, shrunk and balanced. It only gets cut off with "…" as a last resort, so long captions never spill out of their card.</li>
                    <li>Exported SVGs turn the icons' CSS colours into plain hex, so they open correctly in Figma and Illustrator instead of going black.</li>
                    <li>The long design brief Claude reads is prompt-cached, so every cover after the first is cheaper and quicker.</li>
                    <li>The API only accepts requests from the tool itself and caps every input, so nobody can borrow the key.</li>
                    <li>Wrap a word in *asterisks* in a title and it shows up in the brand colour.</li>
                </ul>
            </section>

            <section id="cs-learned" className="sl-section sl-last">
                <h2>What I'm taking into the next one.</h2>
                <ul className="sl-list">
                    <li><strong>Constrain the output, not the person.</strong> Consistency didn't come from rules writers had to remember. It came from a tool that can only make on-brand covers.</li>
                    <li><strong>Give the model a menu.</strong> Claude is much better at choosing from known pieces than drawing from nothing. A strict schema and a validator turned "usually good" into "always usable".</li>
                    <li><strong>Build the boring fallback first.</strong> The rule-based engine came before the AI. Because it was already there, the tool keeps working when the API doesn't.</li>
                </ul>
            </section>
        </main>
        <Footer />
    </>;
}
