import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type AdminTheme = 'doraemon' | 'barbie';

interface AdminThemeContextType {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>(() => {
    const saved = localStorage.getItem('admin-theme') as AdminTheme;
    return saved || 'doraemon';
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', theme);
    // Apply theme class to a specific container or body
    const root = document.documentElement;
    if (theme === 'doraemon') {
      root.classList.add('admin-doraemon');
      root.classList.remove('admin-barbie');
    } else {
      root.classList.add('admin-barbie');
      root.classList.remove('admin-doraemon');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'doraemon' ? 'barbie' : 'doraemon');
  };

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (context === undefined) {
    throw new Error('useAdminTheme must be used within an AdminThemeProvider');
  }
  return context;
}
