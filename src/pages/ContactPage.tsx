import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { personalData } from '@/data/personal';
import { useForm, ValidationError } from '@formspree/react';

export function ContactPage() {
  const [state, handleSubmit] = useForm("mjgevqjn");

  if (state.succeeded) {
    return (
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-20 rounded-[4rem] bg-[var(--card)]/40 backdrop-blur-3xl border border-white/5 shadow-3xl max-w-2xl mx-auto"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-10 border border-emerald-500/30">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-5xl font-black mb-6 italic tracking-tighter">Transmission Successful</h2>
          <p className="text-xl text-[var(--muted-foreground)] font-medium leading-relaxed mb-10">
            Your high-impact message has been received. I will review the blueprint and get back to you shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-12 py-6 bg-[var(--primary)] text-[var(--oxford-blue)] rounded-2xl font-black text-xl uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Send Another
          </button>
        </motion.div>
      </div>
    );
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Presence',
      value: personalData.location,
      href: null,
    },
    {
      icon: Phone,
      label: 'Inquiry',
      value: personalData.phone,
      href: `tel:${personalData.phone}`,
    },
    {
      icon: Mail,
      label: 'Digital Mail',
      value: personalData.email,
      href: `mailto:${personalData.email}`,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: personalData.github,
      color: 'hover:bg-slate-900',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personalData.linkedin,
      color: 'hover:bg-blue-800',
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen">
      <section className="section-padding pt-32 lg:pt-48 pb-40">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-40"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mb-8"
            >
              <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-black uppercase tracking-[0.2em] border border-[var(--primary)]/20 shadow-sm backdrop-blur-md">
                <MessageSquare className="w-4 h-4" />
                Connectivity
              </div>
            </motion.div>

            <h1 className="text-7xl md:text-[10rem] font-black mb-10 tracking-tighter leading-[0.85] italic">
              Initiate{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#A0B2C6]">
                Dialogue
              </span>
            </h1>

            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium leading-relaxed">
              Synthesizing collaborative opportunities and engineering excellence. Reach out for high-impact software initiatives.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-24 items-start">
            {/* Left - Contact Infrastructure */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12"
            >
              {/* Contact Channels */}
              <div className="space-y-8">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="group p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent hover:from-[var(--primary)]/30 transition-all duration-500"
                    >
                      <div className="p-10 rounded-[2.4rem] bg-[var(--card)]/40 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                        <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--primary)]/10 transition-all duration-500 border border-white/10 group-hover:border-[var(--primary)]/50">
                            <Icon className="w-9 h-9 text-[var(--primary)]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-[var(--muted-foreground)] mb-3 uppercase tracking-widest leading-none">{item.label}</p>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-2xl font-black text-[var(--foreground)] hover:text-[var(--primary)] transition-colors tracking-tight italic"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-2xl font-black tracking-tight italic">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Status Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="group p-10 rounded-[3rem] bg-gradient-to-br from-[var(--space-cadet)] to-[var(--oxford-blue)] text-[var(--isabelline)] shadow-2xl relative overflow-hidden border border-white/5"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                    <span className="font-black uppercase tracking-[0.2em] text-[10px] text-[var(--primary)]">Current Status</span>
                  </div>
                  <h3 className="text-3xl font-black mb-4 italic tracking-tight leading-tight text-[var(--isabelline)]">Open for Global Collaborations</h3>
                  <p className="text-[var(--isabelline)]/60 text-lg font-medium leading-relaxed italic">
                    Actively seeking high-impact software engineering roles and innovative project partnerships.
                  </p>
                </div>
              </motion.div>

              {/* Social Channels */}
              <div className="flex gap-6 pt-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-[var(--foreground)] ${social.color} hover:text-white transition-all duration-500 shadow-xl backdrop-blur-md`}
                      aria-label={social.label}
                    >
                      <Icon className="w-9 h-9" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Right - Contact Transmission Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-1 rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent"
            >
              <div className="p-12 md:p-20 rounded-[3.8rem] bg-[var(--card)]/50 backdrop-blur-3xl border border-white/5 shadow-3xl">
                <h2 className="text-5xl font-black mb-12 tracking-tighter italic">The Blueprint</h2>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-4">
                    <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-2 ml-2">
                      Full Identity
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-8 py-6 rounded-3xl bg-white/5 border border-white/10 text-[var(--foreground)] font-black italic placeholder-white/20 focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 transition-all duration-300"
                      placeholder="ENTER NAME..."
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs ml-2" />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-2 ml-2">
                      Digital Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-8 py-6 rounded-3xl bg-white/5 border border-white/10 text-[var(--foreground)] font-black italic placeholder-white/20 focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 transition-all duration-300"
                      placeholder="ENTER EMAIL..."
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs ml-2" />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-2 ml-2">
                      Transmission Content
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-8 py-6 rounded-3xl bg-white/5 border border-white/10 text-[var(--foreground)] font-black italic placeholder-white/20 focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 transition-all duration-300 resize-none"
                      placeholder="COMMENCE COMMUNICATION..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs ml-2" />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={state.submitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-4 px-12 py-7 rounded-3xl font-black text-xl uppercase tracking-[0.2em] transition-all duration-700 shadow-2xl bg-[var(--primary)] text-[var(--oxford-blue)] shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {state.submitting ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-8 h-8" />
                        Initialize
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
