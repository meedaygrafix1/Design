import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ScrollIndicator from '../../components/ScrollIndicator';
import Footer from '../../components/Footer';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';
import '../CaseStudy.css';
import './ScanlightCaseStudy.css';

const sections = [
    { id: 'sl-start', label: 'Where it started' },
    { id: 'sl-idea', label: 'The core idea' },
    { id: 'sl-how', label: 'How it works' },
    { id: 'sl-editor', label: 'Designing the editor' },
    { id: 'sl-landing', label: 'The landing page' },
    { id: 'sl-export', label: 'Getting work out' },
    { id: 'sl-details', label: 'Small details' },
    { id: 'sl-learned', label: 'What I took from it' },
    { id: 'sl-next', label: "What's next" },
];

const brief = [
    ['Instant', 'Every control updates the image in the same frame you move it.'],
    ['Private', 'Images never leave the device. No backend at all.'],
    ['Production-ready output', "Large stills, real vectors, and loops that don't jump when they restart."],
    ['A tool, not a toy', 'The interface of a design app, not of a filter website.'],
];

const effects = [
    ['LED', 'a glowing dot.'],
    ['Halftone', 'an ink dot whose size follows brightness, on a rotated grid like print.'],
    ['Ordered dither', 'a pixel switched on or off against a Bayer threshold pattern.'],
    ['Diffusion', 'a pixel decided by Floyd–Steinberg error diffusion, where each cell passes its rounding error to its neighbours.'],
    ['ASCII', <>a character picked by how much ink it carries (<code>.</code> for dark, <code>@</code> for bright).</>],
    ['CRT', 'a horizontal beam of phosphor that gets thicker where the image is brighter.'],
];

const vocabulary = [
    ['Density', 'how many cells across'],
    ['Mark', 'size, shape, angle'],
    ['Tone', 'brightness, contrast, gamma, black point'],
    ['Colour', "a three-stop palette or the source's own colours"],
];

const editorDecisions = [
    ['Presets are starting points, not filters.', 'Each one (Red Signal, Newsprint, 1-Bit Mac, Pocket, Binary Rain…) just writes values into the same inspector. Click one, then keep adjusting. You can see how every look is made, so presets also teach the tool.'],
    ['Density is resolution-independent.', 'It’s set as “columns across the image”, not pixels. A 90-column LED grid looks the same in the preview, at 4× export, and in the Figma plugin. What you approved is what you get.'],
    ['Before / after is a split handle on the canvas,', 'not a toggle. You drag the line across the image and compare the same detail in both versions.'],
    ['Palettes are three colours: background, mid, highlight.', 'That’s enough to get phosphor green, amber terminal, newsprint or vapour pink, and few enough that anyone can make their own. A “source colour” mode keeps the photo’s own colours and still applies the effect.'],
    ['Phones are first-class.', 'The live preview drops to a lighter resolution on touch devices while exports stay full size. Saving goes through the native share sheet, so a render lands in Photos instead of a downloads folder.'],
];

const details = [
    'If the GPU context is lost (laptop sleeps, too many tabs), the renderer rebuilds itself and re-uploads everything without a reload.',
    'Glyph atlases for ASCII are built once per character set and cached, so switching between Classic, Binary, Blocks and Hex is instant after the first time.',
    'Keyboard shortcuts appear in your platform’s own convention: ⌘ on Mac, Ctrl elsewhere.',
    'Touch detection asks the device what its pointer is. It never guesses from the browser name.',
];

