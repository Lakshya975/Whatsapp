const plugin = require('tailwindcss/plugin')
module.exports = {
  important: true,
  mode:'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [plugin(function({ addUtilities }) {
    const hideScrollBar ={
      '.hide-scrollbar': {
        /*working on  Firefox */
        'scrollbar-width': 'none',
  
        /* Chromeeee */
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }
    }
    addUtilities(hideScrollBar)
  }
  )],
}
