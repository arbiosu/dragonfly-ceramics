import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'df-text': '#33311d',
        'df-bg': '#eee4d1',
        dfNew: '#2b2340',
        dfNew2: '#dfd1ee',
      },
    },
  },
  plugins: [],
} satisfies Config;
