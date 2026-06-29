import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Loader2, ExternalLink, ZoomIn, X, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { getCertifications } from '@/lib/api';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string;
  image_url: string;
  credential_id?: string;
  credential_url?: string;
  details: string;
  accent_color: string;
  icon: string;
  location: string;
}

export default function CertificationsPage() {
  const { isDark } = useTheme();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCertifications();
        setCertifications(data || []);
      } catch (err) {
        console.error('Error fetching certifications:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin w-8 h-8 text-primary mb-2" />
        <p className="text-xs text-muted-foreground">Loading credentials...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500 pb-20 text-left overflow-hidden">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            color: isDark ? '#ffffff' : '#7d0d1b'
          }}
        />
        
        {/* Radial accent glows */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.08] dark:opacity-[0.12] transition-colors duration-1000"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, #e1bb80 0%, transparent 70%)' 
              : 'radial-gradient(circle, #7d0d1b 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.08] dark:opacity-[0.12] transition-colors duration-1000"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, #e1bb80 0%, transparent 70%)' 
              : 'radial-gradient(circle, #7d0d1b 0%, transparent 70%)'
          }}
        />

        {/* Dynamic diagonal lines / structural elements (architectural vibe) */}
        {isDark && (
          <>
            <div className="absolute top-[20%] left-[5%] w-[30%] h-[1px] bg-primary/10 -rotate-12 transform origin-left" />
            <div className="absolute bottom-[30%] right-[5%] w-[40%] h-[1px] bg-primary/10 rotate-12 transform origin-right" />
            <div className="absolute top-[10%] right-[15%] w-[1px] h-[300px] bg-gradient-to-b from-primary/15 to-transparent" />
          </>
        )}
        
        {/* Editorial borders / grid columns (light mode vibe) */}
        {!isDark && (
          <>
            <div className="absolute top-0 left-[10%] w-[1px] h-full bg-[#7d0d1b]/5" />
            <div className="absolute top-0 right-[10%] w-[1px] h-full bg-[#7d0d1b]/5" />
          </>
        )}
      </div>

      {/* Header */}
      <section className="relative z-10 pt-24 pb-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {!isDark ? (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Credentials</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Certifications</h1>
              <p className="text-muted-foreground max-w-lg">
                Verified professional certifications, academic degrees, and industry simulations.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase mb-3">Credentials</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Certifications</h1>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                Verified professional certifications, academic degrees, and industry simulations.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex flex-col rounded-2xl overflow-hidden border border-border h-full group ${
                  isDark ? 'bg-card/45 backdrop-blur-md hover:border-primary/40' : 'bg-white hover:border-primary/20 shadow-sm'
                }`}
                style={{
                  boxShadow: isDark 
                    ? `0 10px 30px -15px ${cert.accent_color}1a` 
                    : '0 4px 20px -2px rgba(0,0,0,0.05)'
                }}
              >
                {/* Certificate Image Frame */}
                {cert.image_url ? (
                  <div 
                    onClick={() => setZoomImage(cert.image_url)}
                    className="relative aspect-[16/10] bg-slate-950 overflow-hidden border-b border-border cursor-zoom-in group/img"
                  >
                    <img 
                      src={cert.image_url} 
                      alt={cert.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white scale-90 group-hover/img:scale-100 transition-all">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                    {/* Floating badge */}
                    <div 
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1 backdrop-blur-md"
                      style={{ backgroundColor: `${cert.accent_color}d0` }}
                    >
                      <span>{cert.icon}</span>
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-muted border-b border-border flex items-center justify-center text-muted-foreground select-none">
                    <Award className="w-8 h-8 opacity-20" />
                  </div>
                )}

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {cert.name}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {cert.issue_date}
                      </span>
                      {cert.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {cert.location}
                        </span>
                      )}
                    </div>

                    {cert.credential_id && (
                      <div className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded w-fit select-all">
                        Credential ID: {cert.credential_id}
                      </div>
                    )}

                    {cert.details && (
                      <p className="text-xs text-muted-foreground/90 leading-relaxed pr-1 mt-2 line-clamp-3">
                        {cert.details}
                      </p>
                    )}
                  </div>

                  {/* Verification Link */}
                  {cert.credential_url && (
                    <div className="mt-4 pt-3 border-t border-border flex justify-end">
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5"
                      >
                        Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {certifications.length === 0 && (
              <div className="col-span-full text-center py-20 border border-dashed rounded-2xl border-border">
                <ShieldCheck className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <h3 className="text-sm font-semibold text-foreground">No certifications loaded</h3>
                <p className="text-xs text-muted-foreground mt-1">Add them from the admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setZoomImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full border border-white/20 text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img 
                src={zoomImage} 
                alt="Zoomed Certificate" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
