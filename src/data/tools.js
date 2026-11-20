import { lazy } from 'react';

/*
 * Tools registry.
 *
 * Two kinds of entry:
 *   - Embedded tool: set `component`. It runs inside a standard tool page (keep them in src/tools/).
 *   - Case study: set `page`. It renders a full write-up of a tool that lives elsewhere
 *     (see src/pages/tools/). `url` is the live product link, shown when present.
 *
 * Imports are lazy, so each tool only loads on its own page.
 * status: 'live' (usable, linked) | 'building' (shown on the index, not clickable yet)
 * Newest first.
 */
export const tools = [
    {
        slug: 'cover-studio',
        name: 'Cover Studio',
        tagline: 'On-brand blog covers from a post title, in seconds, without waiting on a designer.',
        description:
            'An internal tool that turns a blog post title into an on-brand cover. Claude composes it from a 3,000-icon library inside a fixed house style, then anyone on the team can edit it Figma-style and export PNG or SVG.',
        tags: ['AI', 'Internal tool', 'React'],
        status: 'live',
        date: '2026-11',
        // Internal tool: no public url. The browser frame shows the name instead.
        industry: 'Internal Tool · AI',
        showcase: {
            backdrop: '/backdrops/lilies.webp',
            device: 'browser',
            aspect: '1440 / 900',
            screens: ['/coverhub/demo-poster.webp'],
            video: '/coverhub/demo.mp4',
        },
        page: lazy(() => import('../pages/tools/CoverStudioCaseStudy')),
    },
    {
        slug: 'scanlight',
        name: 'Scanlight',
        tagline: 'Turn any image into LED, halftone, dither, ASCII or CRT light, entirely on-device.',
        description:
            'A browser tool that turns a photo into a dithered, LED-matrix, halftone, ASCII or CRT image, still or looping. It runs entirely on your device and exports PNG, SVG, seamless video loops, or straight into Figma.',
        tags: ['WebGL', 'Image', 'Figma plugin'],
        status: 'live',
        date: '2026-11',
        url: 'https://scanlight-six.vercel.app/',
        // Homepage card
        industry: 'Web App · Creative Tool',
        showcase: {
            backdrop: '/backdrops/prairie.webp',
            device: 'browser',
            aspect: '1280 / 720',
            screens: ['/scanlight/demo-poster.webp'],
            video: '/scanlight/demo.mp4',
        },
        page: lazy(() => import('../pages/tools/ScanlightCaseStudy')),
    },
];

export const getTool = (slug) => tools.find((t) => t.slug === slug);

// Live tools in the shape ProjectCard expects, for the homepage "Tools" tab
export const toolCards = tools
    .filter((t) => t.status === 'live')
    .map((t) => ({
        title: t.name,
        path: `/tools/${t.slug}`,
        link: t.url, // only used for the browser frame's address bar
        industry: t.industry || t.tags.join(' · '),
        year: t.date.slice(0, 4),
        desc: t.tagline,
        showcase: t.showcase,
    }));
