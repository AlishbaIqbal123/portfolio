import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, ArrowUp, Heart, Code2 } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { personalData } from '@/data/personal';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Education', href: '/education' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t border-white/5 relative z-20 ${isDark ? 'bg-[var(--oxford-blue)]' : 'bg-[var(--isabelline)]'}`}>
      <div className="container-custom py-20 lg:py-32">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link to="/" className="text-5xl font-black text-[var(--primary)] italic tracking-tighter mb-8 block leading-none">
              {personalData.name.split(' ')[0]} <span className="text-white/20">/</span> {personalData.name.split(' ')[1]}
            </Link>
            <p className="text-[var(--muted-foreground)] mb-10 max-w-sm font-medium leading-relaxed">
              Focusing on the convergence of software engineering paradigms and intuitive digital experiences.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: personalData.github, label: 'GitHub' },
                { icon: Linkedin, href: personalData.linkedin, label: 'LinkedIn' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--oxford-blue)] transition-all duration-500"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-8">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-lg font-black italic text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-8">Direct Access</h3>
            <ul className="space-y-4 text-lg font-black italic">
              <li>
                <a href={`mailto:${personalData.email}`} className="text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors">
                  Mail
                </a>
              </li>
              <li>
                <a href={`tel:${personalData.phone}`} className="text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors">
                  Phone
                </a>
              </li>
              <li className="text-[var(--foreground)]/30 tracking-tight">{personalData.location}</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[var(--muted-foreground)] text-[10px] font-black uppercase tracking-[0.2em] flex flex-wrap justify-center items-center gap-6"
          >
            <span>© 2026 {personalData.name}</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-2">
              Made with <Heart className="w-3.5 h-3.5 text-[var(--primary)] fill-current" />
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5" />
              TSX + OGL
            </span>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--oxford-blue)] transition-all duration-500 border border-white/10"
          >
            <span className="text-xs font-black uppercase tracking-widest">Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
