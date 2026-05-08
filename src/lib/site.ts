export type SiteSection = {
  id: string;
  title: string;
  items: string[];
  note?: string;
  draft?: boolean;
};

export const whatICover: SiteSection = {
  id: "what-i-cover",
  title: "What I Cover",
  items: [
    "AI tools and workflows",
    "Automation",
    "Software strategy",
    "Web solutions",
    "Tech recommendations",
  ],
};

export const featuredGuides: SiteSection = {
  id: "featured-guides",
  title: "Featured Guides",
  items: [
    "Choosing the right AI tool",
    "When automation actually saves time",
    "How to evaluate your tech stack",
  ],
  note: "Drafts ready for review",
  draft: true,
};

export const projects: SiteSection = {
  id: "projects-experiments",
  title: "Projects / Experiments",
  items: ["Automation workflows", "Personal site build", "Tool evaluations"],
  note: "Drafts in progress",
  draft: true,
};

export const navItems = [
  { label: "What I Cover", href: "#what-i-cover" },
  { label: "Featured Guides", href: "#featured-guides" },
  { label: "Projects / Experiments", href: "#projects-experiments" },
  { label: "Contact", href: "#contact" },
];
