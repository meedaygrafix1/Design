import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ScrollIndicator from '../../components/ScrollIndicator';
import Footer from '../../components/Footer';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';
import '../CaseStudy.css';
import './ScanlightCaseStudy.css';

const sections = [
    { id: 'sl-start', label: 'Why I built it' },
    { id: 'sl-idea', label: 'The idea that clicked' },
    { id: 'sl-how', label: 'Under the hood' },
    { id: 'sl-editor', label: 'The editor' },
    { id: 'sl-landing', label: 'The landing page' },
    { id: 'sl-export', label: 'Getting work out' },
    { id: 'sl-details', label: 'Small stuff' },
    { id: 'sl-learned', label: 'What I learned' },
    { id: 'sl-next', label: "What's next" },
];

const brief = [
    ['Instant', 'If I move a slider, the image changes in that same frame. No waiting.'],
    ['Private', "Images stay on the device. I didn't want a server at all."],
    ['Good enough to ship', "Big stills, real vectors, and video loops that don't jump when they restart."],
    ['A tool, not a toy', 'It should feel like a design app, not one of those filter websites.'],
];

const effects = [
    ['LED', 'a glowing dot.'],
    ['Halftone', 'an ink dot that grows with brightness, on a tilted grid like real print.'],
    ['Ordered dither', "a pixel that's either on or off, checked against a Bayer pattern."],
    ['Diffusion', 'a pixel decided by Floyd–Steinberg, where each cell hands its rounding error to its neighbours.'],
    ['ASCII', <>a character, picked by how much ink it has. <code>.</code> for dark, <code>@</code> for bright.</>],
    ['CRT', 'a line of phosphor that gets thicker where the image is brighter.'],
];

const vocabulary = [
    ['Density', 'how many cells across'],
    ['Mark', 'size, shape and angle'],
    ['Tone', 'brightness, contrast, gamma, black point'],
    ['Colour', "a three-colour palette, or the photo's own colours"],
];

const editorDecisions = [
    ['Presets are just a starting point.', "Red Signal, Newsprint, 1-Bit Mac, Pocket, Binary Rain and the rest only fill in the inspector. Click one and keep tweaking. Since you can see exactly how each look is built, the presets end up teaching you the tool as well."],
    ['Density is counted in columns, not pixels.', 'A 90-column LED grid looks the same in the preview, in a 4× export and in the Figma plugin. What you approve is what you get.'],
    ['Before and after is a handle you drag.', "It's a split line on the canvas, not a toggle. You slide it across the image and compare the same detail in both versions."],
    ['Palettes have three colours.', "Background, mid and highlight. That's enough for phosphor green, amber terminal, newsprint or vapour pink, and simple enough that anyone can make their own. If you'd rather keep the photo's colours, there's a source colour mode that still applies the effect."],
    ['Phones count too.', 'On touch devices the live preview drops to a lighter resolution, but exports stay full size. Saving goes through the share sheet, so your render lands in Photos instead of getting lost in a downloads folder.'],
];

