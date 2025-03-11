module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/**/*", // เพิ่มเส้นทางนี้ถ้าใช้ไลบรารีจาก node_modules
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3b82f6',
          secondary: '#10b981',
        },
        fontFamily: {
          sans: ['Kanit', 'sans-serif'],
        },
        animation: {
          'bounce-slow': 'bounce 3s infinite',
        },
        boxShadow: {
          'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        spacing: {
          '18': '4.5rem',
        },
      },
    },
    plugins: [],
  }
  