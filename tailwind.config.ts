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
      fontSize: {
        h0: [
          '32px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        h1: [
          '28px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        h2: [
          '24px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        h3: [
          '20px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        h4: [
          '18px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        h5: [
          '16px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        'h5-2': [
          '15px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        h6: [
          '14px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        h7: [
          '13px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.005em',
            fontWeight: 600,
          },
        ],
        'body0-2': [
          '28px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.02em',
            fontWeight: 400,
          },
        ],
        body0: [
          '18px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.02em',
            fontWeight: 400,
          },
        ],
        body1: [
          '16px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.02em',
            fontWeight: 400,
          },
        ],
        body2: [
          '15px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.02em',
            fontWeight: 400,
          },
        ],
        body3: [
          '14px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.02em',
            fontWeight: 400,
          },
        ],
        body4: [
          '13px',
          {
            lineHeight: '1.35',
            letterSpacing: '-0.02em',
            fontWeight: 400,
          },
        ],
      },
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
      keyframes: {
        enter: {
          '0%': {
            transform: 'translateY(20px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        leave: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
        },
      },
      animation: {
        enter: 'enter 300ms ease-out',
        leave: 'leave 300ms ease-in forwards',
      },
    },
  },
  plugins: [],
}
export default config
