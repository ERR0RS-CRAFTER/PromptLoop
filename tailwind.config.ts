import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff", 
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // primary light mode
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        dark: {
          background: "#0F172A",
          primary: "#8B5CF6", // primary dark mode
          text: "#F8FAFC",
        },
        light: {
          background: "#F9FAFB",
          text: "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.light.text"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: theme("colors.primary.600"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.light.text"),
            },
            ".dark & h1, .dark & h2, .dark & h3, .dark & h4, .dark & h5, .dark & h6": {
              color: theme("colors.dark.text"),
            },
            ".dark & p, .dark & ul, .dark & ol, .dark & blockquote": {
              color: theme("colors.dark.text"),
            },
            ".dark & a": {
              color: theme("colors.dark.primary"),
              "&:hover": {
                color: theme("colors.primary.300"),
              },
            },
            ".dark &": {
              color: theme("colors.dark.text"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config; 