import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f6f3ff",
          100: "#eee8ff",
          200: "#ddd0ff",
          300: "#c3adff",
          400: "#9c7cff",
          500: "#7b4fe9",
          600: "#6334d8",
          700: "#5127b8",
          800: "#452398",
          900: "#3a207d",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e8e8ec",
          300: "#d6d6dc",
          400: "#9a9aa4",
          500: "#73737d",
          600: "#565660",
          700: "#3d3d46",
          800: "#292930",
          900: "#18181d",
        },
        success: "#23955a",
        warning: "#c57b1b",
        error: "#c94040",
      },
      boxShadow: {
        soft: "0 12px 35px rgba(33, 25, 61, 0.08)",
        card: "0 4px 18px rgba(26, 22, 42, 0.06)",
      },
      borderRadius: {
        xl: "0.85rem",
        "2xl": "1.15rem",
      },
    },
  },
};

export default config;
