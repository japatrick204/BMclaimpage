module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#101418',
          accent: '#0B6B5B',
        },
        cta: '#005C44',
        canvas: '#F5F4F0',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        md: '12px',
      },
    },
  },
  plugins: [],
}; 