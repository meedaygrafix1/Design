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
 * Cover Studio is an internal tool, so there is no live link.
 * Shares the Scanlight case-study layout (sl-*) with its own accent (cs-*).
 */

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

const brief = [
    ['Consistent', 'Every cover should look like it came from the same hand, whoever made it.'],
    ['Fast', 'Title in, cover out, in about the time it takes to write the meta description.'],
    ['No design skill needed', "A writer should get a good cover without knowing what a layout grid is."],
    ['Still editable', "If the first try isn't right, you fix it. You don't file a request."],
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

const editorDecisions = [
    ['It works like Figma, on purpose.', "Layers on the left, canvas in the middle, properties on the right, tools in a floating bar. Drag to move, pull handles to resize, snap to an 8-unit grid with red guides. Anyone who has opened a design file already knows how to use it."],
    ['One click undoes the whole AI answer.', "A generated cover lands as a single undoable step. If Claude's version is worse than what you had, Ctrl+Z takes you straight back."],
    ['Your edits are protected.', "Once you've moved or changed anything by hand, Regenerate asks before it throws your layout away."],
    ['Swapping an icon keeps the layout.', 'Every card, pill and connector points at a topic by index, not by position. Click an icon, pick any of the 3,000+ in the library, and the connectors and captions follow it.'],
    ['The design panel follows what you select.', 'Nothing selected: title, style, size and background. One part: position, icon, caption, a badge icon, accent colour. Several parts: align and distribute. You only see the controls that make sense right now.'],
];

const details = [
    'Text is measured with the real Geist font metrics, then wrapped, shrunk, balanced and only truncated with "…" as a last resort. Long captions never spill out of their card.',
    "Exported SVGs bake the icons' CSS colours into plain hex, so they open correctly in Figma and Illustrator instead of turning black.",
    'The long design brief Claude reads is prompt-cached, so every cover after the first is cheaper and quicker to make.',
    'The API refuses requests from other sites and caps every input, so nobody can borrow the key from outside the tool.',
    'Typing *word* in a title highlights that word in the brand colour.',
];

function Pipeline() {
    return (
        <figure className="sl-pipeline cs-pipeline" aria-labelledby="cs-pipeline-caption">
            <div className="sl-pipe-flow">
                <div className="sl-pipe-node sl-pipe-node--io">Post title</div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node">
                    <strong>Match topics</strong>
                    <span>title → concepts → icons</span>
                    <small>3,000+ tagged icons</small>
                </div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node">
                    <strong>Claude composes</strong>
                    <span>layout, icons, captions, background</span>
                    <small>design brief + strict schema</small>
                </div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node">
                    <strong>Validate</strong>
                    <span>unknown icons searched or dropped, style enforced</span>
                </div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node sl-pipe-node--io">Editable cover</div>
            </div>
            <div className="sl-pipe-branch">
                <span className="sl-pipe-branch-label">Fallback</span>
                <div className="sl-pipe-node sl-pipe-node--branch">
                    <strong>No AI available</strong>
                    <span>no key, offline, or a refusal</span>
                </div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node sl-pipe-node--branch">
                    <strong>Layout engine</strong>
                    <span>scores layouts from the title's shape, seeded by the title</span>
                </div>
                <span className="sl-pipe-branch-note">still a full cover</span>
            </div>
            <figcaption id="cs-pipeline-caption">The keyword matcher runs first and hands Claude a shortlist. If Claude can't be reached, the same shortlist builds the cover locally.</figcaption>
        </figure>
    );
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
            <title>Cover Studio: Blog covers without the design queue | Ayanfe Olamide Balogun</title>
            <meta name="description" content={tool.description} />
            <link rel="canonical" href="https://www.meedaydesign.xyz/tools/cover-studio" />
            <meta property="og:title" content="Cover Studio: Blog covers without the design queue" />
            <meta property="og:description" content={tool.description} />
            <meta property="og:image" content="https://www.meedaydesign.xyz/coverhub/og.jpg" />
        </Helmet>
        <main className="case-study-page sl-page cs-page container">
            <ScrollIndicator sections={sections} />
            <header className="case-study-header">
                <Link to="/tools" className="case-study-back"><ArrowLeft size={16} aria-hidden="true" /> All tools</Link>
                <div className="case-study-title-row">
                    <p className="case-study-eyebrow">Cover Studio / Tool case study</p>
                    <span className="case-study-tag">Internal tool · AI</span>
                </div>
                <h1>Blog covers without<br /><em>the design queue.</em></h1>
                <p className="case-study-description">
                    I built an internal tool that turns a blog post title into an on-brand cover in seconds. Claude picks the
                    layout and icons, the tool keeps it inside the house style, and anyone on the team can tweak it and export it.
                </p>
                <p className="cs-internal-note">Internal tool. No public link, so everything below is from the real thing.</p>
                <div className="sl-hero-media cs-hero-media">
                    <video
                        src="/coverhub/demo.mp4"
                        poster="/coverhub/demo-poster.webp"
                        {...videoProps}
                        aria-label="Cover Studio demo: typing a post title, generating a cover, then moving and resizing a card in the editor"
                    />
                </div>
                <dl className="sl-metadata">
                    <div><dt>Role</dt><dd>Design and build, end to end</dd></div>
                    <div><dt>Stack</dt><dd>React, TypeScript, Vite, Tailwind</dd></div>
                    <div><dt>AI</dt><dd>Claude Haiku, structured output</dd></div>
                    <div><dt>Used by</dt><dd>The content team</dd></div>
                </dl>
            </header>

            <section id="cs-start" className="sl-section sl-split">
                <p className="case-study-eyebrow">01 / Why I built it</p>
                <div>
                    <h2>Every post was waiting<br />on a designer.</h2>
                    <p>Every blog post needs a cover. For us that meant every post went through a designer: brief them, wait, review, ask for a change, wait again. For a post that took an afternoon to write, the cover could take days.</p>
                    <p>And the covers didn't match. Different designers, different weeks, different moods. Scroll the blog index and it looked like five blogs stitched together.</p>
                    <p>Writers didn't want to become designers, and designers didn't want to spend their week on blog covers. So I wrote a brief for a tool that would take the cover off both their plates.</p>
                    <ol className="sl-brief">
                        {brief.map(([title, text], i) => (
                            <li key={title}>
                                <span>{String(i + 1).padStart(2, '0')}</span>
                                <strong>{title}</strong>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section id="cs-rule" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">02 / The rule that fixed it</p>
                    <h2>I took the headline off the cover.</h2>
                    <p>My first versions put the post title on the cover, like most blogs do. Most of the work went into fitting text: long titles, short titles, titles with code in them. And the covers still looked samey, because the illustration was squeezed into whatever space the words left.</p>
                    <p>Then it hit me that the title is already right above the cover on the blog page. Saying it twice wasn't helping anyone. So every cover became a full-bleed illustration of what the post is about. That one rule turned a typography problem into a picture problem, and pictures are much easier to keep consistent.</p>
                </div>
                <figure className="sl-shot cs-shot">
                    <img src="/coverhub/create.webp" alt="The Cover Studio create screen: a post title field, three example titles, two style cards called Blueprint and Soft, and a Generate cover button" width="1440" height="900" loading="lazy" decoding="async" />
                    <figcaption>The whole first step: a title, one of two styles, and a button. Everything else waits until there's a cover to look at.</figcaption>
                </figure>
                <div className="sl-callout">
                    <p className="case-study-eyebrow">Less choice, more consistency</p>
                    <p className="sl-callout-text">There are two styles: <strong>Blueprint</strong>, a crisp technical grid that's the house look, and <strong>Soft</strong>, pastel and a bit friendlier. The engine knows ten templates and eighteen illustrations, but writers never see that menu. Fewer choices up front is what keeps the blog looking like one blog.</p>
                </div>
            </section>

            <section id="cs-how" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">03 / How a cover gets made</p>
                    <h2>Claude gets a menu,<br />not a blank canvas.</h2>
                </div>

                <div className="sl-steps">
                    <div className="sl-step">
                        <h3><span>3.1</span> Finding the topics</h3>
                        <p>Before any AI gets involved, a matcher reads the title and finds the things it's about. A short list of hand-picked concepts comes first. Anything else gets looked up in the icon library's own tags, so "honey prices" still finds a bee. Matches are ranked subject, then action, then output, then tech, and words like "secure" swap in badged versions of an icon, so a database becomes a locked database.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.2</span> Letting Claude design it</h3>
                        <Pipeline />
                        <p>The title, the chosen style and that shortlist of icons go to a small server function, which asks Claude Haiku for a cover. The system prompt is really a design brief: the house style, every template, background and layout, and when to use each one.</p>
                        <p>The answer comes back as structured output that has to match a schema. The schema's lists are type-checked against the app's own types, so if I add a template and forget to tell Claude about it, the build fails. Claude doesn't return pixels. It returns a composition: which cards, tiles, pills and connectors go where on the artboard, which icons go in them, and the captions. Then the browser checks it. Icons Claude made up get searched for in the real library or dropped, and backgrounds outside the chosen style get swapped back in.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.3</span> Working without the AI</h3>
                        <p>If there's no API key, the network is down, or Claude declines, writers still get a cover. A local layout engine scores every layout against the shape of the title: how many topics, whether it's a flow ("X into Y"), a comparison ("X vs Y") or a roundup. A small bit of randomness, seeded by the title, breaks ties.</p>
                        <blockquote className="sl-rule">Similar posts get different covers, but the same title always gets the same cover.</blockquote>
                        <p>It needs no model and no network, so it runs on any device. It was the first version of the tool, and it's still the safety net under the AI.</p>
                    </div>
                </div>
            </section>

            <section id="cs-covers" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">04 / One look, every post</p>
                    <h2>Eight posts, one look.</h2>
                    <p>These are real outputs, each from a title and one click. Different subjects, different layouts, and they still sit together on one blog index.</p>
                </div>
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
                <div className="sl-heading">
                    <p className="case-study-eyebrow">05 / The editor</p>
                    <h2>The first try is a draft,<br />not a final.</h2>
                    <p>AI gets you most of the way. The editor is for the rest. I didn't want "regenerate until it's right" to be the only way to fix a cover.</p>
                </div>
                <figure className="sl-shot cs-shot">
                    <img src="/coverhub/editor.webp" alt="The Cover Studio editor: a layers list on the left, a cover showing Amazon and Python cards flowing into a Prices card in the middle, and title, style, size and background controls on the right" width="1440" height="900" loading="lazy" decoding="async" />
                    <figcaption>"How to scrape Amazon prices with Python", straight out of Generate. Every part is a real layer you can select, move, restyle or delete.</figcaption>
                </figure>
                <ul className="sl-decisions">
                    {editorDecisions.map(([lead, body]) => <li key={lead}><h3>{lead}</h3><p>{body}</p></li>)}
                </ul>
            </section>

            <section id="cs-export" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">06 / Getting it out</p>
                    <h2>What you see is exactly what gets published.</h2>
                </div>
                <div className="sl-export-grid">
                    <div><p className="case-study-eyebrow">PNG</p><p>1200×630, or 2× for sharp screens. Ctrl+E and it's in your downloads, named after the post.</p></div>
                    <div><p className="case-study-eyebrow">SVG</p><p>A real vector with the Geist font embedded, so it looks the same on any machine. The PNG is that same SVG drawn onto a canvas, which is why the export always matches the preview.</p></div>
                    <div><p className="case-study-eyebrow">Sharing</p><p>Drafts save in the browser. To hand a cover to a teammate, copy a share link: the whole design is encoded in the URL, so there's no database and no accounts to set up.</p></div>
                </div>
            </section>

            <section id="cs-details" className="sl-section sl-split">
                <p className="case-study-eyebrow">07 / Small stuff</p>
                <div>
                    <h2>The bits nobody<br />asks about.</h2>
                    <p>Most of these only show up when they're missing.</p>
                    <ul className="sl-detail-list">
                        {details.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                </div>
            </section>

            <section id="cs-learned" className="sl-section sl-last">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">08 / What I learned</p>
                    <h2>What I'm taking into the next one.</h2>
                </div>
                <div className="sl-lessons">
                    <div><h3>Constrain the output, not the person.</h3><p>Consistency didn't come from rules writers had to remember. It came from a tool that can only make on-brand covers.</p></div>
                    <div><h3>Give the model a menu.</h3><p>Claude is much better at choosing from known pieces than drawing from nothing. A strict schema and a validator turned "usually good" into "always usable".</p></div>
                    <div><h3>Build the boring fallback first.</h3><p>The rule-based engine came before the AI. Because it was already there, the tool never breaks when the API does.</p></div>
                </div>
            </section>
        </main>
        <Footer />
    </>;
}
