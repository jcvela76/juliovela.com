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
  summary: "Clear technology guidance for people building, choosing, and improving digital systems.",
  items: [
    "I help translate AI, automation, software, and web technology into practical decisions: what to use, what to avoid, and how to make tools fit real workflows.",
    "The focus is simple: useful technology choices, cleaner workflows, and systems that are easier to understand and maintain.",
  ],
  theme: "white",
};

export const expertise: SiteSection = {
  id: "expertise",
  eyebrow: "02 / Expertise",
  title: "Expertise",
  summary: "Focused guidance for the decisions that usually create the most friction.",
  items: [
    "AI tools that fit real workflows",
    "Automation that actually saves time",
    "Software strategy before implementation",
    "Web solutions with practical scope",
    "Technology recommendations with clear tradeoffs",
  ],
  theme: "dark",
};

export const services: SiteSection = {
  id: "services",
  eyebrow: "03 / Work With Me",
  title: "Services / Work With Me",
  summary: "Focused support for turning technology questions into clear next steps.",
  items: [
    "Technology decision reviews",
    "AI and automation workflow planning",
    "Web and software solution direction",
  ],
  theme: "soft",
};

export const insights: SiteSection = {
  id: "insights",
  eyebrow: "04 / Insights",
  title: "Insights Preview",
  summary: "Upcoming guides and practical notes on the technology decisions I am exploring next.",
  items: [
    "Choosing the right AI tool",
    "When automation actually saves time",
    "How to evaluate your tech stack",
  ],
  note: "Coming next",
  theme: "graphite",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];
