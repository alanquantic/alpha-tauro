import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#050505",
        graphite: "#171717",
        alpha: "#f1c900",
      },
      fontFamily: {
        sans: ["var(--font-lexend)", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        soft: "0 22px 70px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
