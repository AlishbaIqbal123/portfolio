import { Link } from 'react-router-dom';
import { Github, Linkedin, ArrowUp, Mail, Phone, Compass, Sparkles, RefreshCw } from 'lucide-react';
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
    <footer className="relative py-20 px-6 md:px-16 lg:px-24 border-t border-border bg-card/20 backdrop-blur-xl transition-all duration-500 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-primary/30 before:to-transparent">
      {/* Decorative top blur glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-sm overflow-hidden group-hover:border-primary/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                A
              </div>
              <span className="text-base font-black tracking-[0.15em] text-foreground group-hover:text-primary transition-colors duration-300 uppercase">
                Alishba Iqbal
              </span>
            </Link>

            <p className="text-sm text-muted-foreground/85 leading-relaxed max-w-sm">
              Software engineer building elegant digital experiences with modern tools and clean architecture.
            </p>

            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              AVAILABLE FOR NEW OPPORTUNITIES
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Github, href: personalData.github, label: 'GitHub' },
                { icon: Linkedin, href: personalData.linkedin, label: 'LinkedIn' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 flex items-center justify-center border rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                    isDark 
                      ? 'bg-card border-border hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]' 
                      : 'bg-muted border-transparent hover:border-primary/20 hover:text-primary hover:bg-primary/5 shadow-sm'
                  }`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.20em] text-primary/80 mb-6 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" /> Navigate
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <span className="w-1.5 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-border/40 pt-3 mt-3">
                <Link
                  to="/"
                  onClick={() => localStorage.removeItem('alishba-portfolio-preference')}
                  className="group flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-all duration-300 font-semibold"
                >
                  <RefreshCw className="w-3 h-3 text-primary/70 group-hover:rotate-180 transition-transform duration-700" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Change View Preference</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.20em] text-primary/80 mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border text-primary/70 shrink-0 ${
                  isDark ? 'bg-muted/40 border-border' : 'bg-muted border-transparent'
                }`}>
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase block mb-0.5">Email</span>
                  <a href={`mailto:${personalData.email}`} className="text-xs text-foreground hover:text-primary transition-colors font-medium">
                    {personalData.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border text-primary/70 shrink-0 ${
                  isDark ? 'bg-muted/40 border-border' : 'bg-muted border-transparent'
                }`}>
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase block mb-0.5">Phone</span>
                  <a href={`tel:${personalData.phone}`} className="text-xs text-foreground hover:text-primary transition-colors font-medium font-mono">
                    {personalData.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground/80 font-medium">
            © 2026 {personalData.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className={`group flex items-center gap-2 px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              isDark 
                ? 'bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-primary hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)]' 
                : 'bg-muted border-transparent hover:border-primary/20 text-muted-foreground hover:text-primary hover:bg-primary/5 shadow-sm'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
