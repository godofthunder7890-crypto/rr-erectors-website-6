import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/lib/animations';
import { supabase } from '@/lib/supabase';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const projectTypes = [
  'EOT Crane Erection',
  'Industrial Chimney',
  'Bridge Girder',
  'PEB Structure',
  'Machinery Shifting',
  'Dismantling',
  'Other',
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  project_type: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', project_type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.project_type) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const { error: sbError } = await supabase.from('inquiries').insert([{ ...form, status: 'New' }]);
      if (sbError) throw sbError;
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us directly or try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-16 md:py-24 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Reach Out</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4">Contact Us</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg text-gray-400 max-w-2xl">
            Tell us about your project and our team will get back to you within 24 hours.
          </motion.p>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <motion.div variants={fadeLeft} className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-6">Get In Touch</h2>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                      <a href="tel:+919634119193" className="font-bold hover:text-primary transition-colors block">+91 96341 19193</a>
                      <a href="tel:+919411068202" className="font-bold hover:text-primary transition-colors block">+91 94110 68202</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                      <a href="mailto:rrerectors786@gmail.com" className="font-bold hover:text-primary transition-colors">rrerectors786@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Operations</p>
                      <p className="font-bold">Pan-India</p>
                      <p className="text-sm text-muted-foreground">Available across all major states</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 border border-border p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">GSTN</p>
                <p className="font-mono font-bold text-sm">09AOLPA2418P1ZO</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">WhatsApp</p>
                <a
                  href="https://wa.me/919634119193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-sm hover:text-primary transition-colors"
                >
                  Message us on WhatsApp →
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeRight} className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-card border border-border p-8">
                  <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Inquiry Submitted!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you. Our team will review your inquiry and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border p-6 md:p-8 space-y-5">
                  <h2 className="text-lg font-black uppercase tracking-tight mb-6">Send an Inquiry</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                        Name <span className="text-primary">*</span>
                      </label>
                      <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                        Phone <span className="text-primary">*</span>
                      </label>
                      <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Email</label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Project Type <span className="text-primary">*</span>
                    </label>
                    <select
                      name="project_type"
                      value={form.project_type}
                      onChange={handleChange}
                      required
                      className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select a service type</option>
                      {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Message / Project Details</label>
                    <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your project, location, timeline, and any specific requirements..." rows={5} />
                  </div>

                  {error && (
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  )}

                  <Button type="submit" disabled={submitting} size="lg" className="w-full font-bold uppercase tracking-widest">
                    {submitting ? 'Sending...' : 'Submit Inquiry'}
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
