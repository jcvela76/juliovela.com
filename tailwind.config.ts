import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brand-red": "#E11D2E",
        "brand-space": "#1F2329",
        "brand-graphite": "#2B2F36",
        "brand-interface": "#9AA0A6",
        "brand-soft": "#F5F6F7",
        "brand-white": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
