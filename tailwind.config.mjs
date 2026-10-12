/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        habit: {
          0: '#FFEFC4', // level_0_empty
          1: '#97D7FF', // level_1_low
          2: '#4D8DBA', // level_2_medium
          3: '#086288', // level_3_high
          empty: '#FFEFC4',
          low: '#97D7FF',
          medium: '#4D8DBA',
          high: '#086288',
        },
        palette: {
          deep: '#086288',
          ocean: '#4D8DBA',
          sky: '#97D7FF',
          cream: '#FFEFC4',
        },
        surface: {
          light: '#FCFBF7',
          card: '#FFFFFF',
          muted: '#F3F8FC',
          dark: '#041821',
          'dark-card': '#072534',
          'dark-elevated': '#0A3347',
        },
      },
      boxShadow: {
        'soft-light': '0 6px 28px -4px rgba(8, 98, 136, 0.08), 0 2px 10px -2px rgba(77, 141, 186, 0.06)',
        'glow-dark': '0 0 30px -4px rgba(151, 215, 255, 0.20), 0 8px 24px -6px rgba(0, 0, 0, 0.65)',
        'glow-amber': '0 0 22px -2px rgba(255, 239, 196, 0.55)',
      },
    },
  },
  plugins: [],
};
