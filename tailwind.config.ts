import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c1324",
        surface: "#0c1324",
        "surface-dim": "#0c1324",
        "surface-bright": "#33394c",
        "surface-container-lowest": "#070d1f",
        "surface-container-low": "#151b2d",
        "surface-container": "#191f31",
        "surface-container-high": "#23293c",
        "surface-container-highest": "#2e3447",
        "surface-variant": "#2e3447",
        primary: "#adc6ff",
        "primary-container": "#4d8eff",
        secondary: "#4cd7f6",
        "secondary-container": "#03b5d3",
        tertiary: "#4edea3",
        "tertiary-container": "#00a572",
        "on-surface": "#dce1fb",
        "on-surface-variant": "#c2c6d6",
        "on-background": "#dce1fb",
        outline: "#8c909f",
        "outline-variant": "#424754",
        error: "#ffb4ab",
        "error-container": "#93000a"
      },
      borderRadius: {
        sm: "0.5rem",
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px"
      },
      spacing: {
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
        gutter: "16px",
        "container-padding": "24px",
        "section-gap": "64px",
        unit: "8px"
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      fontSize: {
        "headline-xl": ["clamp(2.25rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["clamp(1.75rem, 3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["1.5rem", { lineHeight: "1.3", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["0.75rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
        "label-sm": ["0.625rem", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "700" }]
      },
      boxShadow: {
        glow: "0 0 32px rgba(77, 142, 255, 0.32)",
        "cyan-glow": "0 0 32px rgba(76, 215, 246, 0.32)",
        "green-glow": "0 0 32px rgba(78, 222, 163, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
