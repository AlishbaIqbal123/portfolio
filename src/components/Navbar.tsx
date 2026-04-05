import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Star } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'SKILLS', href: '/skills' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'EXPERIENCE', href: '/experience' },
  { name: 'TIPS', href: '/tips' },
  { name: 'CONTACT', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 5) {
      navigate('/login');
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 3000);
    if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/');
  };

  return (
    <>
      {/* Fixed top navbar — clean, minimal, no extra spacing */}
      <div className="fixed top-0 left-0 right-0 z-[200] px-4 md:px-8 pt-3 pb-2">
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`
            max-w-6xl mx-auto h-14 flex items-center justify-between px-5 md:px-8
            backdrop-blur-xl border transition-all duration-500
            ${isDark 
              ? `bg-card/80 border-border rounded-xl ${isScrolled ? 'shadow-lg' : ''}` 
              : `bg-white/80 border-border rounded-2xl ${isScrolled ? 'shadow-md' : ''}`
            }
          `}
        >
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 group"
          >
            <span className={`text-base font-bold tracking-[0.15em] uppercase transition-colors ${isDark ? 'text-primary' : 'text-foreground'}`}>
              Alishba
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`
                  px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] 
                  transition-all relative
                  ${isActive(link.href) 
                    ? 'text-primary font-semibold' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Theme toggle + Mobile menu */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300
                ${isDark 
                  ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                  : 'bg-muted text-muted-foreground hover:bg-border'
                }
              `}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu — Light Mode: Slide-in editorial */}
      <AnimatePresence>
        {isMobileMenuOpen && !isDark && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[190] bg-background/98 backdrop-blur-xl p-8 pt-24 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center gap-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-4 text-4xl md:text-5xl font-bold tracking-tight leading-none transition-colors ${
                      isActive(link.href) ? 'text-primary' : 'text-foreground/20 hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mobile Menu — Dark Mode: Grid cards */}
        {isMobileMenuOpen && isDark && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[190] bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-4 p-6 max-w-sm">
               {navLinks.map((link, idx) => (
                 <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                 >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block p-6 border rounded-xl text-center transition-all ${
                        isActive(link.href) 
                          ? 'bg-primary/10 border-primary text-primary' 
                          : 'bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                      }`}
                    >
                       <span className="text-xs font-semibold tracking-[0.15em] uppercase">{link.name}</span>
                    </Link>
                 </motion.div>
               ))}
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 w-12 h-12 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
