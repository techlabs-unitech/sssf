import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared editorial palette: ivory, deep blue-gray, restrained gold, and charcoal.
        ivory: {
          DEFAULT: "#FAF8F2",
          soft: "#F0ECE2",
        },
        maroon: {
          DEFAULT: "#102A43",
          light: "#1E4A6A",
          dark: "#0B1E30",
        },
        marigold: {
          DEFAULT: "#B28A4A",
          light: "#C7A66E",
          dark: "#86632F",
        },
        vermillion: {
          // warm secondary accent — rust/terracotta disc from the logo
          DEFAULT: "#CC3403",
          light: "#E0602F",
        },
        charcoal: {
          DEFAULT: "#25292B",
          soft: "#343A3D",
          softer: "#464D50",
        },
        sandalwood: {
          DEFAULT: "#566168",
          light: "#737D82",
        },
        magenta: {
          DEFAULT: "#C61FBB",
          light: "#DB5FD1",
        },
        leaf: {
          DEFAULT: "#2ECC5F",
          light: "#5FDB86",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      backgroundImage: {
        "flame-glow":
          "radial-gradient(circle, rgba(178,138,74,0.20) 0%, rgba(178,138,74,0) 70%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
