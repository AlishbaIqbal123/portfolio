import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Download, Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { personalData } from '@/data/personal';
import { getCertifications } from '@/lib/api';
import { StaggeredMenu } from '@/components/ui/StaggeredMenu';

const navLinks = [
  { name: 'HOME', href: '/portfolio' },
  { name: 'ABOUT', href: '/about' },
  { name: 'SKILLS', href: '/skills' },
  { name: 'CERTIFICATIONS', href: '/certifications' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'EXPERIENCE', href: '/experience' },
  { name: 'TIPS', href: '/tips' },
  { name: 'CONTACT', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [hasCerts, setHasCerts] = useState(false);

  useEffect(() => {
    async function checkCertifications() {
      try {
        const certs = await getCertifications();
        setHasCerts(certs && certs.length > 0);
      } catch (err) {
        console.error('Error fetching certifications for navbar:', err);
      }
    }
    checkCertifications();
  }, []);

  const visibleNavLinks = navLinks.filter(link => {
    if (link.name === 'CERTIFICATIONS') {
      return hasCerts;
    }
    return true;
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleNavLinkClick = (href: string) => {
    localStorage.setItem('alishba-portfolio-preference', 'multi');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 5) {
      navigate('/login');
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 3000);
    if (location.pathname === '/portfolio') window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/portfolio');
  };

  const menuItems = visibleNavLinks.map(link => ({
    label: link.name,
    ariaLabel: `Navigate to ${link.name}`,
    link: link.href
  }));

  const socialItems = [
    { label: 'LinkedIn', link: personalData.linkedin || '#' },
    { label: 'GitHub', link: personalData.github || '#' }
  ];

  return (
    <>
      {/* Desktop Navbar - visible only on lg screens */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-[200] px-8 pt-3 pb-2">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`
            max-w-6xl mx-auto h-14 flex items-center justify-between px-8
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
          <div className="flex items-center gap-1">
            {visibleNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleNavLinkClick(link.href)}
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
                    transition={{ type: 'spring', stiffness: 40, damping: 15 }}
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Story Mode + CV Download + Theme toggle */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                localStorage.setItem('alishba-portfolio-preference', 'story');
                navigate('/story');
              }}
              className={`flex items-center gap-2 h-9 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 border
                ${isDark 
                  ? 'border-primary/30 bg-primary/5 text-primary hover:bg-primary/15 hover:border-primary/50' 
                  : 'border-border bg-muted/40 text-foreground hover:bg-muted/70'
                }
              `}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Story Mode</span>
            </button>

            <button 
              onClick={() => {
                window.open('/resume', '_blank');
              }}
              className={`flex items-center gap-2 h-9 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300
                ${isDark 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-foreground text-background hover:bg-foreground/90'
                }
              `}
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>

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
          </div>
        </motion.nav>
      </div>

      {/* Mobile/Tablet Navbar - visible on < lg screens */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed={true}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
        />
      </div>
    </>
  );
}
