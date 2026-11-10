import { useEffect, useMemo, useRef, useState } from 'react';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';
import './AppShowcase.css';

// Timings (ms) for the scripted walkthrough
const DWELL = 1300;        // time to "read" a screen after it arrives
const PAN = 750;           // camera glide to bring an off-frame button into view
const TAP = 650;           // finger press + ripple
const BETWEEN_TAPS = 250;
const TRANSITION = 700;    // screen-to-screen animation
const CURSOR_GLIDE = 750;  // desktop pointer travel time
const KEY = 120;           // per character when typing

// Taps must land inside this part of the card, or the device pans to bring them in
const SAFE = { left: 0.14, right: 0.86, top: 0.14, bottom: 0.82 };

// Small deterministic hash so each card gets its own, stable rhythm
const hash = (str) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    return h >>> 0;
};

// Per-card variation so neighbouring cards never move in lockstep.
// Each value comes from its own hash, so cards differ on every axis.
const rhythmFor = (seedSource) => {
    const pick = (field, n) => hash(`${seedSource}#${field}`) % n;
    const directions = [[-1.5, -1], [1.5, -1], [-1, 1.2], [1.2, 1], [0, -1.6], [-1.8, 0]];
    const [dx, dy] = directions[pick('dir', directions.length)];
    const baseDwell = DWELL - 300 + pick('dwell', 9) * 90; // 1.0s – 1.72s on each screen
    return {
        startDelay: 200 + pick('start', 12) * 180,        // 0.2s – 2.2s before the first tap
        // Slightly different pause on every screen, so cards drift further apart each loop
        dwellFor: (index) => baseDwell + (hash(`${seedSource}#step${index}`) % 7) * 60 - 180,
        drift: {
            '--drift-x': `${dx}%`,
            '--drift-y': `${dy}%`,
            '--drift-scale': (1.09 + pick('scale', 5) * 0.012).toFixed(3),
            '--drift-duration': `${20 + pick('dur', 7) * 2.5}s`,
            '--drift-delay': `-${pick('delay', 24)}s`,
        },
    };
};

const sleep = (ms, signal) => new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => { clearTimeout(id); reject(new Error('aborted')); }, { once: true });
});

/**
 * A zoomed-in device over a nature backdrop, playing a scripted user flow:
 * a finger (phone) or cursor (browser) taps real buttons, types into fields,
 * and the app responds with the matching transition.
 *
 * showcase: {
 *   backdrop: string,
 *   device?: 'phone' | 'browser',
 *   aspect?: string,   // browser screen ratio, e.g. "1585 / 952" (defaults to 1536 / 1160)
 *   url?: string,      // browser address bar text
 *   island?: boolean,  // draw a Dynamic Island (turn off when the screens already include one)
 *   flow: [{
 *     screen: string,
 *     taps?: ([x%, y%] | 'type')[],   // 'type' runs this step's typing at that point
 *     type?: { at: [x, y, w, h], chars: number, bg: string, caret?: boolean }
 *          | { keys: [x, y, w, h][], bg: string },
 *     then?: 'push' | 'pop' | 'modal' | 'shutter' | 'fade' | 'tab',
 *   }]
 * }
 * `then` is how this step moves on to the next one (the last step loops to the first).
 * A plain `screens` array also works and becomes a simple push sequence.
 */
