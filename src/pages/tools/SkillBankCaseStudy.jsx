import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ScrollIndicator from '../../components/ScrollIndicator';
import Footer from '../../components/Footer';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';
import '../CaseStudy.css';
import './ScanlightCaseStudy.css';
import './SkillBankCaseStudy.css';

/*
 * Skill Bank: a searchable library of AI agent skill repos.
 * Uses the shared tool case-study layout (sl-*) with its own accent (sb-*).
 *
 * Media lives in /public/skillbank/ (converted from the SkillBank repo's outputs/hairline).
 * Any slot left as null is simply not rendered.
 */
const media = {
    hero: '/skillbank/home.webp',    // home page with the archive figure (1440×1040)
    cards: '/skillbank/cards.webp',  // card grid, dark theme (1440×900)
    empty: '/skillbank/empty.webp',  // empty search state with the tray (1152×413)
    detail: null,   // e.g. '/skillbank/detail.webp' (skill page with Markdown preview)
    figure: null,   // e.g. '/skillbank/archive.mp4' (archive figure following the cursor)
    figurePoster: null,
};

const SPIDRA_URL = 'https://spidra.io';

const TOTAL = 772;
const VERIFIED = 185;

const sections = [
    { id: 'sb-problem', label: 'The problem' },
    { id: 'sb-gathering', label: 'Gathering the data' },
    { id: 'sb-cleaning', label: 'Cleaning it up' },
    { id: 'sb-design', label: 'Design decisions' },
    { id: 'sb-findings', label: 'What the data showed' },
    { id: 'sb-outcome', label: 'Outcome' },
    { id: 'sb-learned', label: 'What I learned' },
];

const flow = [
    ['Spidra map', '15 crawls via MCP'],
    ['15 CSVs', 'Name, owner, category, stars'],
    ['Import script', 'Match, dedupe, describe'],
    ['Verify', 'Look for SKILL.md'],
    ['One JSON file', 'Static site'],
];

const categories = [
    { label: 'Design (skills, tooling, systems)', value: 170, display: '170+' },
    { label: 'Awesome lists and collections', value: 101 },
    { label: 'Engineering skills', value: 63 },
    { label: 'Marketing skills', value: 39 },
    { label: 'Skill security scanners', value: 23 },
];

/* 772 squares, one per repo. The 185 with a real SKILL.md are filled in. */
function VerifiedGrid() {
    return (
        <figure className="sb-grid-figure">
            <div
                className="sb-grid"
                role="img"
                aria-label={`${VERIFIED} of ${TOTAL} repositories contain a SKILL.md file, about one in four.`}
            >
                {Array.from({ length: TOTAL }, (_, i) => (
                    <span key={i} className={i < VERIFIED ? 'is-verified' : undefined} />
                ))}
            </div>
            <figcaption className="sb-grid-legend">
                <span><i className="is-verified" aria-hidden="true" /> <strong>{VERIFIED}</strong> have a real SKILL.md</span>
                <span><i aria-hidden="true" /> <strong>{TOTAL - VERIFIED}</strong> are collections, tools or resources</span>
            </figcaption>
        </figure>
    );
}

function Pipeline() {
    return (
        <figure className="sl-flow" aria-labelledby="sb-flow-caption">
            <ol>
                {flow.map(([step, note]) => (
                    <li key={step}>
                        <strong>{step}</strong>
                        {note && <span>{note}</span>}
                    </li>
                ))}
            </ol>
            <figcaption id="sb-flow-caption">The whole pipeline. Adding more repos means running another map, exporting the CSV and rerunning the import.</figcaption>
        </figure>
    );
}

function CategoryChart() {
    const max = Math.max(...categories.map((c) => c.value));
    return (
        <figure className="sb-bars" aria-labelledby="sb-bars-caption">
            <ul>
                {categories.map((c) => (
                    <li key={c.label}>
                        <span className="sb-bars-label">{c.label}</span>
                        <span className="sb-bars-track" aria-hidden="true">
                            <span style={{ width: `${(c.value / max) * 100}%` }} />
                        </span>
                        <span className="sb-bars-value">{c.display || c.value}</span>
                    </li>
                ))}
            </ul>
            <figcaption id="sb-bars-caption">Repos by category, out of 772. The categories are the ones the crawls returned, not a taxonomy I added afterwards.</figcaption>
        </figure>
    );
}

