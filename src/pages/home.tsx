import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';
import { ArrowRight, Phone, Shield, Clock, Award, Wrench } from 'lucide-react';

const services = [
  { icon: '🏗️', title: 'EOT Crane Erection', desc: 'Supply, erection, alignment and commissioning of EOT cranes up to 150 tons capacity.' },
  { icon: '🏭', title: 'Industrial Chimneys', desc: 'Erection, repair and structural assessment of industrial chimneys at any height.' },
  { icon: '🌉', title: 'Bridge Girder Launching', desc: 'Precision launching of bridge girders for railway and highway infrastructure projects.' },
  { icon: '🔩', title: 'PEB Structures', desc: 'Pre-engineered building erection for warehouses, factories, and industrial sheds.' },
  { icon: '⚙️', title: 'Machinery Shifting', desc: 'Safe relocation of heavy industrial equipment with minimal downtime.' },
  { icon: '🔧', title: 'Dismantling Services', desc: 'Complete dismantling of cranes, structures, and chimneys with expert planning.' },
];

const stats = [
  { value: '40+', label: 'Years Experience' },
  { value: '150T', label: 'Manual Capacity' },
  { value: '5000+', label: 'Tons Erected' },
  { value: 'Pan-India', label: 'Operations' },
];

const highlights = [
  { icon: Shield, label: 'Safety First', desc: 'Certified climbers and riggers following industry safety protocols.' },
  { icon: Clock, label: 'On-Time Delivery', desc: 'Proven track record of meeting project deadlines across India.' },
  { icon: Award, label: '40 Years of Trust', desc: 'Trusted by leading crane manufacturers and industrial clients since 1984.' },
  { icon: Wrench, label: 'No-Crane Capability', desc: 'Manual erection up to 150T using Winch Machines and Derricks.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)' }} />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/10" />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-24">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              Est. 1984 · Pan-India Operations
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
              India's Heavy<br />
              <span className="text-primary">Erection</span><br />
              Specialists
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-background/60 max-w-2xl mb-10 leading-relaxed">
              EOT cranes, industrial chimneys, bridge girders, PEB structures — erected with precision
              and safety by M/S R.R. ERECTORS for over four decades.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="font-bold uppercase tracking-widest px-8">
                  Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="font-bold uppercase tracking-widest px-8 border-background/30 text-background hover:bg-background/10 hover:text-background">
                  Our Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/20">
              {stats.map((s, i) => (
                <div key={i} className="py-4 px-6 text-center">
                  <p className="text-2xl font-black text-primary-foreground">{s.value}</p>
                  <p className="text-xs uppercase tracking-widest text-primary-foreground/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-primary mb-3">What We Do</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3">Core Services</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-12 max-w-2xl">
              Specialised heavy industrial erection services delivered safely and on time across India.
            </motion.p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <motion.div key={i} variants={scaleIn} className="bg-card border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all group cursor-default">
                <p className="text-3xl mb-4">{svc.icon}</p>
                <h3 className="font-black text-lg uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" size="lg" className="font-bold uppercase tracking-widest">
                View All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeLeft}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
                Unmatched Expertise in Heavy Industrial Erection
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Since 1984, M/S R.R. ERECTORS has completed thousands of tons of structural erection across
                India — from steel plants and sugar mills to highway bridges and paper factories. Our certified
                team brings discipline, precision, and on-site ingenuity to every project.
              </p>
              <Link href="/about">
                <Button className="font-bold uppercase tracking-widest">
                  Our Story <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeRight} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div key={i} variants={scaleIn} className="bg-card border border-border p-5 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
                    <h.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">{h.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Project Portfolio</motion.p>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-3xl font-black uppercase tracking-tight mb-4">See Our Work</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse our gallery of completed erection projects spanning cranes, chimneys, bridges, and industrial structures.
          </motion.p>
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Link href="/gallery">
              <Button size="lg" className="font-bold uppercase tracking-widest px-10">View Gallery</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background border-t-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Ready to Start Your Project?</motion.h2>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-background/60">Contact us for a free consultation and quotation.</motion.p>
            </div>
            <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex gap-4 flex-wrap">
              <a href="tel:+919634119193">
                <Button size="lg" variant="outline" className="font-bold uppercase tracking-widest border-background/30 text-background hover:bg-background/10 hover:text-background">
                  <Phone className="mr-2 w-4 h-4" /> Call Now
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" className="font-bold uppercase tracking-widest">Get Quote</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
