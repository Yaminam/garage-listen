import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        error: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
      },
    },
  },
  plugins: [],
} satisfies Config
