/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        emerald: {
          500: '#10b981',
        },
        blue: {
          100: '#dbeafe',
          600: '#2563eb',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
        },
        orange: {
          500: '#f97316',
        },
        yellow: {
          100: '#fef3c7',
          500: '#f59e0b',
        },
        purple: {
          500: '#a855f7',
        },
        gray: {
          500: '#6b7280',
        },
      },
    },
  },
  plugins: [],
}
