import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  // Toggle the theme between dark and light
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  // Load the saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
