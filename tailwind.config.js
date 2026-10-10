/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keep ink scale for component backgrounds (blacks/dark cards)
        ink: {
          950: '#000000',
          900: '#0a0a0a',
          850: '#111111',
          800: '#1a1a1a',
          750: '#222222',
          700: '#2a2a2a',
          600: '#3d3d3d',
          500: '#555555',
          400: '#737373',
          300: '#a3a3a3',
          200: '#d4d4d4',
          100: '#e8e8e8',
          50:  '#f5f5f5',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 9s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s infinite linear',
        'scan':          'scanLine 3s ease-in-out infinite',
        'radar':         'radarSweep 4s linear infinite',
        'blink':         'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', filter: 'blur(20px)' },
          '50%':      { opacity: '0.7', filter: 'blur(28px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanLine: {
          '0%':   { top: '0%' },
          '50%':  { top: '95%' },
          '100%': { top: '0%' },
        },
        radarSweep: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      boxShadow: {
        'glow-sm':   '0 2px 12px -2px rgba(0,0,0,0.15)',
        'glow-md':   '0 4px 24px -4px rgba(0,0,0,0.20)',
        'glow-lg':   '0 8px 40px -8px rgba(0,0,0,0.25)',
        'glow-xl':   '0 12px 60px -10px rgba(0,0,0,0.30)',
        'card':      '0 2px 16px -4px rgba(0,0,0,0.10)',
        'card-hover':'0 8px 32px -8px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
}
