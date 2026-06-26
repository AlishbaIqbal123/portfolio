import { Link } from 'react-router-dom';
import { Github, Linkedin, ArrowUp, Mail, Phone, Compass, Sparkles, RefreshCw, Cpu, Layers, Send } from 'lucide-react';
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
    <>
      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes scanline-anim {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.15; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-scan {
          animation: scanline-anim 6s infinite linear;
        }
        .animate-grid-shimmer {
          background-size: 200% auto;
          animation: gradient-shift 8s infinite linear;
        }
        .animate-drift {
          animation: drift 15s infinite ease-in-out;
        }
      `}</style>

      {isDark ? (
        /* 🌌 DARK THEME: CYBER HUD FUTURISTIC FOOTER */
        <footer className="relative py-20 px-6 md:px-16 lg:px-24 bg-[#070A13]/90 border-t border-sky-500/20 overflow-hidden font-sans text-left">
          {/* Animated top laser trail */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-grid-shimmer" 
               style={{ backgroundImage: 'linear-gradient(90deg, transparent, #0ea5e9, transparent, #06b6d4, transparent)' }} />
          
          {/* Moving scanline laser */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent h-[150px] w-full animate-scan pointer-events-none" />

          {/* HUD Tech Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Tech Info Header */}
            <div className="flex justify-between items-center pb-8 border-b border-sky-500/10 mb-12">
              <span className="font-mono text-[9px] text-cyan-500/50 tracking-[0.2em] uppercase select-none">
                [ SYS_TERM // LOGGED_IN ]
              </span>
              <span className="font-mono text-[9px] text-cyan-500/35 tracking-[0.2em] uppercase select-none">
                LOC_HOST: 127.0.0.1
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              
              {/* Brand HUD */}
              <div className="space-y-6 lg:col-span-2 pr-4 relative">
                <Link to="/" className="flex items-center gap-2 group w-fit">
                  <div className="font-mono text-cyan-500 border border-cyan-500/30 bg-cyan-950/20 px-2 py-1 text-xs rounded select-none group-hover:border-cyan-400 group-hover:bg-cyan-950/40 transition-all">
                    &lt; AI /&gt;
                  </div>
                  <span className="text-base font-black tracking-[0.25em] text-foreground uppercase group-hover:text-cyan-400 transition-colors">
                    Alishba Iqbal
                  </span>
                </Link>

                <p className="text-sm font-mono text-muted-foreground leading-relaxed max-w-sm">
                  Full stack engineer compiling scalable web products and responsive UI grids.
                </p>

                {/* Cyber HUD Status Panel */}
                <div className="flex flex-col gap-2 p-4 rounded bg-cyan-950/10 border border-cyan-500/10 w-fit">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-400 font-bold tracking-widest">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    AVAILABLE_FOR_CONTRACTS
                  </div>
                  <div className="text-[8px] font-mono text-cyan-500/50">
                    &gt;_ NODE_STATUS: ONLINE_ACTIVE
                  </div>
                </div>

                {/* Social icons in cyber blocks */}
                <div className="flex gap-2.5">
                  {[
                    { icon: Github, href: personalData.github, label: 'GITHUB' },
                    { icon: Linkedin, href: personalData.linkedin, label: 'LINKEDIN' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-sky-500/20 rounded bg-sky-950/5 text-muted-foreground hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-950/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
                    >
                      <social.icon className="w-4.5 h-4.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation HUD */}
              <div className="relative">
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/70 mb-6 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> [NAV_MODULE]
                </h3>
                <ul className="space-y-3 font-mono">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="group flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors"
                      >
                        <span className="text-cyan-500/30 group-hover:text-cyan-400 transition-colors">&gt;</span>
                        <span className="tracking-wide">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-sky-500/10 pt-3 mt-3">
                    <Link
                      to="/"
                      onClick={() => localStorage.removeItem('alishba-portfolio-preference')}
                      className="group flex items-center gap-1.5 text-xs text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                      <span>SYS_RESET_VIEW</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact HUD */}
              <div>
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/70 mb-6 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> [CONNECT_IO]
                </h3>
                <ul className="space-y-4 font-mono">
                  <li className="space-y-1">
                    <span className="text-[8px] text-cyan-500/40 tracking-wider block">// EMAIL_CHANNEL</span>
                    <a href={`mailto:${personalData.email}`} className="text-xs text-foreground hover:text-cyan-400 transition-colors">
                      {personalData.email}
                    </a>
                  </li>
                  <li className="space-y-1">
                    <span className="text-[8px] text-cyan-500/40 tracking-wider block">// PHONE_CHANNEL</span>
                    <a href={`tel:${personalData.phone}`} className="text-xs text-foreground hover:text-cyan-400 transition-colors">
                      {personalData.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* HUD Footer Status Bar */}
            <div className="pt-8 border-t border-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[9px]">
              <p className="text-cyan-500/40 tracking-wider">
                COPYRIGHT // © 2026 ALISHBA_IQBAL. SECURE_DECS.
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-3 py-1.5 border border-cyan-500/20 rounded bg-cyan-950/5 text-cyan-500/70 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                <span>SYS_TOP_SCROLL</span>
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </footer>
      ) : (
        /* 🏛️ LIGHT THEME: ELEGANT MINIMAL EDITORIAL FOOTER */
        <footer className="relative py-24 px-6 md:px-16 lg:px-24 bg-[#FAF7F2] border-t border-[#E5DFD6] overflow-hidden text-left">
          {/* Floating smooth pastel gradients for warm editorial feeling */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#EBE4D8] rounded-full blur-[120px] pointer-events-none opacity-40 animate-drift" />
          <div className="absolute bottom-0 left-1/4 w-[350px] h-[250px] bg-[#F1ECE2] rounded-full blur-[100px] pointer-events-none opacity-50 animate-drift" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
              
              {/* Brand Editorial */}
              <div className="space-y-6 lg:col-span-2 pr-6">
                <Link to="/" className="group w-fit block">
                  <h2 className="font-cormorant italic text-3xl font-normal text-foreground group-hover:text-primary transition-colors leading-none tracking-tight">
                    Alishba <span className="font-sans not-italic text-sm font-semibold tracking-[0.2em] ml-2 text-primary/80 uppercase">Iqbal</span>
                  </h2>
                </Link>

                <p className="text-sm font-cormorant italic text-muted-foreground/80 leading-relaxed max-w-sm">
                  Software engineer shaping digital layouts with editorial focus, elegant typography, and clean code.
                </p>

                {/* Clean capsule badge */}
                <div className="inline-block px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest text-[#7C5A37] bg-[#EFE8DD] border border-[#E3D9C9] select-none">
                  INQUIRE FOR INVITATIONS & FULL-TIME ROLES
                </div>

                {/* Minimal circle social links */}
                <div className="flex gap-3 pt-2">
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
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-[#DCD3C5] bg-white text-muted-foreground hover:border-primary hover:text-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Editorial */}
              <div>
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#7C5A37] mb-6 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Navigate
                </h3>
                <ul className="space-y-3.5">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-all duration-300"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary/70 scale-0 group-hover:scale-100 transition-all" />
                        <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-[#DCD3C5]/60 pt-3 mt-3">
                    <Link
                      to="/"
                      onClick={() => localStorage.removeItem('alishba-portfolio-preference')}
                      className="group flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-primary/70 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Change View Preference</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Editorial */}
              <div>
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#7C5A37] mb-6 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Contact
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#7C5A37] shrink-0 shadow-sm border border-[#E3D9C9]">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Email</span>
                      <a href={`mailto:${personalData.email}`} className="text-xs font-semibold text-[#5A4533] hover:text-primary transition-colors">
                        {personalData.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#7C5A37] shrink-0 shadow-sm border border-[#E3D9C9]">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Phone</span>
                      <a href={`tel:${personalData.phone}`} className="text-xs font-semibold text-[#5A4533] hover:text-primary transition-colors">
                        {personalData.phone}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar Editorial */}
            <div className="pt-8 border-t border-[#DCD3C5] flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs font-cormorant italic text-muted-foreground/80">
                © 2026 {personalData.name}. All rights reserved in style.
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#DCD3C5] bg-white text-xs font-bold text-[#5A4533] hover:text-primary hover:border-primary hover:shadow-md transition-all duration-300 shadow-sm"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
