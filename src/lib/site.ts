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
  title: "About",
  summary: "Practical technology guidance for modern builders.",
  items: [
    "I share clear, practical insights on AI, automation, software, and digital tools - helping professionals and businesses make smarter technology decisions.",
    "The focus is simple: useful technology choices, cleaner workflows, and systems that are easier to understand.",
  ],
  theme: "white",
};

export const expertise: SiteSection = {
  id: "expertise",
  eyebrow: "02 / Expertise",
  title: "Expertise",
  summary: "Focused guidance across the places where modern teams most often need clarity.",
  items: [
    "AI tools and workflows",
    "Automation",
    "Software strategy",
    "Web solutions",
    "Tech recommendations",
  ],
  theme: "dark",
};

export const services: SiteSection = {
  id: "services",
  eyebrow: "03 / Work With Me",
  title: "Services / Work With Me",
  summary: "Practical, focused engagements for businesses and professionals.",
  items: [
    "Technology advisory for project planning and sequencing",
    "Workflow and AI tool selection support",
    "Web and software solution architecture reviews",
  ],
  theme: "soft",
};

export const insights: SiteSection = {
  id: "insights",
  eyebrow: "04 / Insights",
  title: "Insights Preview",
  summary: "Draft themes for the upcoming content system. These are directional topics, not published articles.",
  items: [
    "Choosing the right AI tool",
    "When automation actually saves time",
    "How to evaluate your tech stack",
  ],
  note: "Drafts ready for review",
  draft: true,
  theme: "graphite",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];