function Pipeline() {
    return (
        <figure className="sl-pipeline" aria-labelledby="sl-pipeline-caption">
            <div className="sl-pipe-flow">
                <div className="sl-pipe-node sl-pipe-node--io">Source image</div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node">
                    <strong>Effect pass</strong>
                    <span>grid → brightness → mark</span>
                    <small>LED · halftone · dither · ASCII · CRT</small>
                </div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node">
                    <strong>Composite</strong>
                    <span>glow + scanlines + noise + vignette + chromatic aberration + barrel curvature</span>
                </div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node sl-pipe-node--io">Screen / export</div>
            </div>
            <div className="sl-pipe-branch">
                <span className="sl-pipe-branch-label">Glow branch</span>
                <div className="sl-pipe-node sl-pipe-node--branch">
                    <strong>Bright pass</strong>
                    <span>keep what stands out</span>
                </div>
                <span className="sl-pipe-arrow" aria-hidden="true" />
                <div className="sl-pipe-node sl-pipe-node--branch">
                    <strong>Blur × 2</strong>
                    <span>two radii, only the lit parts bleed</span>
                </div>
                <span className="sl-pipe-branch-note">feeds the composite</span>
            </div>
            <figcaption id="sl-pipeline-caption">Each frame runs through three GPU stages. The glow branches off the effect pass and rejoins at the composite.</figcaption>
        </figure>
    );
}

