import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  // Por defecto es modo oscuro
  const [theme, setTheme] = useState<Theme>(() => {
    // Intentar obtener del localStorage, si no existe, usar 'dark' por defecto
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remover clases anteriores
    root.classList.remove('dark', 'light');
    
    // Agregar la clase del tema actual
    root.classList.add(theme);
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const setDarkMode = (enabled: boolean) => {
    setTheme(enabled ? 'dark' : 'light');
  };

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    setDarkMode,
  };
};
