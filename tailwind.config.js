/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ".vitepress/**/*.{vue,js,ts,jsx,tsx}",
    "./docs/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        VPLight: "#3451b2",
        VPDark: "#a8b1ff",
      },
      animation: {
        'bounce': 'bounce 3s infinite',
        'bounce-delay-0': 'bounce 3s infinite',
        'bounce-delay-1': 'bounce 3s infinite 0.2s',
        'bounce-delay-2': 'bounce 3s infinite 0.4s',
        'bounce-delay-3': 'bounce 3s infinite 0.6s',
        'bounce-delay-4': 'bounce 3s infinite 0.8s',
        'bounce-delay-5': 'bounce 3s infinite 1s',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      willChange: {
        'transform': 'transform',
      },
      transformOrigin: {
        'gpu': 'translateZ(0)',
      }
    },
  },
  plugins: [],
  darkMode: "class",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {
    extend: {
      animation: ['responsive', 'motion-safe', 'motion-reduce'],
      transform: ['hover', 'focus'],
      opacity: ['hover', 'group-hover'],
    }
  }
};