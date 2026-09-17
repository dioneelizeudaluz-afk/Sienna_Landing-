export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sienna-black': '#0a0a0f',
        'sienna-dark': '#131320',
        'sienna-purple': '#8b5cf6',
        'sienna-violet': '#7c3aed',
        'sienna-glow': '#a78bfa',
      },
      animation: {
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.7)' },
          '50%': { boxShadow: '0 0 0 8px rgba(34,197,94,0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(139,92,246,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(139,92,246,0.6)' },
        },
      },
    },
  },
  plugins: [],
};