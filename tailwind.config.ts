import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'gray-0': '#FFF',
      'gray-100': '#EDEDED',
      'gray-200': '#D7D8DA',
      'gray-300': '#BEBEBE',
      'gray-400': '#8B959A',
      'gray-500': '#404548',
      'gray-600': '#282C2E',
      'gray-700': '#1F2324',
      'gray-800': '#151718',
      'gray-900': '#0C0D0E',
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
