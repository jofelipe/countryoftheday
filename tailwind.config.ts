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
    },
  },
  plugins: [],
};
export default config;