const details = [
    "If the GPU context gets lost (your laptop sleeps, or you've got too many tabs open), the renderer rebuilds itself and reloads everything. No page refresh.",
    'The ASCII glyph atlases get built once per character set and cached. After the first time, switching between Classic, Binary, Blocks and Hex is instant.',
    'Shortcuts show up the way your platform writes them. ⌘ on Mac, Ctrl everywhere else.',
    "To tell if you're on a touch device, it asks the device what kind of pointer it has. It never guesses from the browser name.",
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
                    <span>two sizes, only the lit parts bleed</span>
                </div>
                <span className="sl-pipe-branch-note">joins the composite</span>
            </div>
            <figcaption id="sl-pipeline-caption">Every frame goes through three passes on the GPU. The glow splits off after the effect pass and joins back in at the end.</figcaption>
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
                    I built a browser tool that turns photos into LED walls, halftone print, dither, ASCII and old CRT screens,
                    still or looping. It all runs on your own device, so nothing gets uploaded anywhere.
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
                <p className="case-study-eyebrow">01 / Why I built it</p>
                <div>
                    <h2>I just wanted a<br />textured background.</h2>
                    <p>That's honestly how this started. I kept wanting images with texture on them. A portrait as a wall of glowing LEDs. A product shot that looked like it came out of a newspaper. A logo made of falling binary. You see this look everywhere now, on posters, album covers and launch pages.</p>
                    <p>Getting it was the annoying part. I could chain a bunch of Photoshop actions together, use some half-finished web demo that handed me a 600px JPEG, or write a shader from scratch every single time. None of those let me actually play. I wanted to drag a slider and see the image change right away, try six looks in a minute, then drop the one I liked straight into Figma.</p>
                    <p>So before I wrote any code, I gave myself a short brief.</p>
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
                    <p className="case-study-eyebrow">02 / The idea that clicked</p>
                    <h2>Every effect turned out to be the same thing.</h2>
                    <p>For a while I thought I was building six separate effects. Then I noticed they all do one thing. You cut the image into a grid, check how bright each cell is, and redraw that cell as some kind of mark. The only part that changes is the mark.</p>
                </div>
                <ul className="sl-effects">
                    {effects.map(([name, mark]) => (
                        <li key={name}><strong>{name}</strong><p>The mark is {mark}</p></li>
                    ))}
                </ul>
                <div className="sl-callout">
                    <p className="case-study-eyebrow">Why that mattered</p>
                    <p className="sl-callout-text">Once I saw it, the design got a lot simpler. I wasn't gluing six tools together anymore. I had one pipeline and one set of controls, and they mean the same thing in every effect.</p>
                    <dl className="sl-vocab">
                        {vocabulary.map(([term, def]) => <div key={term}><dt>{term}</dt><dd>{def}</dd></div>)}
                    </dl>
                </div>
            </section>

            <section id="sl-how" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">03 / Under the hood</p>
                    <h2>Most of it runs on the GPU.<br />One part refused to.</h2>
                </div>

                <div className="sl-steps">
                    <div className="sl-step">
                        <h3><span>3.1</span> Getting the image in</h3>
                        <p>When you drop an image in, the browser decodes it, fixes the rotation using the photo's EXIF data, shrinks it to 2048px on the long side if it's bigger, and puts it on black so transparent PNGs don't act weird. That's all the prep. Nothing leaves your device.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.2</span> Three passes, every frame</h3>
                        <Pipeline />
                        <p>The effect pass is where the real work happens. For every pixel on screen, the shader works out which cell it's in, reads the image at the middle of that cell, and draws the mark. One small detail made a big difference here. I read the image from a mipmap that matches the cell size, so each cell gets the average of the area it covers instead of one random pixel. Skip that and the dither comes out noisy. Keep it and it's clean.</p>
                        <p>Glow gets its own pass. It keeps only the parts of the image that stand out, blurs them twice at two different sizes, and adds them back on top. So the glow follows the light, and the dark areas stay dark.</p>
                        <p>The last pass is what makes it feel like a screen: scanlines, film grain, a vignette, a bit of RGB split, and a barrel bend that curves the corners in like an old TV. I set the bend up so the middle of each edge never moves. Turn it all the way up and it still won't crop your subject.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.3</span> The effect that wouldn't go on the GPU</h3>
                        <p>Error diffusion was the awkward one. Each cell depends on the error passed down from the cells before it, so you can't work them all out at the same time, and doing things at the same time is the whole point of a GPU. That one runs on the CPU instead.</p>
                        <p>It scans back and forth (left to right, then right to left), because a plain scan leaves these diagonal, worm-like lines across the image. The result is cached against only the settings that change it, then sent to the GPU as a small texture. Change the glow and nothing gets recalculated. Change the contrast and it does.</p>
                    </div>

                    <div className="sl-step">
                        <h3><span>3.4</span> Loops without a seam</h3>
                        <p>There are six animations: flicker, scan, pulse, wave, rain and glitch. I gave all of them one rule.</p>
                        <blockquote className="sl-rule">Motion only depends on where you are in the loop, from 0 to 1, and everything finishes a whole number of cycles.</blockquote>
                        <p>There's no clock ticking away in the background. The first frame and the last frame are exactly the same, so an exported loop never jumps, whether it plays for four seconds or four hours.</p>
                        <p>I got a nice bonus out of that too. You can scrub the playhead, because any frame can be rebuilt on demand. Stop on the exact moment you like and save it as a still.</p>
                    </div>
                </div>
            </section>

            <section id="sl-editor" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">04 / The editor</p>
                    <h2>I copied the layout<br />people already know.</h2>
                    <p>Presets on the left, canvas in the middle, inspector on the right. The people I built this for already spend their day in Figma. I didn't see any reason to make them learn where things live.</p>
                </div>
                <figure className="sl-shot">
                    <img src="/scanlight/editor.webp" alt="The Scanlight editor: preset thumbnails on the left, a shield icon rendered as red LEDs in the centre, and tone, colour, glow and motion controls on the right" width="1440" height="900" loading="lazy" decoding="async" />
                    <figcaption>The Red Signal preset on a sample image. Every value it set is right there in the inspector, and you can change any of them.</figcaption>
                </figure>
                <ul className="sl-decisions">
                    {editorDecisions.map(([lead, body]) => <li key={lead}><h3>{lead}</h3><p>{body}</p></li>)}
                </ul>
            </section>

            <section id="sl-landing" className="sl-section sl-split">
                <p className="case-study-eyebrow">05 / The landing page</p>
                <div>
                    <h2>I threw out my<br />first landing page.</h2>
                    <p>The first version was a headline, a glowing card and a list of features. It looked like every other AI-made launch page out there, and I couldn't stand it. So I binned it.</p>
                    <p>The new one runs on one idea: nothing on the page is a picture. The big wordmark is rendered live by the same engine as the editor, and your cursor works like a light moving across it. The list of effects down the side isn't a feature list either. Hover a row and the whole page re-renders in that effect. By the time you upload anything, you've already used the tool.</p>
                    <p>Everything else stays quiet. A strict grid, mono labels, thin lines. Drop an image anywhere, paste one, or grab a sample if you don't have one handy.</p>
                </div>
            </section>

            <section id="sl-export" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">06 / Getting work out</p>
                    <h2>A texture tool is only as good as what you can take away from it.</h2>
                    <p>So I spent about as much time on export as I did on the canvas.</p>
                </div>
                <div className="sl-export-grid">
                    <div><p className="case-study-eyebrow">Images</p><p>PNG, JPG or WebP, anywhere from 1× to 4×.</p></div>
                    <div><p className="case-study-eyebrow">Video</p><p>MP4, encoded frame by frame with the browser's own WebCodecs encoder. That way the loop is exact and doesn't depend on screen recording. Browsers without that encoder get WebM instead.</p></div>
                    <div><p className="case-study-eyebrow">SVG</p><p>LED, Halftone, Ordered, Diffusion and ASCII all export as real vector shapes. They're rebuilt on the CPU with the same maths as the shaders, so the SVG matches what you saw. Glow turns into an SVG blur filter. And if a file starts getting heavy, the export dialog tells you and suggests lowering the density.</p></div>
                </div>
                <div className="sl-callout">
                    <p className="case-study-eyebrow">And straight into Figma</p>
                    <p className="sl-callout-body">I also built a Figma plugin that runs the same engine and inspector. Select a shape, pick a look, and apply it as a fill, a new layer or editable vectors. Each result remembers its original pixels and settings, so when you select it later it opens exactly how you left it. Apply again and it updates in place instead of stacking copies on top of each other. Changed your mind? Restore original brings back the untouched image.</p>
                </div>
            </section>

            <section id="sl-details" className="sl-section sl-split">
                <p className="case-study-eyebrow">07 / Small stuff</p>
                <div>
                    <h2>Things you'll probably<br />never notice.</h2>
                    <p>Some of my favourite bits of this project are the ones you'd only spot if they broke.</p>
                    <ul className="sl-detail-list">
                        {details.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                </div>
            </section>

            <section id="sl-learned" className="sl-section">
                <div className="sl-heading">
                    <p className="case-study-eyebrow">08 / What I learned</p>
                    <h2>What I'm taking into the next one.</h2>
                </div>
                <div className="sl-lessons">
                    <div><h3>Find the one idea and the UI follows.</h3><p>Once I had "grid, brightness, mark", six effects became one set of controls. Most of the interface was pretty much designed the moment that clicked.</p></div>
                    <div><h3>Constraints can turn into features.</h3><p>I kept everything on the device for privacy. That same choice made it instant, free to run, and easy to trust.</p></div>
                    <div><h3>Let the output do the selling.</h3><p>The best way to market a rendering tool is to let people watch it render. That's all the landing page does.</p></div>
                </div>
            </section>

            <section id="sl-next" className="sl-section sl-split sl-last">
                <p className="case-study-eyebrow">09 / What's next</p>
                <div>
                    <h2>It's not done yet.</h2>
                    <p>A few things I still want to add:</p>
                    <ul className="sl-detail-list">
                        <li>GIF export, and sending motion into Figma as video fills</li>
                        <li>Stacking effects as layers</li>
                        <li>Saving your own presets</li>
                        <li>A board for putting one look on a whole batch of images and exporting them as a ZIP. I've actually built this one already. It's switched off while I polish the single-image flow.</li>
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
