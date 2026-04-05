import { Link } from 'react-router-dom';
import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { personalData } from '@/data/personal';
import { useTheme } from '@/hooks/useTheme';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Tips', href: '/tips' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  const { isDark } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-6 md:px-16 lg:px-24 border-t border-border bg-background transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="text-xl font-bold text-foreground tracking-tight">
              Alishba Iqbal
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Software engineer building elegant digital experiences with modern tools and clean architecture.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: personalData.github },
                { icon: Linkedin, href: personalData.linkedin },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 flex items-center justify-center transition-all ${
                    isDark 
                      ? 'bg-card border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30' 
                      : 'bg-muted rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Navigate</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-xs text-muted-foreground block mb-0.5">Email</span>
                <a href={`mailto:${personalData.email}`} className="text-sm text-foreground hover:text-primary transition-colors">
                  {personalData.email}
                </a>
              </li>
              <li>
                <span className="text-xs text-muted-foreground block mb-0.5">Phone</span>
                <a href={`tel:${personalData.phone}`} className="text-sm text-foreground hover:text-primary transition-colors">
                  {personalData.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 {personalData.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 text-xs font-medium transition-colors ${
              isDark ? 'text-primary hover:text-foreground' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Back to top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
