/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores base (solo para referencia)
        'jet-black': '#002b36',
        'cinnabar': '#ff3b30',
        'graphite': '#2e2e2e',
        'cool-steel': '#a7b0b5',
        'medium-jungle': '#4caf50',
        // Colores del sistema que se adaptan al tema
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // Variables específicas para backgrounds de componentes
        'button-background': 'var(--button-background)',
        'tab-background': 'var(--tab-background)',
        'card-background': 'var(--card-background)',
        'input-background': 'var(--input-background)',
        'navbar-background': 'var(--navbar-background)',
        // Compatibilidad con nombres antiguos (deprecated - usar muted)
        graphite: 'var(--muted)',
        'cool-steel': 'var(--muted-foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
