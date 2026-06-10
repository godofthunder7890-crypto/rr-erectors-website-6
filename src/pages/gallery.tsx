import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { GalleryItem } from '@/lib/supabase';
import { X, Image as ImageIcon } from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';

const CATEGORIES = ['All', 'EOT Cranes', 'Industrial Chimneys', 'Bridges & Girders', 'Heavy Equipment', 'PEB Structures'];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    supabase.from('gallery').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setItems(data ?? []);
      setIsLoading(false);
    });
  }, []);

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-background py-16 md:py-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Work</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Project Gallery</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 max-w-3xl">Decades of completed projects across India's most demanding industrial sites.</motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors rounded-sm ${filter === cat ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="aspect-square bg-muted animate-pulse border border-border" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No photos in this category yet.</p>
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(item => (
              <motion.div
                key={item.id}
                variants={scaleIn}
                className="group relative aspect-square overflow-hidden bg-muted border border-border cursor-pointer"
                onClick={() => setLightbox(item)}
              >
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-xs font-bold text-primary uppercase">{item.category}</p>
                  <p className="text-white text-sm font-bold line-clamp-2">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[80vh] object-contain" />
              <div className="mt-3 text-center">
                <p className="text-xs font-bold text-primary uppercase mb-1">{lightbox.category}</p>
                <p className="text-white font-bold">{lightbox.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
