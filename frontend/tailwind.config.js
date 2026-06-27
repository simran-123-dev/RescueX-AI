export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 60px rgba(56, 189, 248, 0.15)'
      },
      backgroundImage: {
        'glass-grid': 'radial-gradient(circle at top, rgba(56, 189, 248, 0.08), transparent 25%), radial-gradient(circle at bottom right, rgba(125, 211, 252, 0.1), transparent 20%)'
      }
    }
  },
  plugins: []
};
