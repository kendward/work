import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropImage: {
        'create-project-bg': 'url("/images/project-background.png")',
      },
      colors: {
        "clr-blue-primary": "#4A7BF6",
        "clr-warning": "#FFAB00",
        "clr-danger": "#DC0100",
        "clr-background-light": "#D6D6D6",
        "clr-dark-primary": "#282828",
        "clr-dark-secondary": "#505050",
        "clr-light-gray": "#999999",
        "clr-bg-light": "#EFF0F2",
      },
      fontSize: {
        md: "16px",
      },
      borderWidth: {
        1: "1px",
        1.5: "1.5px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
