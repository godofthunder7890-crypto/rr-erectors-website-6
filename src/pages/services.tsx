import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/lib/supabase';
import { Wrench, ArrowRight, Activity, Settings, Building, Factory } from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';

const getIcon = (iconStr: string) => {
  const cls = 'w-8 h-8';
  switch (iconStr) {
    case 'wrench': return <Wrench className={cls} />;
    case 'settings': return <Settings className={cls} />;
    case 'building': return <Building className={cls} />;
    case 'factory': return <Factory className={cls} />;
    case 'crane': return <Activity className={cls} />;
    default: return <Activity className={cls} />;
  }
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.from('services').select('*').order('created_at', { ascending: true }).then(({ data }) => {
      setServices(data ?? []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-background py-16 md:py-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-bold uppercase tracking-widest text-primary mb-3">What We Do</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Our Services</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 max-w-3xl">Precision engineering and heavy lifting solutions for every industrial need.</motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-muted animate-pulse border border-border" />)}
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeUp} className="group bg-card border border-border shadow-sm flex flex-col sm:flex-row overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className="sm:w-2/5 min-h-[180px] bg-muted flex items-center justify-center">
                  <div className="text-primary opacity-30 group-hover:opacity-60 transition-opacity">
                    {getIcon(service.icon)}
                  </div>
                </div>
                <div className="p-5 md:p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="text-primary mb-3">{getIcon(service.icon)}</div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{service.short_desc}</p>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1">{service.category}</span>
                    <Link href="/contact">
                      <Button size="sm" variant="outline" className="font-bold uppercase text-xs gap-1">
                        Get Quote <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
