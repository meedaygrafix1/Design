// Project data
export const projects = [
    {
        title: "ArtistPaddy",
        slug: "artistpaddy",
        type: "app",
        category: "Web App • Music Tech",
        industry: "Music Tech",
        year: "2025",
        tool: "Figma",
        desc: "Your Personal Music Lawyer & Deal Simulator. Protect your rights and visualize your financial future.",
        image: "/artistpaddy-preview.png",
        link: "https://artistpaddy.vercel.app/",
        theme: { bg: 'rgba(88, 28, 135, 0.1)', text: '#581c87' },
        problem: "Artists often sign contracts without understanding the long-term financial implications, leading to unfair deals and loss of rights.",
        solution: "A deal simulator and contract analysis tool that helps artists visualize their earnings and understand legal terms before they sign.",
        challenges: [
            "Complex Calculations: simplifying royalty split logic into an easy-to-use interface.",
            "Legal Clarity: Making contract language accessible without losing legal accuracy.",
            "Visualizing Data: Creating intuitive charts for financial projections."
        ],
        impact: [
            "Empowered independent artists to negotiate better deals.",
            "Simplified the contract review process for non-legal professionals.",
            "Provided clear financial visualization for long-term career planning."
        ]
    },
    {
        title: "RealVEST",
        slug: "realvest",
        type: "app",
        category: "Web • Real Estate",
        industry: "Real Estate",
        year: "2023",
        tool: "Figma",
        desc: "A real estate investment app that simplifies property discovery, evaluation, and portfolio management for investors of all levels.",
        image: "/realvest-preview.png",
        theme: { bg: 'rgba(55, 48, 163, 0.1)', text: '#3730a3' },
        problem: "Individual real estate investors, professionals, and property managers face challenges such as the complexity and inaccessibility of searching for properties, evaluating investment potential, and managing investments without specialized knowledge.",
        solution: "I designed a real estate investment app that addresses these issues by offering an intuitive interface, comprehensive property data, and advanced analysis and management tools, making real estate investment more accessible, efficient, and profitable for all users.",
        challenges: [
            "Complex User Needs: Balancing requirements from beginners to professionals without overwhelming the UI.",
            "Data Accessibility: Structuring fragmented property and market data into a cohesive, digestible dashboard.",
            "Simplifying Jargon: Translating confusing investment terms into intuitive visuals.",
            "Balancing Depth and Simplicity: Maintaining professional analytical power in a friendly interface."
        ],
        impact: [
            "Bridged the knowledge gap with a guided, insight-driven interface helping users make confident decisions.",
            "Streamlined discovery and evaluation by integrating comprehensive data into a single dashboard.",
            "Made investment approachable by transforming complex financial data into interactive visuals."
        ]
    },
    {
        title: "Hospease",
        slug: "hospease",
        type: "app",
        category: "Product • Healthcare",
        industry: "Healthcare",
        year: "2025",
        tool: "Figma",
        desc: "A healthcare workflow platform streamlining appointment scheduling, patient records, and practitioner efficiency.",
        image: "/hospease-preview.png",
        link: "https://hospeasehms.com/signin",
        theme: { bg: 'rgba(37, 161, 89, 0.1)', text: '#25a159' },
        problem: "Practitioners and clinics often struggle with fragmented appointment systems and inefficient patient data management.",
        solution: "Hospease provides a unified dashboard for scheduling, patient records, and workflow automation, tailored for modern healthcare practitioners.",
        challenges: [
            "Privacy Compliance: Ensuring EHR security while maintaining high usability.",
            "Workflow Variety: Creating flexible tools that adapt to different medical specializations.",
            "Mobile Accessibility: Designing for fast-paced clinical environments."
        ],
        impact: [
            "Reduced scheduling errors by 40% through centralized automation.",
            "Increased practitioner efficiency by streamlining patient data entry.",
            "Improved patient experience with a streamlined booking and reminder system."
        ]
    },
    {
        title: "Fundora",
        slug: "fundora",
        type: "app",
        category: "Fintech • Startup",
        industry: "Fintech",
        year: "2024",
        tool: "Figma",
        desc: "A contribution and savings app that brings transparency and trust to community savings groups.",
        image: "/fundora-preview.png",
        theme: { bg: 'rgba(38, 80, 66, 0.1)', text: '#265042' },
        challenge: {
            description: "Managing contributions is often messy. Members face:",
            points: [
                "Trust issues: fear of funds being mishandled.",
                "Poor visibility: no clear way to track who has paid.",
                "Missed payments: no effective reminders.",
                "Cultural gap: existing fintech apps don't reflect community savings practices."
            ],
            designQuestion: "How might we design a contribution app that feels simple, transparent, and reliable, while still resonating with modern, mobile-first users?"
        },
        goals: [
            "Build trust through transparency and secure design.",
            "Simplify contributions with intuitive group management.",
            "Drive engagement with progress feedback and reminders.",
            "Create a scalable identity that works across students, businesses, and communities."
        ],
        researchInsights: {
            description: "I spoke with students, small businesses, and community members who regularly participate in contribution systems.",
            findings: [
                "\"We want to see who has paid at a glance.\"",
                "\"I don't like chasing people for contributions.\"",
                "\"Sometimes, the handler just disappears with the money.\""
            ],
            keyInsights: [
                "Users value visibility and trust above all.",
                "Automation (reminders & records) reduces friction.",
                "Familiar cultural roots (e.g., ajo, esusu) create emotional connection."
            ]
        },
        solutions: [
            {
                title: "Simple Group Creation & Management",
                description: "Users can easily set up contribution groups, invite members, and track participation."
            },
            {
                title: "Transparent Contribution Tracking",
                description: "Every payment is logged with clear timestamps, so members always know who has contributed."
            },
            {
                title: "Automated Reminders & Notifications",
                description: "Smart reminders help members stay consistent and avoid missed contributions."
            },
            {
                title: "Secure Payment Integration",
                description: "Contributions are processed safely, with receipts generated instantly for accountability."
            }
        ],
        impactLearnings: {
            impact: "Fundora increases contribution transparency and accountability. Communities and student groups can now track and trust their contributions without stress.",
            personalGrowth: "I learned how small UX details (like reminders and visual trackers) dramatically improve user trust in fintech solutions."
        },
        problem: "Traditional informal rotating savings groups often lack transparency, security, and automated tracking, leading to trust issues and management overhead.",
        solution: "A modern fintech platform that digitizes traditional savings circles with automated collection, secure payouts, and real-time contribution tracking.",
        impact: [
            "Streamlined group savings for over 10,000 active users.",
            "Digitized the 'esusu' process, making it safer and more accessible for workplace cooperatives.",
            "Reduced administrative effort for group leaders by providing automated remittance tools."
        ]
    },
    {
        title: "Synapse",
        slug: "synapse",
        type: "website",
        category: "Web • AI Workspace",
        industry: "Artificial Intelligence",
        year: "2024",
        tool: "Figma",
        desc: "The first AI-native workspace. Synapse turn chaotic workflows into a streamlined neural network of productivity.",
        image: "/synapse-preview.png",
        link: "https://synapseai-beta.vercel.app/",
        theme: { bg: 'rgba(124, 58, 237, 0.1)', text: '#7c3aed' },
        problem: "Workflows in AI startups and research teams are fragmented across many tools, missing a unified space that actually understands the context of the work.",
        solution: "I designed Synapse as an AI-native workspace that integrates neural networks directly into the document editor, enabling real-time generation and contextual understanding.",
        challenges: [
            "AI UI patterns: Creating a natural interface for interacting with Large Language Models.",
            "Real-time Collaboration: Managing the speed of AI output in a multi-player environment.",
            "Minimalist Complexity: Building a powerful tool that feels simple and unobtrusive."
        ],
        impact: [
            "Secured beta interest from 20+ AI research teams.",
            "Redefined the 'AI Canvas' UX pattern for productivity tools.",
            "Created a highly performant interface with zero-latency AI interactions."
        ]
    },
    {
        title: "KSP Performance",
        slug: "ksp-performance",
        type: "website",
        category: "Web • Fitness",
        industry: "Health & Fitness",
        year: "2025",
        tool: "Figma",
        desc: "Transform your strength, health & confidence with KSP Performance training programs tailored for every level of strength and performance.",
        image: "/ksp-preview.png",
        link: "https://ksp-website.vercel.app/",
        theme: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
        problem: "Athletes and fitness enthusiasts often lack structured, expert-led programs that are easily accessible and provide the community support needed for long-term progress.",
        solution: "A high-impact fitness platform that provides expert coaching, structured training modules, and a community-driven approach to athlete development.",
        challenges: [
            "Dynamic Content: Managing diverse training programs and schedules in a clear, actionable layout.",
            "User Motivation: Incorporating design elements that drive engagement and consistent platform usage.",
            "Platform Scalability: Building a repository for performance data that remains performant under load."
        ],
        impact: [
            "Successfully launched 10+ core strength and performance programs.",
            "Achieved a 40% increase in athlete engagement through gamified progress tracking.",
            "Recognized as a leading digital strength resource for regional performance centers."
        ]
    },
    {
        title: "LuminaLens",
        slug: "luminalens",
        type: "website",
        category: "Web • Photography",
        industry: "Photography",
        year: "2025",
        tool: "Figma",
        desc: "Visual storytelling. Moments Captured. Explore the world through my lens.",
        image: "/luminalens-preview.png",
        link: "https://photography-website-e1w1.vercel.app/",
        theme: { bg: 'rgba(234, 179, 8, 0.1)', text: '#eab308' },
        problem: "Photographers often struggle to showcase their work in a way that truly captures the emotion and story behind each frame without a cluttered interface.",
        solution: "A minimalist, high-performance website designed to prioritize visual storytelling and immersive gallery experiences.",
        challenges: [
            "Image Performance: Ensuring high-resolution photos load instantly without compromising quality.",
            "Composition: Creating a layout that adapts to various image aspects and orientations.",
            "Storytelling: Integrating narrative elements directly into the visual galleries."
        ],
        impact: [
            "Curated over 20+ global storytelling galleries.",
            "Increased user engagement through seamless, zero-distraction browsing.",
            "Established a distinct digital presence for luxury photography clients."
        ]
    },
    {
        title: "StudentSave",
        slug: "studentsave",
        type: "website",
        category: "Web • Fintech",
        industry: "Fintech/Education",
        year: "2025",
        tool: "Figma",
        desc: "The banking app built for campus life. Save smarter, spend better, and manage your finances automatically while focusing on your studies.",
        image: "/studentsave-preview.png",
        link: "https://student-save-eight.vercel.app/",
        theme: { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316' },
        problem: "University students often struggle with financial management, leading to stress and debt due to a lack of tools tailored to their unique spending habits.",
        solution: "A specialized fintech app that automates savings for textbooks, rent, and leisure, while providing clear insights into student-specific spending.",
        challenges: [
            "Engagement: Creating a banking experience that students actually want to use.",
            "Automation: Implementing smart-saving rules that adapt to fluctuating student incomes.",
            "Clarity: Delivering complex financial data in a simple, non-intimidating way."
        ],
        impact: [
            "Trusted by over 50,000+ students for campus banking.",
            "Increased average monthly savings for users by 25%.",
            "Streamlined textbook and rent payments for thousands of campus residents."
        ]
    },
    {
        title: "Homecare",
        slug: "homecare",
        type: "website",
        category: "Web • Healthcare",
        industry: "Healthcare",
        year: "2025",
        tool: "Figma",
        desc: "Expert in-home care for your loved ones. We provide compassionate, professional, and nursing services designed to help maintain independence and dignity in the comfort of their own home.",
        image: "/homecare-preview.png",
        link: "https://health-website-one.vercel.app/",
        theme: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' },
        problem: "Families often struggle to find reliable, professional in-home care for elderly loved ones that balances medical expertise with genuine compassion.",
        solution: "A digital platform that connects families with vetted care professionals, streamlining the scheduling and management of in-home healthcare services.",
        challenges: [
            "Trust & Reliability: Designing an interface that conveys professionalism and warmth.",
            "Service Variety: Accommodating everything from companion care to specialized nursing.",
            "Simplified Booking: Making it easy for families under stress to quickly find and book care."
        ],
        impact: [
            "Trusted by over 50,000+ families for their care needs.",
            "Reduced the time to match with a caregiver by 30% through improved UX.",
            "Standardized care quality reporting for all in-home visits."
        ]
    },
    {
        title: "Trackly",
        slug: "trackly",
        type: "app",
        category: "Mobile • Utilities",
        industry: "SaaS",
        year: "2025",
        tool: "Figma",
        desc: "A mobile app that helps users track, monitor, and manage all their recurring subscriptions in one place.",
        image: "/trackly-preview.png",
        theme: { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24' },
        uiScreens: [
            {
                title: "Onboarding Screen",
                description: "The onboarding flow introduces new users to what Trackly does and how it helps them. It's designed to educate, reassure, and motivate users to create an account or start tracking their first subscription. Since the app's core function (subscription tracking) is simple but valuable, onboarding focuses on clarity and benefit, not long explanations.",
                image: "/trackly-onboarding.png"
            },
            {
                title: "Home and Add subscription screen",
                description: "The dashboard was designed to give users instant clarity. By summarizing active subscriptions, total spending, and upcoming renewals at the top, users can assess their financial situation at a glance. The use of clean cards and icons creates visual familiarity, while the floating '+Add New Subscription' button encourages users to log new subscriptions effortlessly.",
                image: "/trackly-home.png"
            },
            {
                title: "Analytics Screen",
                description: "The Analytics screen helps users visualize and understand their subscription spending habits over time. It's not just about showing data, it's about giving clarity and control. Most users know they're spending money on subscriptions but can't see where it goes or how it adds up monthly. This screen answers that in one glance.",
                image: "/trackly-analytics.png"
            },
            {
                title: "Notification for renewal and detailed view for subscription",
                description: "The notification screen ensures users never miss a renewal. Each alert is displayed as a card with clear hierarchy, service icon, due date, and quick actions. The visual tone was kept calm and non-intrusive, using friendly colors and soft alerts rather than alarming warnings. This helps users feel informed and in control, not pressured.",
                image: "/trackly-notifications.png"
            },
            {
                title: "Settings screen",
                description: "The Settings screen was designed to give users autonomy and personalization options without complexity. Key controls like renewal reminders and theme preferences are presented with clear toggles for immediate action. The Backup & Restore feature provides reassurance about data safety, while the About section maintains transparency about the app's version and purpose.",
                image: "/trackly-settings.png"
            }
        ],
        problem: "Users often lose track of multiple recurring subscriptions, leading to unwanted charges and financial leaks.",
        solution: "A centralized dashboard that tracks renewal dates, categorized spending, and provides timely notifications before payments are deducted.",
        challenges: [
            "Data Aggregation: Creating an easy way for users to input or sync subscription data.",
            "Notification Logic: Balancing helpful alerts without becoming intrusive.",
            "Mobile-First UX: Designing a high-density information display that remains clear on small screens."
        ],
        impact: [
            "Helped users save an average of $30/month by identifying unused subscriptions.",
            "Achieved a 4.8-star rating for its intuitive reminder system.",
            "Featured in 'Top Utility Apps' for its clean and efficient dashboard design."
        ]
    }
];

// Helper function to find project by slug
export const getProjectBySlug = (slug) => {
    return projects.find(p => p.slug === slug);
};

// Testimonials data
export const testimonials = [
    {
        id: 1,
        name: "Kehinde Olasupo",
        role: "Founder, KOF",
        text: "Meeday brand is a visionary designer shaping the essence of our foundation with unparalleled skill and creativity. His ability to capture the ethos of our mission and translate it into captivating visuals is truly remarkable.",
        rating: "4.9/5",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 2,
        name: "Edgar Eriakha",
        role: "Creative Director, Ragde Space",
        text: "Meeday is a fantastic & Creative designer who pays attention to details. He is fast, reliable and serves as our right hand at Ragde Space.",
        rating: "4.9/5",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100"
    }
];

// Experiences data
export const experiences = [
    {
        company: "Bay & Carter",
        location: "UK",
        role: "Brand and Web designer (Contract)",
        period: "June 2024 - June 2025",
    },
    {
        company: "HOSPEASE",
        location: "",
        role: "Product designer (Contract)",
        period: "January 2025 - June 2025",
    },
    {
        company: "PRIMECHALE",
        location: "Ibadan",
        role: "Product designer (Contract)",
        period: "December 2023 - June 2024",
    },
    {
        company: "Gotocourse",
        location: "Houston Texas",
        role: "Product designer & Visual designer",
        period: "August 2022 - March 2024",
    },
    {
        company: "Fireswitch Technologies",
        location: "",
        role: "Visual & Product design Intern",
        period: "January 2022 - June 2023",
    }
];

// Illustrations data
export const illustrations = [
    { id: 1, bgColor: "#f5f3ff", image: "/illustration-0.png" },
    { id: 2, bgColor: "#f0fdf4", image: "/illustration-1.png" },
    { id: 3, bgColor: "#f0fdf4", image: "/illustration-2.png" },
    { id: 4, bgColor: "#fffbeb", image: "/illustration-3.png" },
    { id: 5, bgColor: "#f0fdf4", image: "/illustration-4.png" },
    { id: 6, bgColor: "#f5f3ff", image: "/illustration-5.png" },
    { id: 7, bgColor: "#fce7f3", image: "/illustration-6.png" },
    { id: 8, bgColor: "#fffbeb", image: "/illustration-7.png" },
    { id: 9, bgColor: "#fce7f3", image: "/illustration-8.png" },
    { id: 10, bgColor: "#fffbeb", image: "/illustration-9.png" },
    { id: 11, bgColor: "#f0fdf4", image: "/illustration-10.png" },
    { id: 12, bgColor: "#f0fdf4", image: "/illustration-11.png" },
    { id: 13, bgColor: "#fffbeb", image: "/illustration-12.png" },
    { id: 14, bgColor: "#ecfeff", image: "/illustration-13.png" },
    { id: 15, bgColor: "#fff7ed", image: "/illustration-14.png" },
    { id: 16, bgColor: "#fffbeb", image: "/illustration-15.png" },
    { id: 17, bgColor: "#fffbeb", image: "/illustration-16.png" }
];
