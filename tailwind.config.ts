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
          '100': '#EAEBEE',
          '200': '#ADB1BA',
          '300': '#868B94',
          '400': '#6D717A',
          '500': '#4D4F54',
          '600': '#2B2E33',
          '700': '#212124',
          '800': '#17171A',
        },
        orange: {
          '50': '#FDF5F3',
          '100': '#FCE8E4',
          '200': '#FBD5CD',
          '300': '#F7B8AA',
          '400': '#E5684C',
          '500': '#D24E30',
          '600': '#B03E25',
          '700': '#B32F1B',
          '800': '#8F281D',
        },
        purple: {
          '50': '#EFEFFD',
          '100': '#E7E7FD',
          '200': '#CDCDFA',
          '300': '#5D5FEF',
          '400': '#5456D7',
          '500': '#4A4CBF',
          '600': '#4647B3',
          '700': '#38398F',
          '800': '#2A2B6C',
        },
        yellow: {
          '100': '#FFDE59',
        },
        profile: {
          coral: '#E5684C',
          'dark-blue': '#5456D7',
          'sky-blue': '#0091FF',
          violet: '#A463FF',
          green: '#00B57C',
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
