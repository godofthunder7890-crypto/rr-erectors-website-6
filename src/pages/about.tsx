import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';

const timeline = [
  { year: '1984', title: 'Founded', desc: 'M/S R.R. ERECTORS established with a vision to serve India\'s growing industrial sector.' },
  { year: '1995', title: 'First Major Project', desc: 'Completed first 100-ton EOT crane erection at a major steel plant in Uttar Pradesh.' },
  { year: '2005', title: 'Pan-India Expansion', desc: 'Expanded operations across multiple states, serving paper mills, sugar mills, and infrastructure projects.' },
  { year: '2015', title: 'Chimney Specialist', desc: 'Became a recognized specialist in industrial chimney erection, repair, and structural assessment.' },
  { year: '2024', title: '40 Years Strong', desc: 'Celebrating four decades of excellence with 5000+ tons erected and 150-ton manual lifting capacity.' },
];

const clients = [
  'Cranex Limited', 'Dhiraj Cranes', 'Century Cranes',
  'S Crane', 'Automech Industries', 'Various Steel Plants',
  'Sugar Mills', 'Paper Mills', 'Infrastructure Projects',
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-16 md:py-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Story</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4">About Us</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 max-w-3xl">Four decades of trust, precision, and heavy industrial expertise across India.</motion.p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeLeft}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">India's Most Trusted Heavy Erection Contractor</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>M/S R.R. ERECTORS has been at the forefront of India's heavy industrial erection industry since 1984. Founded with a commitment to precision, safety, and reliability, we have grown into one of the most trusted names in the business.</p>
                <p>Our expertise spans EOT crane erection and dismantling, industrial chimney work, bridge girder launching, PEB structure erection, heavy machinery shifting, and complete dismantling services. We operate pan-India with a highly skilled team of certified climbers, welders, and structural specialists.</p>
                <p>What sets us apart is our ability to erect structures up to 150 tons manually using Winch Machines and Derricks — eliminating the need for heavy cranes even in the most challenging access-restricted environments.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeRight} className="grid grid-cols-2 gap-4">
              {[
                { value: '40+', label: 'Years Experience' },
                { value: '150T', label: 'Manual Capacity' },
                { value: '5000+', label: 'Tons Erected' },
                { value: 'Pan-India', label: 'Operations' },
              ].map((stat, i) => (
                <motion.div key={i} variants={scaleIn} className="bg-card border border-border p-6 text-center">
                  <p className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-12 text-center">Our Journey</motion.h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10 md:absolute md:left-1/2 md:-translate-x-1/2 mt-1">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className={`flex-1 bg-card border border-border p-5 md:w-5/12 md:flex-none ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <span className="text-xs font-black text-primary uppercase tracking-widest">{item.year}</span>
                    <h3 className="font-bold text-lg mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 text-center">Trusted By</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center text-muted-foreground mb-10">Industry leaders who rely on our expertise</motion.p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clients.map((client, i) => (
              <motion.div key={i} variants={scaleIn} className="bg-card border border-border p-4 text-center hover:border-primary/30 transition-colors">
                <p className="font-bold text-sm">{client}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-3xl font-black uppercase mb-4">Ready to Work Together?</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-gray-400 mb-8 max-w-xl mx-auto">Contact our team today for a free consultation on your next heavy industrial project.</motion.p>
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Link href="/contact">
              <Button size="lg" className="font-bold uppercase tracking-widest px-10">Get In Touch</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
