export type SiteSection = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  items?: string[];
  note?: string;
  draft?: boolean;
  theme: "white" | "soft" | "dark" | "graphite";
};

export const about: SiteSection = {
  id: "about",
  eyebrow: "01 / About",
  title: "Practical guidance for better technology decisions.",
  summary: "I help builders and teams make sense of AI, automation, software, and web tools before they commit time, budget, or trust.",
  items: [
    "The work is not about chasing every new tool. It is about understanding what belongs in the workflow, what adds risk, and what creates real leverage.",
    "The focus stays practical: clearer systems, cleaner processes, and technology choices that are easier to explain, maintain, and improve.",
  ],
  theme: "white",
};

export const expertise: SiteSection = {
  id: "expertise",
  eyebrow: "02 / Expertise",
  title: "Where strategy meets implementation.",
  summary: "Focused thinking across the technology decisions that usually create the most noise, friction, or second-guessing.",
  items: [
    "AI tools evaluated by workflow fit",
    "Automation designed around real bottlenecks",
    "Software strategy before build decisions",
    "Web solutions with practical scope and maintainability",
    "Technology recommendations with clear tradeoffs",
  ],
  theme: "dark",
};

export const services: SiteSection = {
  id: "services",
  eyebrow: "03 / Work With Me",
  title: "Useful direction before the build gets expensive.",
  summary: "Support for early decisions, messy tool choices, workflow planning, and software direction when the next move needs to be clearer.",
  items: [
    "Technology decision reviews for tools, platforms, and workflows",
    "AI and automation planning before implementation",
    "Web and software direction for lean, maintainable solutions",
  ],
  theme: "soft",
};

export const insights: SiteSection = {
  id: "insights",
  eyebrow: "04 / Insights",
  title: "Field notes for practical technology work.",
  summary: "Short, useful guides on choosing tools, improving workflows, and making better software decisions without getting pulled into hype.",
  items: [
    "How to choose AI tools by workflow impact",
    "When automation saves time and when it adds overhead",
    "How to evaluate a tech stack before replacing it",
  ],
  note: "Published and upcoming guides",
  theme: "graphite",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];
