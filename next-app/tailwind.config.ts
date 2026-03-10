/** @type {import('tailwindcss').Config} */
declare var require: any;
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  /*
   * DAISYUI CONFIGURATION
   * =====================
   * themes: ["light"] - Only include the light theme, excluding all dark themes
   * darkTheme: false  - Disable automatic dark theme detection based on
   *                     prefers-color-scheme media query
   *
   * Without this configuration, DaisyUI v4 automatically:
   * 1. Includes multiple themes (light, dark, etc.)
   * 2. Switches to dark theme when system preference is dark
   *
   * This ensures consistent light mode appearance regardless of user's
   * system preferences.
   */
  daisyui: {
    themes: ["light"],
    darkTheme: false,
  },

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-content": "#ffffff",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "secondary-content": "#ffffff",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "accent-content": "#ffffff",
        neutral: "#e5e5e5",
        "neutral-content": "#000000",
        "base-100": "#f8fafc",
        "base-100-content": "#000000",
        info: "#491f53",
        "info-content": "#ffffff",
        success: "#a7c947",
        "success-content": "#ffffff",
        warning: "#ff9900",
        "warning-content": "#ffffff",
        error: "#ff5724",
        "error-content": "#ffffff",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        "header-desktop": "1200px",
        "13inch": "1440px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "collapsible-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addBase, theme }) {
      addBase({
        body: {
          backgroundColor: theme("colors.base-100"),
        },
      });
    },
    require("tailwindcss-animate"),
  ],
};
