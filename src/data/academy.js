export const courses = [
  {
    slug: "roblox-scripting",
    title: "Roblox Scripting",
    description: "Learn Luau and build powerful gameplay systems from the ground up.",
    level: "Beginner to Advanced",
    duration: "10-14 weeks (self-paced)",
    topics: [
      "Luau fundamentals",
      "Variables and functions",
      "Events",
      "Client/server architecture",
      "RemoteEvents",
      "ModuleScripts",
      "DataStores",
      "Advanced systems",
    ],
    outcomes: [
      "Write clean, readable Luau instead of copying scripts",
      "Structure gameplay logic across client and server correctly",
      "Persist player data safely with DataStores",
      "Debug runtime errors and profile performance",
      "Build reusable systems with ModuleScripts",
    ],
    curriculum: [
      {
        module: "Foundations",
        lessons: [
          "Roblox Studio and the script hierarchy",
          "Variables, data types and operators",
          "Conditionals and loops",
          "Functions and scope",
        ],
      },
      {
        module: "Instances and Events",
        lessons: [
          "Working with the Instance API",
          "Signals, connections and cleanup",
          "Touched, Changed and lifecycle events",
          "Player and Character handling",
        ],
      },
      {
        module: "Client / Server Architecture",
        lessons: [
          "Filtering Enabled and the security model",
          "RemoteEvents and RemoteFunctions",
          "Validating client requests on the server",
          "ModuleScripts and code organisation",
        ],
      },
      {
        module: "Data and Advanced Systems",
        lessons: [
          "DataStores, sessions and retry logic",
          "Leaderstats and currency systems",
          "Inventory and shop systems",
          "Debugging, profiling and optimisation",
        ],
      },
    ],
    projects: [
      "Currency and shop system with server validation",
      "Persistent player progression with DataStores",
      "Round-based gameplay framework",
    ],
    requirements: [
      "A computer that can run Roblox Studio",
      "A Roblox account",
      "No prior programming experience required",
    ],
    mentor: {
      name: "Scripting Mentor Team",
      role: "Luau & Systems",
      bio: "Reviews assignments, answers scripting questions and gives written feedback on submitted code.",
    },
    plan: "Basic and above",
  },
  {
    slug: "roblox-building",
    title: "Roblox Building",
    description: "Learn how to create detailed, optimized and immersive Roblox environments.",
    level: "Beginner to Intermediate",
    duration: "6-8 weeks (self-paced)",
    topics: [
      "Roblox Studio",
      "Parts and models",
      "Terrain",
      "Lighting",
      "Optimization",
      "Environment design",
    ],
    outcomes: [
      "Navigate Roblox Studio confidently",
      "Build clean, modular models",
      "Sculpt and paint believable terrain",
      "Light a scene for mood and readability",
      "Keep environments performant on low-end devices",
    ],
    curriculum: [
      {
        module: "Studio and Primitives",
        lessons: [
          "Studio interface and workflow",
          "Parts, unions and solid modelling",
          "Models, pivots and grouping",
        ],
      },
      {
        module: "Environments",
        lessons: ["Terrain sculpting and painting", "Scene composition", "Set dressing and props"],
      },
      {
        module: "Lighting and Atmosphere",
        lessons: [
          "Lighting technologies",
          "Atmosphere and colour grading",
          "Light sources and mood",
        ],
      },
      {
        module: "Optimisation",
        lessons: [
          "Part count and streaming",
          "LOD and instancing habits",
          "Testing on lower-end hardware",
        ],
      },
    ],
    projects: [
      "A modular lobby environment",
      "An outdoor terrain map with a lighting pass",
      "An optimisation rebuild of an existing scene",
    ],
    requirements: ["Roblox Studio installed", "No prior building experience required"],
    mentor: {
      name: "Building Mentor Team",
      role: "Environment Art",
      bio: "Gives structured feedback on layout, readability, performance and visual polish.",
    },
    plan: "Basic and above",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Create modern, intuitive interfaces for Roblox experiences.",
    level: "Beginner to Advanced",
    duration: "6-8 weeks (self-paced)",
    topics: [
      "UI design",
      "UX principles",
      "Roblox GUI systems",
      "Figma workflow",
      "Responsive interfaces",
      "Interactive UI",
    ],
    outcomes: [
      "Design interfaces players understand immediately",
      "Build responsive GUIs that scale across devices",
      "Prototype in Figma before building",
      "Script interactive, animated UI",
    ],
    curriculum: [
      {
        module: "UX Foundations",
        lessons: ["Player mental models", "Information hierarchy", "Accessibility and contrast"],
      },
      {
        module: "Design Workflow",
        lessons: [
          "Figma basics for game UI",
          "Design systems and components",
          "Iconography and type",
        ],
      },
      {
        module: "Roblox GUI",
        lessons: [
          "ScreenGui, frames and constraints",
          "Scale vs Offset and responsiveness",
          "SurfaceGui and BillboardGui",
        ],
      },
      {
        module: "Interactive UI",
        lessons: ["Scripting UI state", "Tweened transitions", "Menus, HUDs and shop flows"],
      },
    ],
    projects: [
      "A responsive main menu and settings panel",
      "An inventory and shop interface",
      "A HUD system with animated feedback",
    ],
    requirements: [
      "Roblox Studio",
      "A free Figma account",
      "Basic scripting is helpful but not required",
    ],
    mentor: {
      name: "UI/UX Mentor Team",
      role: "Interface Design",
      bio: "Reviews interface work for clarity, hierarchy, responsiveness and consistency.",
    },
    plan: "Basic and above",
  },
  {
    slug: "game-design",
    title: "Game Design",
    description: "Learn how to turn an idea into a complete playable experience.",
    level: "Intermediate",
    duration: "8-10 weeks (self-paced)",
    topics: [
      "Game mechanics",
      "Progression",
      "Player retention",
      "Game loops",
      "Economy design",
      "Monetization",
    ],
    outcomes: [
      "Turn a concept into a documented design",
      "Design core and meta loops that hold together",
      "Balance an in-game economy",
      "Plan ethical, player-friendly monetisation",
    ],
    curriculum: [
      {
        module: "Design Fundamentals",
        lessons: ["Core loops", "Mechanics, dynamics and feel", "Writing a design document"],
      },
      {
        module: "Progression",
        lessons: [
          "Levelling and unlock curves",
          "Difficulty pacing",
          "Session design and retention",
        ],
      },
      {
        module: "Economy",
        lessons: ["Currencies and sinks", "Balancing rewards", "Simulating an economy"],
      },
      {
        module: "Monetisation",
        lessons: [
          "Game passes and developer products",
          "Value-first monetisation",
          "Measuring what matters",
        ],
      },
    ],
    projects: [
      "A full design document for an original experience",
      "A balanced economy spreadsheet",
      "A playable prototype of your core loop",
    ],
    requirements: ["Basic familiarity with Roblox Studio", "Willingness to write and iterate"],
    mentor: {
      name: "Design Mentor Team",
      role: "Systems & Economy",
      bio: "Critiques design documents, loops and economy balance with written feedback.",
    },
    plan: "Pro and above",
  },
  {
    slug: "animation-vfx",
    title: "Animation & VFX",
    description: "Bring Roblox experiences to life with animation and visual effects.",
    level: "Intermediate",
    duration: "6-8 weeks (self-paced)",
    topics: ["Character animation", "Tweening", "Particles", "Lighting effects", "Visual effects"],
    outcomes: [
      "Animate characters with the Animation Editor",
      "Drive animations from code",
      "Author readable particle and beam effects",
      "Combine light, sound and motion into game feel",
    ],
    curriculum: [
      {
        module: "Animation",
        lessons: [
          "Rigs and the Animation Editor",
          "Keyframes, easing and timing",
          "Animation tracks in code",
        ],
      },
      {
        module: "Tweening",
        lessons: ["TweenService fundamentals", "Sequencing and chaining", "Camera movement"],
      },
      {
        module: "Effects",
        lessons: ["ParticleEmitters", "Beams, trails and attachments", "Dynamic lighting effects"],
      },
      {
        module: "Game Feel",
        lessons: ["Hit feedback", "Screen shake and impact", "Performance budgets for VFX"],
      },
    ],
    projects: [
      "A custom character emote set",
      "An ability with full VFX and feedback",
      "A cinematic intro sequence",
    ],
    requirements: ["Roblox Studio", "Comfort with basic scripting"],
    mentor: {
      name: "Animation Mentor Team",
      role: "Animation & VFX",
      bio: "Reviews timing, readability and performance of animation and effect work.",
    },
    plan: "Pro and above",
  },
  {
    slug: "complete-game-development",
    title: "Complete Game Development",
    description:
      "Learn how different development disciplines come together to create a complete Roblox experience.",
    level: "Advanced",
    duration: "14-16 weeks (self-paced)",
    topics: [
      "Project planning",
      "Scripting systems",
      "Building and environment",
      "UI implementation",
      "Animation and VFX",
      "Testing and release",
    ],
    outcomes: [
      "Plan and scope a full experience",
      "Integrate scripting, building, UI and VFX into one project",
      "Test, debug and optimise before release",
      "Publish and iterate based on player feedback",
    ],
    curriculum: [
      {
        module: "Pre-production",
        lessons: ["Scoping realistically", "Project structure and version habits", "Task planning"],
      },
      {
        module: "Production",
        lessons: ["Building the core loop", "Systems integration", "Environment and UI passes"],
      },
      {
        module: "Polish",
        lessons: ["Animation and VFX pass", "Sound and feedback", "Performance profiling"],
      },
      {
        module: "Release",
        lessons: ["Playtesting and iteration", "Publishing checklist", "Post-launch updates"],
      },
    ],
    projects: ["One complete, publishable Roblox experience built across the course"],
    requirements: [
      "Completion of Scripting and Building, or equivalent experience",
      "Consistent weekly time commitment",
    ],
    mentor: {
      name: "Senior Mentor Team",
      role: "Full Production",
      bio: "Guides the capstone project from scoping through release with milestone reviews.",
    },
    plan: "Pro and above",
  },
];
export const plans = [
  {
    id: "free",
    tier: "FREE",
    name: "Explorer",
    price: 0,
    priceLabel: "₹0",
    tagline: "Start exploring Roblox development at no cost.",
    features: [
      "Basic academy access",
      "Free beginner courses",
      "Community access",
      "Basic learning resources",
      "Free challenges",
    ],
    excluded: ["No certificates", "No advanced courses"],
    cta: "Start Free",
  },
  {
    id: "basic",
    tier: "BASIC",
    name: "Learner",
    price: 199,
    priceLabel: "₹199",
    tagline: "Structured learning with assignments and feedback.",
    features: [
      "Everything in Free",
      "Beginner & intermediate courses",
      "Assignments",
      "Progress tracking",
      "Basic certificates",
      "Student-only channels",
      "Priority help",
    ],
    cta: "Choose Basic",
  },
  {
    id: "pro",
    tier: "PRO",
    name: "Developer",
    price: 399,
    priceLabel: "₹399",
    tagline: "Full access, advanced projects and reviewed work.",
    features: [
      "Everything in Basic",
      "All courses",
      "Advanced development courses",
      "Advanced projects",
      "Project reviews",
      "Advanced certificates",
      "Developer challenges",
      "Portfolio guidance",
      "Priority support",
    ],
    cta: "Choose Pro",
    popular: true,
  },
  {
    id: "elite",
    tier: "ELITE",
    name: "Professional",
    price: 799,
    priceLabel: "₹799",
    tagline: "Personal mentorship and a tailored development roadmap.",
    features: [
      "Everything in Pro",
      "1-on-1 mentorship",
      "Personal project review",
      "Personalized learning roadmap",
      "Advanced debugging assistance",
      "Portfolio review",
      "Private Elite community",
      "Exclusive workshops",
      "Developer guidance",
      "Elite certificate",
    ],
    cta: "Choose Elite",
  },
];
export const positions = [
  {
    id: "educator",
    title: "Educator",
    type: "Part-time / Remote",
    description:
      "Teach academy lessons, guide students through course material and keep learning sessions clear and practical.",
    responsibilities: [
      "Deliver lessons from the academy curriculum",
      "Answer student questions in course channels",
      "Review and grade assignments",
      "Report student progress to the curriculum team",
    ],
    requirements: [
      "Solid working knowledge of Roblox Studio",
      "Clear written and spoken communication",
      "Reliable weekly availability",
    ],
  },
  {
    id: "senior-educator",
    title: "Senior Educator",
    type: "Part-time / Remote",
    description:
      "Lead a subject area, support other educators and maintain teaching quality across the academy.",
    responsibilities: [
      "Own a course track end to end",
      "Mentor and onboard new educators",
      "Review teaching quality and student outcomes",
      "Contribute to curriculum improvements",
    ],
    requirements: [
      "Advanced Roblox development experience",
      "Prior teaching, tutoring or mentoring experience",
      "Comfort giving and receiving structured feedback",
    ],
  },
  {
    id: "developer-mentor",
    title: "Developer Mentor",
    type: "Part-time / Remote",
    description:
      "Work directly with students on their projects, unblock problems and review submitted work.",
    responsibilities: [
      "Hold 1-on-1 and small-group mentorship sessions",
      "Review student projects and give written feedback",
      "Help students debug and optimise their work",
    ],
    requirements: [
      "Shipped Roblox projects you can share",
      "Strong debugging skills",
      "Patience and a teaching mindset",
    ],
  },
  {
    id: "community-moderator",
    title: "Community Moderator",
    type: "Volunteer / Remote",
    description: "Keep the academy community safe, welcoming and on-topic.",
    responsibilities: [
      "Moderate community channels",
      "Enforce community guidelines consistently",
      "Escalate issues to the academy team",
      "Welcome and orient new students",
    ],
    requirements: [
      "Previous moderation experience preferred",
      "Calm, fair judgement",
      "Regular daily availability",
    ],
  },
  {
    id: "curriculum-developer",
    title: "Curriculum Developer",
    type: "Contract / Remote",
    description: "Design lessons, challenges and projects that teach real development skills.",
    responsibilities: [
      "Write lesson content and challenge briefs",
      "Design project-based assessments",
      "Keep material current with Roblox platform changes",
    ],
    requirements: [
      "Strong technical writing",
      "Deep Roblox development knowledge",
      "Instructional design experience is a plus",
    ],
  },
  {
    id: "ui-ux-mentor",
    title: "UI/UX Mentor",
    type: "Part-time / Remote",
    description:
      "Guide students through interface design, Figma workflow and Roblox GUI implementation.",
    responsibilities: [
      "Review student interface work",
      "Run UI critique sessions",
      "Maintain the UI/UX course material",
    ],
    requirements: [
      "Portfolio of game or product UI work",
      "Experience with Roblox GUI systems",
      "Figma proficiency",
    ],
  },
  {
    id: "scripting-mentor",
    title: "Scripting Mentor",
    type: "Part-time / Remote",
    description:
      "Support students learning Luau, from first script to advanced systems architecture.",
    responsibilities: [
      "Review submitted code and give actionable feedback",
      "Run live debugging sessions",
      "Maintain scripting challenges and solutions",
    ],
    requirements: [
      "Advanced Luau proficiency",
      "Understanding of client/server security",
      "Ability to explain concepts simply",
    ],
  },
];
export const faqs = [
  {
    q: "What is Crimson Valley Academy?",
    a: "Crimson Valley Academy is the educational division of Crimson Valley Studios. It teaches practical Roblox development: scripting, building, UI/UX, game design, animation and full game production, through structured lessons, challenges and projects.",
  },
  {
    q: "Do I need prior Roblox development experience?",
    a: "No. Our beginner tracks assume no prior experience. If you already build or script, you can start at the intermediate or advanced modules instead.",
  },
  {
    q: "Do I need Roblox Studio?",
    a: "Yes. Roblox Studio is free and runs on Windows and macOS. You will also need a Roblox account to publish and test your projects.",
  },
  {
    q: "What programming language is taught?",
    a: "Luau, the language used by Roblox. We teach it from fundamentals through advanced systems architecture.",
  },
  {
    q: "Do I receive certificates?",
    a: "Certificates are included from the Basic plan upwards. Basic issues course certificates, Pro issues advanced certificates, and Elite includes the Elite certificate after a reviewed capstone project.",
  },
  {
    q: "How do the plans work?",
    a: "Plans are monthly subscriptions that unlock a level of access: courses, assignments, reviews, certificates and mentorship. The Free plan gives you permanent access to beginner material.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. Subscriptions can be cancelled at any time and remain active until the end of the current billing period.",
  },
  {
    q: "Can I change plans?",
    a: "Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply from the next billing period.",
  },
  {
    q: "Are courses self-paced?",
    a: "Yes. All courses are self-paced. Mentorship sessions and workshops run on a schedule that is published in advance.",
  },
  {
    q: "Is mentorship available?",
    a: "Project reviews are included from Pro. Dedicated 1-on-1 mentorship and personalised roadmaps are part of the Elite plan.",
  },
  {
    q: "How do I enroll?",
    a: "Choose a plan, create your student account, select a course, enter your student details and complete checkout. Your dashboard unlocks immediately after enrollment is confirmed.",
  },
  {
    q: "How can I become an academy staff member?",
    a: "Open roles are listed on the Careers page. Submit the application form with your Roblox username, experience and portfolio, and the academy team will review it.",
  },
];
