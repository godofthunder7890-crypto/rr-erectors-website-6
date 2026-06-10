import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';
import { supabase, type Service } from '@/lib/supabase';

const fallbackServices = [
  { id: 1, title: 'EOT Crane Erection & Commissioning', slug: 'eot-crane', icon: '🏗️', short_desc: 'Supply, erection, alignment, and commissioning of EOT/HOT cranes up to 150 tons, including load testing and safety certification.', category: 'Crane', detailed_body: null, created_at: '' },
  { id: 2, title: 'Industrial Chimney Erection & Repair', slug: 'chimneys', icon: '🏭', short_desc: 'Erection and structural repair of industrial RCC and steel chimneys. Rope access teams handle heights inaccessible by conventional scaffolding.', category: 'Chimney', detailed_body: null, created_at: '' },
  { id: 3, title: 'Bridge Girder Launching', slug: 'bridge-girder', icon: '🌉', short_desc: 'Precision launching of bridge girders for railway and highway infrastructure. Experienced in span-by-span and balanced cantilever methods.', category: 'Bridge', detailed_body: null, created_at: '' },
  { id: 4, title: 'PEB Structure Erection', slug: 'peb', icon: '🔩', short_desc: 'Erection of pre-engineered buildings including portal frames, roofing systems, and cladding for industrial and commercial clients.', category: 'Structure', detailed_body: null, created_at: '' },
  { id: 5, title: 'Heavy Machinery Shifting', slug: 'machinery', icon: '⚙️', short_desc: 'Safe relocation of heavy plant and machinery — presses, generators, transformers, and production equipment — with minimal operational downtime.', category: 'Shifting', detailed_body: null, created_at: '' },
  { id: 6, title: 'Crane Dismantling Services', slug: 'dismantling', icon: '🔧', short_desc: 'Complete dismantling of EOT cranes, gantry cranes, chimneys, and industrial structures with proper planning and safety measures.', category: 'Dismantling', detailed_body: null, created_at: '' },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: true });
        setServices(data && data.length > 0 ? data : (fallbackServices as Service[]));
      } catch {
        setServices(fallbackServices as Service[]);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];
  const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-16 md:py-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-bold uppercase tracking-widest text-primary mb-3">What We Offer</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4">Our Services</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg text-gray-400 max-w-2xl">
            Complete heavy industrial erection solutions — from single-crane commissions to full plant erection.
          </motion.p>
        </div>
      </div>

      {/* Filter */}
      {!loading && categories.length > 2 && (
        <div className="border-b border-border bg-card sticky top-16 md:top-20 z-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border p-6 animate-pulse">
                  <div className="w-10 h-10 bg-muted rounded mb-4" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(svc => (
                <motion.div key={svc.id} variants={scaleIn} className="bg-card border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all group">
                  <p className="text-3xl mb-4">{svc.icon || '⚙️'}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{svc.category}</p>
                  <h3 className="font-black text-lg uppercase tracking-tight mb-3 group-hover:text-primary transition-colors leading-tight">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.short_desc}</p>
                  {svc.detailed_body && (
                    <p className="mt-4 text-xs text-muted-foreground/60 leading-relaxed">{svc.detailed_body}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background border-t-4 border-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-3xl font-black uppercase mb-4">Need a Custom Solution?</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-gray-400 mb-8 max-w-xl mx-auto">
            Every project is different. Contact our team to discuss your specific requirements.
          </motion.p>
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Link href="/contact">
              <Button size="lg" className="font-bold uppercase tracking-widest px-10">Contact Us</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
