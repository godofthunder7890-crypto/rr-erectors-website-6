import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/lib/animations';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', project_type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('inquiries').insert({ ...form, status: 'New' });
    setLoading(false);
    setSent(true);
  };

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-background py-16 md:py-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Get In Touch</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Contact Us</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 max-w-3xl">Ready to discuss your next heavy industrial project? Our team is standing by.</motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div variants={fadeLeft} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Reach Us Directly</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                    <a href="tel:+919634119193" className="font-bold text-lg hover:text-primary transition-colors block">+91 96341 19193</a>
                    <a href="tel:+919411068202" className="font-bold text-lg hover:text-primary transition-colors block">+91 94110 68202</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <a href="mailto:rrerectors786@gmail.com" className="font-bold text-lg hover:text-primary transition-colors">rrerectors786@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                    <p className="font-bold text-lg">Pan-India Operations</p>
                    <p className="text-muted-foreground text-sm">GSTN: 09AOLPA2418P1ZO</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Response Time</p>
                    <p className="font-bold text-lg">Within 24 Hours</p>
                    <p className="text-muted-foreground text-sm">Mon – Sat, 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <a
                href="https://wa.me/919634119193"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-6 py-3 rounded-sm hover:bg-[#20b858] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeRight}>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold uppercase mb-3">Message Sent!</h3>
                <p className="text-muted-foreground">Our team will contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border p-6 md:p-8 space-y-5">
                <h2 className="text-xl font-bold uppercase tracking-tight mb-6">Send Us a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Your Name *</label>
                    <input required value={form.name} onChange={f('name')} className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Phone *</label>
                    <input required value={form.phone} onChange={f('phone')} className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Email *</label>
                  <input required type="email" value={form.email} onChange={f('email')} className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Project Type</label>
                  <select value={form.project_type} onChange={f('project_type')} className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="">Select Project Type</option>
                    <option value="EOT Crane Erection">EOT Crane Erection</option>
                    <option value="Industrial Chimney">Industrial Chimney</option>
                    <option value="Bridge / Girder Work">Bridge / Girder Work</option>
                    <option value="PEB Structure">PEB Structure</option>
                    <option value="Heavy Machinery">Heavy Machinery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={f('message')} className="w-full bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Describe your project requirements..." />
                </div>
                <Button type="submit" size="lg" className="w-full font-bold uppercase tracking-widest" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
