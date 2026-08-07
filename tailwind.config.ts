import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary - Funtush Deep Blue
        primary: {
          DEFAULT: '#6C72FF',
          main: '#6C72FF',
        },
        secondary: {
         DEFAULT: '#101935',
          dark: '#101935',    // Color 1
          purple: '#343B4F',  // Color 2
          cyan: '#57C3FF',    // Color 3
          blue: '#9A91FB',    // Color 4
          yellow: '#FDB52A',  // Color 5
        },
        // Accent - Funtush Sky Blue
        accent: {
          Color1: '#6c72FF', // Sky Blue
          Color2: '#6C72FF', // Cyan
        },
        // Success
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        // Danger/Error
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Warning
        warning: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Neutral
        neutral: {
          100: '#FFFFFF',
          200: '#D9E1FA',
          300: '#D1DBF9',
          400: '#AEB9E1',
          500: '#7E89AC',
          600: '#37446B',
          700: '#212C4D',
          800: '#080F25',
        },
        // Semantic - UI states
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        input: 'hsl(var(--input))',
        'input-focus': 'hsl(var(--input-focus))',
        border: 'hsl(var(--border))',
        'border-secondary': 'hsl(var(--border-secondary))',
        ring: 'hsl(var(--ring))',
        'ring-offset': 'hsl(var(--ring-offset))',
      },
          spacing: {
      "0": "0px",
      "px": "1px",
      "0.5": "0.125rem",  // 2px
      "1": "0.25rem",     // 4px
      "1.5": "0.375rem",  // 6px
      "2": "0.5rem",      // 8px
      "2.5": "0.625rem",  // 10px
      "3": "0.75rem",     // 12px
      "3.5": "0.875rem",  // 14px
      "4": "1rem",        // 16px
      "5": "1.25rem",     // 20px
      "6": "1.5rem",      // 24px
      "7": "1.75rem",     // 28px
      "8": "2rem",        // 32px
      "9": "2.25rem",     // 36px
      "10": "2.5rem",     // 40px
      "11": "2.75rem",    // 44px
      "12": "3rem",       // 48px
      "14": "3.5rem",     // 56px
      "16": "4rem",       // 64px
      "20": "5rem",       // 80px
      "24": "6rem",       // 96px
      "28": "7rem",       // 112px
      "32": "8rem",       // 128px
      "36": "9rem",       // 144px
      "40": "10rem",      // 160px
      "44": "11rem",      // 176px
      "48": "12rem",      // 192px
      "52": "13rem",      // 208px
      "56": "14rem",      // 224px
      "60": "15rem",      // 240px
      "64": "16rem",      // 256px
      "72": "18rem",      // 288px
      "80": "20rem",      // 320px
      "96": "24rem",      // 384px
    },
      fontSize: {
        // Desktop & Mobile Headings + Body Text with exact Figma Line Heights
        '5xl': ['3rem', { lineHeight: '3rem' }],         // 48px / 48px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px / 40px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px / 36px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px / 32px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px / 28px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px / 28px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px / 24px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px / 20px
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px / 16px
      },
      // fontWeight: {
      //   light: '300',
      //   normal: '400',
      //   medium: '500',
      //   semibold: '600',
      //   bold: '700',
      //   extrabold: '800',
      // },
      borderRadius: {
        'none': '0px',
        'sm': '2px',     // 2px
        DEFAULT: '4px',  // .rounded (4px)
        'md': '6px',     // 6px
        'lg': '8px',     // 8px
        'xl': '12px',    // 12px
        '2xl': '16px',   // 16px
        '3xl': '24px',   // 24px
        'full': '9999px', // 50%
      },
      boxShadow: {
        // Figma Effect Styles shadow values
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      opacity: {
        disabled: '0.5',
        hover: '0.8',
      },
    },
  },
  plugins: [],
};

export default config;
