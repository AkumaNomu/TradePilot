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
        "section-gap": "96px",
        unit: "8px"
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      fontSize: {
        "display-xl": ["clamp(3.75rem, 9vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.045em", fontWeight: "800" }],
        "display-lg": ["clamp(3rem, 7vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-xl": ["clamp(2.5rem, 5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        "headline-lg": ["clamp(2rem, 3.6vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["1.6rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-sm": ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.55", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["0.75rem", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "700" }],
        "label-sm": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.14em", fontWeight: "700" }],
        "mono-sm": ["0.75rem", { lineHeight: "1", letterSpacing: "0.04em", fontWeight: "500" }]
      },
      boxShadow: {
        glow: "0 0 32px rgba(77, 142, 255, 0.32)",
        "cyan-glow": "0 0 32px rgba(76, 215, 246, 0.32)",
        "green-glow": "0 0 32px rgba(78, 222, 163, 0.28)",
        "panel-lift": "0 40px 120px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" }
        },
        driftSlow: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(40px, -30px, 0) scale(1.05)" },
          "66%": { transform: "translate3d(-30px, 20px, 0) scale(0.95)" }
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        ringPulse: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" }
        },
        glint: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" }
        }
      },
      animation: {
        "float-y": "floatY 6s ease-in-out infinite",
        "drift-slow": "driftSlow 24s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        marquee: "marquee 40s linear infinite",
        "ring-pulse": "ringPulse 2.4s cubic-bezier(0,0,0.2,1) infinite",
        glint: "glint 3.5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
