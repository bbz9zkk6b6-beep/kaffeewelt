import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf7f2',
          100: '#f5ede3',
          200: '#ead7c8',
          300: '#dfc3ad',
          400: '#d4ad92',
          500: '#c99777',
          600: '#b38160',
          700: '#9d6b49',
          800: '#875532',
          900: '#6b421a',
        },
      },
    },
  },
  plugins: [],
}

export default config