function SpidraLink({ children }) {
    return <a className="sl-link" href={SPIDRA_URL} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Shot({ src, alt, caption, width, height }) {
    if (!src) return null;
    return (
        <figure className="sl-shot sb-shot">
            <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

export default function SkillBankCaseStudy({ tool }) {
    const reduceMotion = useReducedMotionPreference();
    const title = 'Skill Bank: A library of 772 AI agent skills';

    return <>
        <Helmet>
            <title>{`${title} | Ayanfe Olamide Balogun`}</title>
            <meta name="description" content={tool.description} />
            <link rel="canonical" href="https://www.meedaydesign.xyz/tools/skill-bank" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={tool.description} />
            <meta property="og:image" content="https://www.meedaydesign.xyz/skillbank/og.jpg" />
        </Helmet>
        <main className="case-study-page sl-page sb-page container">
            <ScrollIndicator sections={sections} />
            <header className="case-study-header">
                <Link to="/tools" className="case-study-back"><ArrowLeft size={16} aria-hidden="true" /> All tools</Link>
                <div className="case-study-title-row">
                    <p className="case-study-eyebrow">Tool case study</p>
                    <span className="case-study-tag">Data · Library</span>
                </div>
                <h1>Skill Bank</h1>
                <p className="case-study-description">
                    A searchable library of 772 AI agent skill repositories, built from scraped GitHub data. It's upfront
                    about which ones you can actually use today.
                </p>
                {tool.url && (
                    <a className="sl-text-link" href={tool.url} target="_blank" rel="noopener noreferrer">Open Skill Bank <ArrowUpRight size={17} aria-hidden="true" /></a>
                )}
                {media.hero ? (
                    <div className="sl-hero-media sb-hero-media">
                        <img
                            src={media.hero}
                            alt="The Skill Bank home page: the headline 'Make your agent more capable.', a search field, an isometric line drawing of an archive, and 38 category chips with counts"
                            width="1440"
                            height="1040"
                            fetchPriority="high"
                        />
                    </div>
                ) : (
                    <div className="sb-hero-data">
                        <p className="sb-hero-stat"><strong>{VERIFIED}</strong> <span>of {TOTAL} repos had a real SKILL.md</span></p>
                        <VerifiedGrid />
                    </div>
                )}
                <dl className="sl-metadata">
                    <div><dt>Role</dt><dd>Research, data pipeline, design and front-end, with Jeremiah (AI and data science)</dd></div>
                    <div><dt>Stack</dt><dd>React, Vite, TypeScript, Fuse.js, marked, DOMPurify, Hairline</dd></div>
                    <div><dt>Data</dt><dd>Spidra map via MCP in Claude, 15 crawls, 1 import script</dd></div>
                    <div><dt>Result</dt><dd>772 repos, 38 categories, 185 verified skills</dd></div>
                </dl>
            </header>

            <section id="sb-problem" className="sl-section">
                <h2>Too many skills and no way to find them.</h2>
                <p>An agent skill is a folder with a <code>SKILL.md</code> file that teaches an AI agent how to do one job well. People are publishing them faster than anyone can keep track of, and there's no good way to find them.</p>
                <p>GitHub search gives you lists of lists. By the third "awesome-claude-skills" repo I opened, I was reading the same twenty projects in a different order. Worse, a lot of what gets called a "skill" isn't one. It's a collection, a tool or a design resource, and you only find out after you've clicked through.</p>
                <p>So the brief I gave myself had two parts:</p>
                <ol className="sl-list">
                    <li><strong>Find everything.</strong> Map the whole landscape, not just the repos that show up on the first page of search.</li>
                    <li><strong>Be honest about what's usable.</strong> Make it obvious which entries you can actually drop into an agent today.</li>
                </ol>
            </section>

            <section id="sb-gathering" className="sl-section">
                <h2>Fifteen crawls, no crawler.</h2>
                <p>I didn't write a crawler. Every repo came from <SpidraLink>Spidra</SpidraLink>'s map feature, run through its MCP server inside a Claude chat. Map takes a starting point and returns the URLs it finds there, which suited a job where I knew roughly where skills lived but not the exact pages. Claude pulled out the name, owner, category, star count and URL for each repo and saved every run as a sheet.</p>
                <p>It took fifteen crawls, not one. Each run turned up new owners and new corners of GitHub, and those fed the next one.</p>
                <ul className="sl-list">
                    <li>Crawl 1, design skills: <strong>190 repos</strong></li>
                    <li>Crawl 4, marketing: <strong>49 repos</strong></li>
                    <li>The rest: <strong>12 to 112 repos each</strong> (crawl 8 was the biggest)</li>
                </ul>
                <p>That came to fifteen CSV files and <strong>772 unique repositories</strong> once they were merged.</p>
                <Pipeline />
            </section>

            <section id="sb-cleaning" className="sl-section">
                <h2>Don't make the data look more certain than it is.</h2>
                <p>Scraped data is never clean. The CSVs disagreed on column names, some rows had no display name, and the same repo would show up twice with a slightly different URL. I wrote one import script to handle all of it, and every decision in it came back to that one rule.</p>
                <ul className="sl-list">
                    <li><strong>Loose header matching.</strong> <code>stars</code>, <code>star_count</code> and <code>stargazers_count</code> all land in the same field. Headers are compared case-insensitively, ignoring spaces, underscores and dashes, and the script prints the mapping it used every run so nothing happens silently.</li>
                    <li><strong>Deduping by URL.</strong> Case, protocol, trailing slashes, <code>.git</code>, query strings and hashes are all stripped before comparing.</li>
                    <li><strong>Categories kept as found.</strong> I didn't impose my own taxonomy afterwards. The 38 filter chips on the site are the categories the crawls actually returned.</li>
                    <li><strong>Real descriptions.</strong> A card that just says "reverse-skill" doesn't tell you anything. The importer goes back to GitHub for each repo's About text. 761 of 772 had one, and the other 11 fall back to the first paragraph of the README. Every fetch is logged with a timestamp and source URL, so any summary on the site can be traced back to where it came from.</li>
                    <li><strong>Checking the skill exists.</strong> This is the step I cared about most. A verify mode checks each repo for an actual <code>SKILL.md</code> and only enables the "Download .md" button when one exists.</li>
                </ul>
                <p className="sl-quote">185 of 772 passed. About one in four.</p>
                {media.hero && (
                    <div className="sb-hero-data sb-inline-data">
                        <VerifiedGrid />
                    </div>
                )}
                <p>That number changed how I designed the product.</p>
            </section>

            <section id="sb-design" className="sl-section">
                <h2>Designing around one in four.</h2>

                <h3>1. Show the gap instead of hiding it</h3>
                <p>I could have published only the 185 verified skills. Instead I kept all 772 and added a <strong>"Has SKILL.md" toggle</strong> to the browse page. Collections and tools are still useful for discovery, but you should know what you're getting before you click. One switch takes you from everything to only what works today.</p>
                <Shot
                    src={media.cards}
                    width="1440"
                    height="900"
                    alt="A grid of Skill Bank cards in dark mode, sorted by stars: ui-ux-pro-max-skill, security-audit-skill, last30days-skill, NVIDIA's SkillSpector and others, each with a category label, description, owner and GitHub link"
                    caption="Every card shows its category as the crawl found it, so a collection reads as a collection before you click."
                />

                <h3>2. Read before you download</h3>
                <p>Each skill has its own page. When a <code>SKILL.md</code> exists, the page fetches it straight from GitHub and renders it in place. You're about to give an agent instructions written by a stranger, so you should be able to read the whole thing first.</p>
                <p>Because that Markdown can come from anywhere on the internet, it's sanitised with DOMPurify before it's rendered. When a repo has no <code>SKILL.md</code>, the preview fails quietly instead of showing a broken state.</p>
                <Shot src={media.detail} alt="A Skill Bank detail page showing a rendered SKILL.md preview" caption="The full SKILL.md, rendered and sanitised, before you download anything." />

                <h3>3. Search that forgives you</h3>
                <p>People remember skills by half a name. Search runs in the browser with Fuse.js, so typos and partial matches still find the right repo. With 772 entries in a single JSON file it's instant, and there's no search backend to pay for.</p>

                <h3>4. Links that don't break</h3>
                <p>The library will keep growing, so detail-page URLs had to stay stable. Slugs are tied to record IDs, which means adding new repos never changes an existing link. When two names collide, the owner is appended (<code>pdf-tools-acme</code>).</p>

                <h3>5. A bit of character</h3>
                <p>The home page illustration is a Hairline figure, an isometric line drawing of an archive that reacts to your pointer. The same visual language shows up in the footer (a stack of sheets) and in the empty search state (an empty tray). They all hold still when reduced motion is requested, and their animation loops pause when they're off-screen. Light and dark themes are supported, and Inter and JetBrains Mono are self-hosted.</p>
                <Shot
                    src={media.empty}
                    width="1152"
                    height="413"
                    alt="The Skill Bank empty search state: a line drawing of an empty tray above the message 'No skills match' and a Clear search and filters button"
                    caption="The empty tray: what you see when a search finds nothing, with one button to start over."
                />
                {media.figure && (
                    <div className="sl-hero-media sb-hero-media">
                        <video
                            src={media.figure}
                            poster={media.figurePoster || undefined}
                            autoPlay={!reduceMotion}
                            controls={reduceMotion}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="The Hairline archive figure turning to follow the cursor"
                        />
                    </div>
                )}
            </section>

            <section id="sb-findings" className="sl-section">
                <h2>The library doubled as research.</h2>
                <p>Putting the library together turned into a small piece of research.</p>
                <CategoryChart />
                <ul className="sl-list">
                    <li><strong>Design is the biggest category.</strong> "AI design skill" alone has 116 repos, and with design tooling and design systems added it's over 170. People clearly want their agents to stop producing the same purple-gradient landing page.</li>
                    <li><strong>Lists are almost as common as skills.</strong> There are 101 awesome lists and collections. Engineering (63) and marketing (39) skills combined beat them by exactly one repo.</li>
                    <li><strong>Security is arriving.</strong> 23 repos scan skills for problems, including NVIDIA's SkillSpector (26.9k stars), and Cloudflare's security-audit-skill has 75.7k. When large companies start shipping tools to inspect skills, it's worth checking what you install.</li>
                    <li><strong>Stars are very lopsided.</strong> The 98 repos that came with star counts add up to roughly 828k stars, but the median is 1,300. A single repo, ui-ux-pro-max-skill, accounts for 152k of them. Most of the good work hasn't been starred yet.</li>
                </ul>
            </section>

            <section id="sb-outcome" className="sl-section">
                <h2>Where it landed.</h2>
                <dl className="sb-stats">
                    <div><dt>Repositories</dt><dd>772</dd></div>
                    <div><dt>Categories</dt><dd>38</dd></div>
                    <div><dt>Verified skills</dt><dd>185</dd></div>
                </dl>
                <ul className="sl-list">
                    <li>A fully static site with no server, deployable to Netlify or Cloudflare Pages.</li>
                    <li>A repeatable update loop: run another <SpidraLink>Spidra</SpidraLink> map, export the CSV, rerun the import, rebuild.</li>
                </ul>
            </section>

            <section id="sb-learned" className="sl-section sl-last">
                <h2>What I'm taking into the next one.</h2>
                <ul className="sl-list">
                    <li><strong>Where the data comes from is part of the product.</strong> Logging the source of every description and keeping the crawl categories as they were makes the library easier to trust and easier to fix.</li>
                    <li><strong>One honest number beats a tidy one.</strong> "185 of 772" is less impressive than "772 skills", but it's the number that made the toggle and the preview page necessary, and those are the features that make the site worth using.</li>
                    <li><strong>Small pipelines are enough.</strong> Three commands, one script and one JSON file cover the whole thing. The complexity went into the data, not the infrastructure.</li>
                </ul>
                <h3>Next</h3>
                <p>587 repos don't have a <code>SKILL.md</code>. My guess is that more of them are worth digging into by hand than I'd like to admit. That's the next crawl.</p>
                {tool.url && (
                    <a className="sl-primary-link" href={tool.url} target="_blank" rel="noopener noreferrer">Browse Skill Bank <ArrowUpRight size={18} aria-hidden="true" /></a>
                )}
            </section>
        </main>
        <Footer />
    </>;
}
