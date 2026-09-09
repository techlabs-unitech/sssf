import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Token names kept generic; hex values are sampled directly from the
        // foundation's logo (navy ring, sky-blue/magenta/leaf-green rising
        // figures, rust-orange disc, pale-yellow supporting hand).
        ivory: {
          DEFAULT: "#FFFBF0",
          soft: "#FFF6DC",
        },
        maroon: {
          // primary brand navy
          DEFAULT: "#0B0F8C",
          light: "#2A2FB0",
          dark: "#07082E",
        },
        marigold: {
          // primary CTA / accent — sky blue from the logo
          DEFAULT: "#0B84F3",
          light: "#4DA8F7",
          dark: "#0A6BC7",
        },
        vermillion: {
          // warm secondary accent — rust/terracotta disc from the logo
          DEFAULT: "#CC3403",
          light: "#E0602F",
        },
        charcoal: {
          DEFAULT: "#0A0B2E",
          soft: "#12143F",
          softer: "#1A1C52",
        },
        sandalwood: {
          // muted body text — desaturated navy-slate
          DEFAULT: "#3B3F6B",
          light: "#5C6099",
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
          "radial-gradient(circle, rgba(11,132,243,0.28) 0%, rgba(11,132,243,0) 70%)",
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
