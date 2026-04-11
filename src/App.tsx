import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GadgetBackground } from '@/components/GadgetBackground';
import { CustomCursor } from '@/components/CustomCursor';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Toaster } from 'sonner';

// Pages
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { SkillsPage } from '@/pages/SkillsPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { EducationPage } from '@/pages/EducationPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminPage } from '@/pages/AdminPage';
import { TipsPage } from '@/pages/TipsPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { TipDetailPage } from '@/pages/TipDetailPage';

// Animated routes component
function AnimatedRoutes() {
  const location = useLocation();

  return (
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            {[
                { path: '/', element: <HomePage /> },
                { path: '/login', element: <LoginPage /> },
                { path: '/tips', element: <TipsPage /> },
                { path: '/tips/:id', element: <TipDetailPage /> },
                { path: '/projects/:id', element: <ProjectDetailPage /> },
                { path: '/about', element: <AboutPage /> },
                { path: '/skills', element: <SkillsPage /> },
                { path: '/projects', element: <ProjectsPage /> },
                { path: '/experience', element: <ExperiencePage /> },
                { path: '/education', element: <EducationPage /> },
                { path: '/contact', element: <ContactPage /> },
            ].map(({ path, element }) => (
                <Route 
                    key={path}
                    path={path} 
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full relative z-10"
                        >
                            {element}
                        </motion.div>
                    } 
                />
            ))}
            
            <Route 
            path="/admin" 
            element={
                <ProtectedRoute>
                    <AdminPage />
                </ProtectedRoute>
            } 
            />
        </Routes>
        </AnimatePresence>
  );
}

function AppLayout() {
  const location = useLocation();
  const { isDark } = useTheme();
  
  // No navbar/footer/background for Admin or Project Demo
  const isAdmin = location.pathname.startsWith('/admin');
  const isDemo = location.pathname.includes('/projects/') && location.pathname !== '/projects';

  return (
    <div className={`min-h-screen bg-transparent text-[var(--foreground)] transition-colors duration-1000 relative selection:bg-primary selection:text-primary-foreground ${isAdmin ? 'admin-theme' : ''}`}>
      <CustomCursor />
      
      {!isAdmin && <GadgetBackground />}
      {!isAdmin && !isDemo && <Navbar />}

      {/* 
          Dynamic Content Padding:
          - Light Mode: pt-40 (Top Bar)
          - Dark Mode: pb-40 (Bottom HUD) 
      */}
      <main className={`
        min-h-screen relative z-10 transition-all duration-1000
        ${isAdmin ? 'p-0' : isDemo ? 'p-0' : ''}
      `}>
        <AnimatedRoutes />
      </main>

      {!isAdmin && !isDemo && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-right" richColors theme="dark" />
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