export default function AppShowcase({ backdrop, device = 'phone', aspect, url, island = true, flow, screens = [] }) {
    const reduceMotion = useReducedMotionPreference();
    const rootRef = useRef(null);
    const deviceRef = useRef(null);
    const pausedRef = useRef(false);
    const stepRef = useRef(0);
    const [visible, setVisible] = useState(false);
    const [seen, setSeen] = useState(false);
    const [nav, setNav] = useState({ current: 0, previous: null, transition: null, key: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [tap, setTap] = useState(null);
    const [typing, setTyping] = useState({ phase: 'hidden', count: 0 });
    const [cursor, setCursor] = useState({ x: 62, y: 72, clicking: false });

    const steps = useMemo(
        () => flow || screens.map((screen) => ({ screen, then: 'push' })),
        [flow, screens],
    );
    const isBrowser = device === 'browser';
    const animate = !reduceMotion && steps.length > 1;
    const rhythm = useMemo(() => rhythmFor(`${backdrop}|${steps[0]?.screen}`), [backdrop, steps]);

    useEffect(() => {
        const node = rootRef.current;
        if (!node || typeof IntersectionObserver === 'undefined') {
            setSeen(true);
            return undefined;
        }
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
            if (entry.isIntersecting) setSeen(true);
        }, { threshold: 0.2 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Preload every screen so transitions never show a blank frame
    useEffect(() => {
        if (!visible) return;
        steps.forEach(({ screen }) => { new Image().src = screen; });
    }, [visible, steps]);

    // Hover: subtle parallax depth, and pause the flow so the screen can be read
    useEffect(() => {
        const node = rootRef.current;
        if (!node || reduceMotion) return undefined;
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const move = (e) => {
            const r = node.getBoundingClientRect();
            node.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
            node.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        };
        const enter = () => { pausedRef.current = true; };
        const leave = () => {
            pausedRef.current = false;
            node.style.setProperty('--px', 0);
            node.style.setProperty('--py', 0);
        };
        if (finePointer) node.addEventListener('mousemove', move);
        node.addEventListener('mouseenter', enter);
        node.addEventListener('mouseleave', leave);
        return () => {
            node.removeEventListener('mousemove', move);
            node.removeEventListener('mouseenter', enter);
            node.removeEventListener('mouseleave', leave);
        };
    }, [reduceMotion]);

    useEffect(() => {
        if (!animate || !visible) return undefined;
        const controller = new AbortController();
        const { signal } = controller;

        // Wait, then hold for as long as the visitor is hovering
        const wait = async (ms) => {
            await sleep(ms, signal);
            while (pausedRef.current) await sleep(150, signal);
        };

        // How far the device must move so the tap point sits inside the safe area
        const offsetFor = (x, y) => {
            const root = rootRef.current;
            const el = deviceRef.current;
            const screenEl = el.querySelector('.app-showcase-screen');
            const W = root.clientWidth;
            const H = root.clientHeight;
            const px = el.offsetLeft + screenEl.offsetLeft + (x / 100) * screenEl.offsetWidth;
            const py = el.offsetTop + screenEl.offsetTop + (y / 100) * screenEl.offsetHeight;
            const shift = (p, size, lo, hi) => (p < size * lo ? size * lo - p : p > size * hi ? size * hi - p : 0);
            return { x: shift(px, W, SAFE.left, SAFE.right), y: shift(py, H, SAFE.top, SAFE.bottom) };
        };

        (async () => {
            let current = { x: 0, y: 0 };
            let first = true;
            const panTo = async (next) => {
                if (Math.abs(next.x - current.x) < 1 && Math.abs(next.y - current.y) < 1) return;
                current = next;
                setOffset(next);
                await wait(PAN);
            };

            const press = async (x, y, id) => {
                await panTo(offsetFor(x, y));
                if (isBrowser) {
                    setCursor({ x, y, clicking: false });
                    await wait(CURSOR_GLIDE);
                    setCursor({ x, y, clicking: true });
                }
                setTap({ x, y, key: id });
                await sleep(140, signal);
                if (isBrowser) setCursor({ x, y, clicking: false });
                await wait(TAP - 140);
            };

            const type = async (spec) => {
                if (!spec) return;
                if (spec.keys) {
                    for (let k = 1; k <= spec.keys.length; k += 1) {
                        await wait(260);
                        setTyping({ phase: 'typing', count: k });
                    }
                    await wait(300);
                } else {
                    setTyping({ phase: 'typing', count: 0 });
                    await wait(spec.chars * KEY + 250);
                    setTyping({ phase: 'done', count: 0 });
                }
            };

            for (;;) {
                const index = stepRef.current;
                const step = steps[index];
                const dwell = rhythm.dwellFor(index);
                await wait(first ? rhythm.startDelay + dwell : dwell);
                first = false;

                for (const [i, action] of (step.taps || []).entries()) {
                    if (i > 0) await wait(BETWEEN_TAPS);
                    if (action === 'type') await type(step.type);
                    else await press(action[0], action[1], `${index}-${i}-${Date.now()}`);
                }

                const next = (index + 1) % steps.length;
                stepRef.current = next;
                current = { x: 0, y: 0 };
                setTap(null);
                setOffset(current);
                setTyping({ phase: 'hidden', count: 0 });
                setNav((n) => ({ current: next, previous: index, transition: step.then || 'push', key: n.key + 1 }));
                await wait(TRANSITION);
            }
        })().catch(() => {});

        return () => controller.abort();
    }, [animate, visible, steps, rhythm, isBrowser]);

    const { current, previous, transition, key } = nav;
    const typeSpec = animate ? steps[current].type : null;

    const classes = [
        'app-showcase',
        animate && visible ? 'is-playing' : '',
        !reduceMotion && visible ? 'is-live' : '',
        seen || reduceMotion ? 'is-in' : '',
    ].filter(Boolean).join(' ');

    return (
        <div ref={rootRef} className={classes} style={rhythm.drift}>
            <div className="app-showcase-scene">
                <img className="app-showcase-backdrop" src={backdrop} alt="" loading="lazy" />
            </div>
            <div className="app-showcase-grain" />
            <div className="app-showcase-shade" />

            <div className="app-showcase-rig">
                <div
                    ref={deviceRef}
                    className={`app-showcase-device is-${device}${steps.length === 1 ? ' is-static' : ''}`}
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, '--screen-aspect': aspect }}
                >
                    {isBrowser && <BrowserBar url={url} />}
                    <div className="app-showcase-screen">
                        {previous !== null && (
                            <div key={`out-${key}`} className={`layer exit-${transition}`}>
                                <img src={steps[previous].screen} alt="" />
                            </div>
                        )}
                        {/* Typing masks live inside the entering layer so they slide with the screen */}
                        <div key={`in-${key}`} className={`layer${transition ? ` enter-${transition}` : ''}`}>
                            <img src={steps[current].screen} alt="" loading="lazy" />
                            {typeSpec?.at && (
                                <TypeMask
                                    rect={typeSpec.at}
                                    bg={typeSpec.bg}
                                    chars={typeSpec.chars}
                                    caret={typeSpec.caret && typing.phase !== 'hidden'}
                                    phase={typing.phase}
                                />
                            )}
                            {typeSpec?.keys && typeSpec.keys.slice(typing.count).map((rect) => (
                                <TypeMask key={rect.join()} rect={rect} bg={typeSpec.bg} phase="hidden" />
                            ))}
                        </div>

                        {transition === 'shutter' && <span key={`flash-${key}`} className="app-showcase-flash" />}
                        {tap && (
                            <>
                                <span key={`press-${tap.key}`} className="app-showcase-press" style={{ left: `${tap.x}%`, top: `${tap.y}%` }} />
                                <span key={tap.key} className="app-showcase-tap" style={{ left: `${tap.x}%`, top: `${tap.y}%` }} />
                            </>
                        )}
                        {isBrowser && animate && (
                            <span
                                className={`app-showcase-cursor${cursor.clicking ? ' is-clicking' : ''}`}
                                style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
                            >
                                <PointerIcon />
                            </span>
                        )}
                        {!isBrowser && island && <span className="app-showcase-island" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypeMask({ rect, bg, chars = 1, caret = false, phase }) {
    const [x, y, w, h] = rect;
    const state = phase === 'typing' ? ' is-typing' : phase === 'done' ? ' is-typed' : '';
    return (
        <span
            className={`app-showcase-type${state}`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${w}%`,
                height: `${h}%`,
                '--type-bg': bg,
                '--type-chars': chars,
                '--type-ms': `${chars * KEY}ms`,
            }}
        >
            <span className="app-showcase-type-mask" />
            {caret && <span className="app-showcase-caret" />}
        </span>
    );
}

function BrowserBar({ url }) {
    return (
        <div className="app-showcase-bar">
            <div className="app-showcase-bar-left">
                <span className="app-showcase-lights"><span /><span /><span /></span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3 5 8l5 5" />
                </svg>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                    <path d="m6 3 5 5-5 5" />
                </svg>
            </div>
            <div className="app-showcase-url">
                <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1.5a3 3 0 0 0-3 3v2h-.5A1.5 1.5 0 0 0 3 8v5a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13V8a1.5 1.5 0 0 0-1.5-1.5H11v-2a3 3 0 0 0-3-3Zm-1.7 5v-2a1.7 1.7 0 0 1 3.4 0v2Z" />
                </svg>
                <span>{url}</span>
            </div>
            <span />
        </div>
    );
}

function PointerIcon() {
    return (
        <svg viewBox="0 0 20 28">
            <path d="M2 1.5v21.2l5.4-5.2 3.6 8.3 3.4-1.5-3.5-8.1h7.4L2 1.5Z" fill="#111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    );
}
