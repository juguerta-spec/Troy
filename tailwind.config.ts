import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#C0C0C0",
        dark: "#0a0a0a",
        silver: "#C0C0C0",
        "silver-light": "#F5F5F7",
        "silver-dark": "#86868b",
        "warm-white": "#FAFAF9",
        "cream": "#F8F7F4",
        gold: "#C9A84C",
        "gold-light": "#E2C97A",
        "gold-dark": "#9D7E30",
        "gold-muted": "#C9A84C1A",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "card": "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        "card-dark": "0 2px 8px rgba(0,0,0,0.3), 0 16px 48px rgba(0,0,0,0.4)",
        "glow": "0 0 80px rgba(192,192,192,0.25)",
        "glow-sm": "0 0 40px rgba(192,192,192,0.15)",
        "glow-lg": "0 0 120px rgba(192,192,192,0.2)",
        "glow-white": "0 0 60px rgba(255,255,255,0.08)",
        "inner-border": "inset 0 0 0 1px rgba(255,255,255,0.08)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.06)",
        "elevated": "0 24px 48px -12px rgba(0,0,0,0.25)",
        "elevated-lg": "0 32px 64px -16px rgba(0,0,0,0.35)",
        "soft": "0 2px 12px rgba(0,0,0,0.04)",
        "premium": "0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.1), 0 24px 48px rgba(0,0,0,0.06)",
        "premium-hover": "0 1px 2px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.14), 0 32px 64px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "shimmer": "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%)",
        "shine": "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.1) 50%, transparent 80%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "shine": "shine 6s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "glow-pulse": "glowPulse 5s ease-in-out infinite",
        "gradient-x": "gradientX 8s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "border-flow": "borderFlow 4s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "50%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        borderFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      fontSize: {
        "display": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-sm": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
      },
    },
  },
  plugins: [],
};
export default config;
