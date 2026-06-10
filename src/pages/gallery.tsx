import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';
import { supabase, type GalleryItem } from '@/lib/supabase';

const fallbackItems: GalleryItem[] = [
  { id: 1, title: 'EOT Crane Installation – Steel Plant', category: 'Crane', image_url: '', created_at: '' },
  { id: 2, title: 'Industrial Chimney Erection', category: 'Chimney', image_url: '', created_at: '' },
  { id: 3, title: 'Bridge Girder Launching', category: 'Bridge', image_url: '', created_at: '' },
  { id: 4, title: 'PEB Warehouse Structure', category: 'Structure', image_url: '', created_at: '' },
  { id: 5, title: 'Crane Dismantling – Paper Mill', category: 'Dismantling', image_url: '', created_at: '' },
  { id: 6, title: 'Heavy Machinery Relocation', category: 'Shifting', image_url: '', created_at: '' },
];

const categoryColors: Record<string, string> = {
  Crane: 'bg-blue-500/20 text-blue-400',
  Chimney: 'bg-orange-500/20 text-orange-400',
  Bridge: 'bg-green-500/20 text-green-400',
  Structure: 'bg-purple-500/20 text-purple-400',
  Dismantling: 'bg-red-500/20 text-red-400',
  Shifting: 'bg-yellow-500/20 text-yellow-400',
};

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });
        setItems(data && data.length > 0 ? data : fallbackItems);
      } catch {
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-16 md:py-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Portfolio</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4">Project Gallery</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg text-gray-400 max-w-2xl">
            A selection of completed projects — cranes, chimneys, bridges, and industrial structures across India.
          </motion.p>
        </div>
      </div>

      {/* Filter */}
      {!loading && (
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
                <div key={i} className="bg-card border border-border animate-pulse aspect-video" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-4xl mb-4">📷</p>
              <p className="font-bold uppercase tracking-widest">No items in this category yet</p>
            </div>
          ) : (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(item => (
                <motion.div key={item.id} variants={scaleIn} className="group relative bg-card border border-border overflow-hidden hover:border-primary/40 transition-all">
                  {item.image_url ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <p className="text-4xl opacity-30">🏗️</p>
                    </div>
                  )}
                  <div className="p-4">
                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-2 ${categoryColors[item.category] ?? 'bg-muted text-muted-foreground'}`}>
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm leading-snug">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-2xl font-black uppercase tracking-tight mb-4">Have a Project in Mind?</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our team is ready to take on your next heavy erection challenge, anywhere in India.
          </motion.p>
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <a href="/contact">
              <button className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 transition-colors">
                Get in Touch
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
