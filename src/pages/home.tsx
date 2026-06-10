import { useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { fadeUp, fadeIn, fadeLeft, fadeRight, staggerContainer, scaleIn, viewportOnce } from '@/lib/animations';
import { useCountUp } from '@/hooks/use-count-up';

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCountUp(value, 2200, inView);
  return (
    <motion.div ref={ref} variants={fadeUp} className="py-6 px-4 text-center">
      <p className="text-4xl md:text-5xl font-black text-primary mb-1 tabular-nums">{count}{suffix}</p>
      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{label}</p>
    </motion.div>
  );
}

function QuickInquiryForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold uppercase mb-2">Inquiry Sent</h3>
        <p className="text-muted-foreground text-sm">Our team will contact you within 24 hours.</p>
      </motion.div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await supabase.from('inquiries').insert({
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
      project_type: (fd.get('projectType') as string) || 'General',
      message: fd.get('message') as string,
      status: 'New',
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <form className="bg-card border border-border p-6 md:p-8 space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your Name *" className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground" />
        <input name="phone" required placeholder="Phone Number *" className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground" />
      </div>
      <input name="email" type="email" required placeholder="Email Address *" className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground" />
      <select name="projectType" className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
        <option value="">Select Project Type</option>
        <option value="EOT Crane Erection">EOT Crane Erection</option>
        <option value="Industrial Chimney">Industrial Chimney</option>
        <option value="Bridge / Girder Work">Bridge / Girder Work</option>
        <option value="PEB Structure">PEB Structure</option>
        <option value="Heavy Machinery">Heavy Machinery</option>
        <option value="Other">Other</option>
      </select>
      <textarea name="message" required rows={4} placeholder="Describe your project requirements..." className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none placeholder:text-muted-foreground" />
      <Button type="submit" size="lg" className="w-full font-bold uppercase tracking-widest" disabled={loading}>
        {loading ? 'Sending...' : 'Send Inquiry'}
      </Button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0 bg-cover bg-center bg-gray-900" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }} />
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="container relative z-20 mx-auto px-4 md:px-6 text-center text-white">
          <motion.p variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
            India's Trusted Heavy Erection Specialists
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.35 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 uppercase leading-none drop-shadow-lg">
            40+ Years of Excellence in <br className="hidden md:block" />
            <span className="text-primary">Heavy Erection &<br className="sm:hidden" /> Dismantling</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }} className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed px-2">
            M/S R.R. ERECTORS has been lifting, erecting, and dismantling everything from EOT cranes to industrial chimneys for over four decades.
          </motion.p>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" transition={{ delayChildren: 0.65, staggerChildren: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div variants={fadeUp}>
              <Link href="/services"><Button size="lg" className="text-base md:text-lg px-8 py-6 uppercase font-bold w-full sm:w-auto">Explore Services</Button></Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/contact"><Button size="lg" variant="outline" className="text-base md:text-lg px-8 py-6 uppercase font-bold w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-black">Get a Quote</Button></Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-foreground/95 border-t-4 border-primary">
          <div className="container mx-auto px-4">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" transition={{ delayChildren: 0.9, staggerChildren: 0.15 }} className="grid grid-cols-3 divide-x divide-white/20">
              <StatCounter value={40} suffix="+" label="Years Experience" />
              <StatCounter value={150} suffix=" Tons" label="Lifting Capacity" />
              <StatCounter value={5000} suffix="+" label="Tons Erected" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-border pb-6 gap-4">
            <motion.div variants={fadeLeft} className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-3">Our Core Capabilities</h2>
              <p className="text-muted-foreground text-sm md:text-base">Specialized heavy industrial services executed with precision and safety.</p>
            </motion.div>
            <motion.div variants={fadeRight}>
              <Link href="/services" className="flex items-center gap-2 text-primary font-bold hover:underline uppercase tracking-wider group text-sm">
                View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: 'EOT Cranes', bg: 'bg-orange-900' },
              { title: 'Industrial Chimneys', bg: 'bg-slate-800' },
              { title: 'Bridge Engineering', bg: 'bg-zinc-800' },
              { title: 'PEB Structures', bg: 'bg-stone-800' },
            ].map((service, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Link href="/services" className={`group relative flex h-72 md:h-80 overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 block ${service.bg}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                    <span className="inline-flex items-center gap-1 text-primary font-bold text-xs uppercase">Learn More <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center text-2xl md:text-3xl font-black uppercase tracking-tight mb-12">
            Why Industry Leaders Choose <span className="text-primary">R.R. Erectors</span>
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: '40+ Years Experience', desc: 'Four decades of on-site expertise across Paper Mills, Steel Plants, Sugar Mills, and infrastructure projects nationwide.' },
              { num: '02', title: '150 Ton Manual Capacity', desc: 'Winch Machines and Derricks rated up to 150 tons — no crane needed for complex erection sites.' },
              { num: '03', title: 'End-to-End Delivery', desc: 'From site fabrication to commissioning, load testing, AMC contracts, and painting.' },
              { num: '04', title: 'Expert Team', desc: 'Certified climbers, welders, and fitters with decades of field experience.' },
              { num: '05', title: 'Multi-Sector Coverage', desc: 'EOT Cranes, Chimneys, Bridges, Turbines, Transformers — one contractor for all requirements.' },
              { num: '06', title: 'Trusted by Industry Giants', desc: 'Preferred vendor for Cranex Limited, Dhiraj Cranes, Century Cranes, S Crane, and Automech Industries.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card border border-border p-6 group hover:border-primary/40 transition-colors">
                <p className="text-4xl font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-3 leading-none">{item.num}</p>
                <h3 className="text-base font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={fadeLeft}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Quick Inquiry</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Need a Heavy Industrial Contractor?</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">Get in touch with our team for a prompt response.</p>
              <div className="space-y-3">
                {['Free project consultation', 'On-site assessment available', 'Response within 24 hours', 'Pan-India deployment'].map((point, i) => (
                  <motion.div key={i} variants={fadeLeft} className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeRight}><QuickInquiryForm /></motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">
            Ready for your next heavy lift?
          </motion.h2>
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Link href="/contact">
              <Button size="lg" className="text-base md:text-lg px-8 md:px-10 py-6 uppercase font-bold">
                Contact M/S R.R. ERECTORS
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
