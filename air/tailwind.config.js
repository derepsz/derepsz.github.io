/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        mono: 'var(--font-mono)',
      },
      spacing: {
        'nav': 'var(--spacing-nav)',
        'subnav': 'var(--spacing-subnav)',
        'section-offset': 'var(--spacing-section-offset)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
      },
      height: {
        'subnav': 'var(--height-subnav)',
        'footer': 'var(--height-footer)',
      },
    },
  },
  plugins: [],
}