export default function ScanlightCaseStudy({ tool }) {
    const reduceMotion = useReducedMotionPreference();

    return <>
        <Helmet>
            <title>Scanlight: Turning any image into light | Ayanfe Olamide Balogun</title>
            <meta name="description" content={tool.description} />
            <link rel="canonical" href="https://www.meedaydesign.xyz/tools/scanlight" />
            <meta property="og:title" content="Scanlight: Turning any image into light" />
            <meta property="og:description" content={tool.description} />
            <meta property="og:image" content="https://www.meedaydesign.xyz/scanlight/og.jpg" />
        </Helmet>
        <main className="case-study-page sl-page container">
            <ScrollIndicator sections={sections} />
            <header className="case-study-header">
                <Link to="/tools" className="case-study-back"><ArrowLeft size={16} aria-hidden="true" /> All tools</Link>
                <div className="case-study-title-row">
                    <p className="case-study-eyebrow">Scanlight / Tool case study</p>
                    <span className="case-study-tag">Web app · Figma plugin</span>
                </div>
                <h1>Turning any image<br /><em>into light.</em></h1>
                <p className="case-study-description">
                    A browser tool that turns a photo into a dithered, LED-matrix, halftone, ASCII or CRT image, still or looping.
                    It runs entirely on your device. No account, no upload, no server.
                </p>
                {tool.url && (
                    <a className="sl-text-link" href={tool.url} target="_blank" rel="noopener noreferrer">Open Scanlight <ArrowUpRight size={17} aria-hidden="true" /></a>
                )}
                <div className="sl-hero-media">
                    <video
                        src="/scanlight/demo.mp4"
                        poster="/scanlight/demo-poster.webp"
                        autoPlay={!reduceMotion}
                        controls={reduceMotion}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label="Scanlight demo: images turned into halftone, dither and LED looks"
                    />
                </div>
                <dl className="sl-metadata">
                    <div><dt>Role</dt><dd>Design and build, end to end</dd></div>
                    <div><dt>Stack</dt><dd>React, TypeScript, WebGL2, Vite</dd></div>
                    <div><dt>Shaders</dt><dd>Hand-written GLSL</dd></div>
                    <div><dt>Also ships as</dt><dd>A Figma plugin, same engine</dd></div>
                </dl>
            </header>

            <section id="sl-start" className="sl-section sl-split">
                <p className="case-study-eyebrow">01 / Where it started</p>
                <div>
                    <h2>I wanted texture.<br />Getting it was annoying.</h2>
                    <p>I kept wanting backgrounds with texture: a portrait as a wall of glowing LEDs, a product shot as newsprint halftone, a logo as falling binary. The look is everywhere right now, on posters, album covers, launch pages.</p>
                    <p>The options were a Photoshop action chain, a half-finished web demo that exported a 600px JPEG, or writing a shader from scratch every time. None of them let me <em>play</em>: move a slider and watch the image change at full speed, try six looks in a minute, then take the result straight into a design file.</p>
                    <p>So the brief I gave myself was short:</p>
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

            <section id="sl-idea" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">02 / The core idea</p>
                    <h2>Cut the image into a grid, measure each cell, redraw it as a mark.</h2>
                    <p>Every effect in Scanlight is that same move. Only the mark changes.</p>
                </div>
                <ul className="sl-effects">
                    {effects.map(([name, mark]) => (
                        <li key={name}><strong>{name}</strong><p>The mark is {mark}</p></li>
                    ))}
                </ul>
                <div className="sl-callout">
                    <p className="case-study-eyebrow">One pipeline, one vocabulary</p>
                    <p className="sl-callout-text">Once I saw it this way, the design got much simpler. There aren’t six tools glued together. A setting you learn in one effect means the same thing in the next.</p>
                    <dl className="sl-vocab">
                        {vocabulary.map(([term, def]) => <div key={term}><dt>{term}</dt><dd>{def}</dd></div>)}
                    </dl>
                </div>
            </section>

            <section id="sl-how" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">03 / How it works</p>
                    <h2>Three passes on the GPU,<br />one on the CPU.</h2>
                </div>

                <div className="sl-steps">
                    <div className="sl-step">
                        <h3><span>3.1</span> Loading</h3>
                        <p>The image is decoded in the browser, rotated according to its EXIF orientation, capped at 2048px on the long side, and flattened onto black so transparent PNGs behave. That’s the only preparation. Nothing is sent anywhere.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.2</span> The render pipeline</h3>
                        <Pipeline />
                        <p><strong>The effect pass</strong> does the real work. For each pixel on screen, the shader works out which cell it belongs to, samples the source at that cell’s centre, and draws the mark. Sampling uses mipmaps picked to match the cell size, so a cell averages the area it covers rather than grabbing one random pixel. That one detail is the difference between a clean dither and a noisy one.</p>
                        <p><strong>The glow</strong> comes from a separate bright pass: it keeps only the parts of the image that stand out from the background, blurs them twice at two radii, and adds them back. Glow follows the light, so dark areas stay dark.</p>
                        <p><strong>The composite</strong> adds the “display” layer: scanlines, film noise, vignette, RGB channel offset, and a barrel distortion that bends the corners in like an old tube. The distortion is normalised so the middle of each edge stays put, which means turning it up never crops your subject.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.3</span> The one effect that can’t live on the GPU</h3>
                        <p>Error diffusion is sequential by nature. Each cell’s result depends on the error passed from the cells before it, so it can’t be computed in parallel. Scanlight runs it on the CPU instead.</p>
                        <p>It scans in a serpentine pattern (left to right, then right to left), which avoids the diagonal “worm” artifacts a plain scan leaves. It caches the result by the settings that actually change it, then uploads it to the GPU as a small texture. Change the glow and nothing gets recomputed. Change the contrast and it does.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.4</span> Motion that loops properly</h3>
                        <p>The animations are flicker, scan, pulse, wave, rain and glitch. They all follow one rule:</p>
                        <blockquote className="sl-rule">Motion is a function of the loop’s phase (0 → 1), and everything completes a whole number of cycles.</blockquote>
                        <p>Nothing keeps a running clock. Frame 0 and frame N are mathematically identical, so an exported loop never shows a seam, whether it plays for four seconds or four hours.</p>
                        <p>This also means the playhead can be scrubbed. Every frame can be rebuilt on demand, so you can stop on the exact moment you want and export it as a still.</p>
                    </div>
                </div>
            </section>

            <section id="sl-editor" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">04 / Designing the editor</p>
                    <h2>Presets left, canvas centre,<br />inspector right.</h2>
                    <p>I modelled the layout on the design tools people already know. People who open Scanlight already live in Figma. They shouldn’t have to learn where things are.</p>
                </div>
                <figure className="sl-shot">
                    <img src="/scanlight/editor.webp" alt="The Scanlight editor: preset thumbnails on the left, a shield icon rendered as red LEDs in the centre, and tone, colour, glow and motion controls on the right" width="1440" height="900" loading="lazy" decoding="async" />
                    <figcaption>The Red Signal preset applied to a sample image. Every value it set is visible, and editable, in the inspector.</figcaption>
                </figure>
                <ul className="sl-decisions">
                    {editorDecisions.map(([lead, body]) => <li key={lead}><h3>{lead}</h3><p>{body}</p></li>)}
                </ul>
            </section>

            <section id="sl-landing" className="sl-section sl-split">
                <p className="case-study-eyebrow">05 / The landing page</p>
                <div>
                    <h2>The landing page<br />is the product.</h2>
                    <p>My first landing page was a headline, a glowing card and a feature list. It looked like every other AI-made launch page, so I threw it out.</p>
                    <p>The replacement is built on one idea: <strong>nothing on the page is a picture.</strong> The giant wordmark is rendered live by the same engine the editor uses. Your cursor acts as a light moving across it. The effect list down the side isn’t a menu of features: hovering a row re-renders the whole page in that effect. Before you’ve uploaded anything, you’ve already used the tool.</p>
                    <p>The rest stays out of the way: a strict grid, mono labels, hairline rules. Drop an image anywhere, paste it, or pick a sample if you don’t have one to hand.</p>
                </div>
            </section>

            <section id="sl-export" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">06 / Getting work out</p>
                    <h2>A texture tool is only as good<br />as what you can take away.</h2>
                    <p>So export got as much care as the canvas.</p>
                </div>
                <div className="sl-export-grid">
                    <div><p className="case-study-eyebrow">Images</p><p>PNG, JPG or WebP at 1× to 4× scale.</p></div>
                    <div><p className="case-study-eyebrow">Video</p><p>MP4, encoded frame by frame with the browser’s WebCodecs encoder, so the loop is exact and doesn’t depend on screen recording. WebM is the fallback where that encoder isn’t available.</p></div>
                    <div><p className="case-study-eyebrow">SVG</p><p>LED, Halftone, Ordered, Diffusion and ASCII export as real vector shapes, rebuilt on the CPU with the same maths as the shaders, so the vector matches the preview. Glow becomes an SVG blur filter. If a file gets heavy, the dialog says so and suggests lowering the density.</p></div>
                </div>
                <div className="sl-callout">
                    <p className="case-study-eyebrow">…and straight into Figma</p>
                    <p className="sl-callout-body">The Figma plugin runs the same engine and inspector inside Figma. Select a shape, pick a look, and apply it as a <strong>fill</strong>, a <strong>new layer</strong>, or <strong>editable vectors</strong>. Each result keeps its original pixels and its settings, so selecting it later reopens it exactly as you left it, and applying again updates it in place instead of stacking copies. <strong>Restore original</strong> brings back the untouched image.</p>
                </div>
            </section>

            <section id="sl-details" className="sl-section sl-split">
                <p className="case-study-eyebrow">07 / Small details</p>
                <div>
                    <h2>Details most people<br />won’t notice.</h2>
                    <ul className="sl-detail-list">
                        {details.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                </div>
            </section>

            <section id="sl-learned" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">08 / What I took from it</p>
                    <h2>Three things I’d bring to the next tool.</h2>
                </div>
                <div className="sl-lessons">
                    <div><h3>Find the one abstraction and the UI follows.</h3><p>“Grid, brightness, mark” turned six effects into one set of controls. Most of the interface design was done the moment the model was clear.</p></div>
                    <div><h3>Constraints are features.</h3><p>Running on-device was a privacy choice first, but it also made the tool instant, free to run, and easy to trust.</p></div>
                    <div><h3>Make the output the hero.</h3><p>The best marketing for a rendering tool is letting people see it render, so the landing page does exactly that and nothing else.</p></div>
                </div>
            </section>

            <section id="sl-next" className="sl-section sl-split sl-last">
                <p className="case-study-eyebrow">09 / What’s next</p>
                <div>
                    <h2>Where it goes from here.</h2>
                    <ul className="sl-detail-list">
                        <li>GIF export, and motion exported into Figma as video fills</li>
                        <li>Stacking effects as layers</li>
                        <li>Saving your own presets</li>
                        <li>A multi-image board for applying one look to a whole set and exporting it as a ZIP (built, currently switched off while the single-image flow gets polished)</li>
                    </ul>
                    {tool.url && (
                        <a className="sl-primary-link" href={tool.url} target="_blank" rel="noopener noreferrer">Try Scanlight <ArrowUpRight size={18} aria-hidden="true" /></a>
                    )}
                </div>
            </section>
        </main>
        <Footer />
    </>;
}
