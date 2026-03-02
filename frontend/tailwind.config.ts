import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          DEFAULT: '#4640DE',
          25: '#F1F0FF',
          50: '#E9E8FF',
          100: '#C8C6FF',
          200: '#A9A5FF',
          300: '#7B76FF',
          400: '#5D58F0',
          500: '#4640DE',
          600: '#3730C2',
          700: '#2A239B',
          800: '#1E1874',
          900: '#130D52',
        },
        // Neutrals
        neutrals: {
          0: '#FFFFFF',
          10: '#F8F8FD',
          20: '#D6DDEB',
          40: '#B8C1CC',
          60: '#7C8493',
          80: '#515B6F',
          100: '#25324B',
        },
        // Semantic
        success: '#56CDAD',
        warning: '#FFB836',
        error: '#FF6550',
        info: '#26A4FF',
        // Label colors
        'label-green': '#56CDAD',
        'label-yellow': '#FFB836',
        'label-red': '#FF6550',
        'label-purple': '#615CF4',
        'label-blue': '#4640DE',
      },
      fontFamily: {
        sans: ['Epilogue', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '90px', fontWeight: '700' }],
        'display-lg': ['56px', { lineHeight: '72px', fontWeight: '700' }],
        'h1': ['48px', { lineHeight: '60px', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '52px', fontWeight: '600' }],
        'h3': ['32px', { lineHeight: '42px', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-xl': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '20px', fontWeight: '400' }],
      },
      boxShadow: {
        'card': '0px 2px 10px rgba(0, 0, 0, 0.06)',
        'card-hover': '0px 8px 30px rgba(0, 0, 0, 0.12)',
        'search': '0px 4px 20px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
