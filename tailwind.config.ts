import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        neutral: {
          '000': '#FFFFFF',
          '100': '#ADB1BA',
          '200': '#ADB1BA',
          '300': '#868B94',
          '400': '#6D717A',
          '500': '#4D4F54',
          '600': '#2B2E33',
          '700': '#212124',
          '800': '#17171A',
        },
        main: {
          orange: '#E5684C',
        },
      },
      borderRadius: {
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
export default config
