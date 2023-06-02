/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '1140': '71.25rem',
        '1024': '64rem',
        '768': '48rem'
      },
      screens: {
        'laptop-g': {'max': '1240px'},
        'laptop-m': {'max': '1140px'},
        'laptop-p': {'max': '1024px'},
        'tablet-m': {'max': '868px'},
        'tablet-p': {'max': '768px'},
        'mobile-gg': {'max': '650px'},
        'mobile-g': {'max': '425px'},
        'mobile-m': {'max': '375px'},
        'mobile-p': {'max': '320px'}
      },
      backgroundImage: {
        'user': "url('/src/assets/images/user.png')",
        'edit': "url('/src/assets/images/pencil.png')",
        'camera': "url('/src/assets/images/camera.png')",
        'camera-white': "url('/src/assets/images/camera-white.png')"
      },
      backgroundSize: {
        '80%': '80%',
      }
    },
  },
  plugins: [],
}

