/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};





module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}", "./index.html"],
  darkMode: "class",
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        // Primary Colors
        primary: {
          green: "var(--primary-green)",
          'green-light': "var(--primary-green-light)",
          orange: "var(--primary-orange)",
          'orange-dark': "var(--primary-orange-dark)",
          'orange-light': "var(--primary-orange-light)"
        },
        // Background Colors
        background: {
          main: "var(--bg-main)",
          secondary: "var(--bg-secondary)",
          input: "var(--bg-input)",
          cream: "var(--bg-cream)",
          'cream-light': "var(--bg-cream-light)",
          'cream-alt': "var(--bg-cream-alt)"
        },
        // Text Colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          white: "var(--text-white)",
          orange: "var(--text-orange)"
        },
        // Border Colors
        border: {
          orange: "var(--border-orange)",
          'orange-dark': "var(--border-orange-dark)",
          cream: "var(--border-cream)",
          white: "var(--border-white)"
        },
        // Component Colors
        button: {
          primary: "var(--button-primary-bg)",
          secondary: "var(--button-secondary-bg)",
          light: "var(--button-light-bg)",
          overlay: "var(--button-overlay-bg)"
        },
        footer: {
          background: "var(--footer-bg)"
        },
        line: {
          primary: "var(--line-primary)",
          secondary: "var(--line-secondary)"
        }
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'md': 'var(--font-size-md)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)',
        'extrabold': 'var(--font-weight-extrabold)'
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '7': 'var(--spacing-7)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)'
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)'
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'lato': ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
};
