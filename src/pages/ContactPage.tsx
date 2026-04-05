import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Loader2 } from 'lucide-react';
import { personalData } from '@/data/personal';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

export function ContactPage() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  const inputClass = `w-full h-12 bg-transparent border-b border-border px-1 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40 ${
    isDark ? 'text-foreground' : 'text-foreground'
  }`;

  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500">
      
      {/* Header */}
      <section className="pt-24 pb-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {!isDark ? (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Get in Touch</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Contact</h1>
              <p className="text-muted-foreground max-w-lg">
                Let's discuss new projects, creative ideas, or opportunities for collaboration.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">Reach Out</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Contact</h1>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                I'm always open to hearing about new opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className={isDark ? 'architect-card' : 'silk-card'}>
              <h2 className="text-lg font-bold mb-6 text-foreground">Contact Info</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', val: personalData.email, href: `mailto:${personalData.email}` },
                  { icon: Phone, label: 'Phone', val: personalData.phone, href: `tel:${personalData.phone}` },
                  { icon: MapPin, label: 'Location', val: personalData.location, href: '#' }
                ].map((item, i) => (
                  <a key={i} href={item.href} className="flex items-start gap-4 group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isDark ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">{item.label}</span>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.val}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border flex gap-3">
                {[
                  { icon: Github, href: personalData.github },
                  { icon: Linkedin, href: personalData.linkedin }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noreferrer" className={`w-10 h-10 flex items-center justify-center transition-all ${
                    isDark 
                      ? 'bg-card border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30' 
                      : 'bg-muted rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}>
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className={`${isDark ? 'architect-card' : 'silk-card'} space-y-6`}>
              <h2 className="text-lg font-bold text-foreground mb-2">Send a Message</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-muted-foreground block mb-2">Your Name</label>
                  <input 
                    required type="text" placeholder="John Doe"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-2">Your Email</label>
                  <input 
                    required type="email" placeholder="john@example.com"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-2">Subject</label>
                <input 
                  required type="text" placeholder="Regarding..."
                  value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-2">Message</label>
                <textarea 
                  required rows={5} placeholder="Type your message here..."
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className={`w-full bg-transparent border border-border p-4 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40 min-h-[140px] ${
                    isDark ? 'rounded-lg' : 'rounded-2xl'
                  }`}
                />
              </div>

              <button disabled={loading} className="imperial-btn w-full py-4 justify-center">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className={`max-w-4xl mx-auto p-10 text-center ${isDark ? 'architect-card' : 'silk-card'}`}>
          <blockquote className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2">
            "Great communication is the foundation of great work."
          </blockquote>
          <p className="text-sm text-muted-foreground">— Let's start a conversation</p>
        </div>
      </section>
    </div>
  );
}
