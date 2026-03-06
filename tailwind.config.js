/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#101019',
        foreground: '#F3F6F4',
        surface: '#2C3220',
        primary: '#1F92EA',
        accent: '#E88821',
        brand: {
          dark: '#101019',
          light: '#F3F6F4',
          brown: '#2C3220',
          ocean: '#1F92EA',
          amber: '#E88821',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
