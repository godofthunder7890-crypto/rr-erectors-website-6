import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Factory, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-primary rounded-sm flex items-center justify-center">
                <Factory className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className={`font-black text-sm uppercase leading-none tracking-tight transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>R.R. ERECTORS</p>
                <p className={`text-[10px] uppercase tracking-widest transition-colors ${scrolled ? 'text-muted-foreground' : 'text-white/70'}`}>Est. 1984</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors rounded-sm ${
                    location === link.href
                      ? 'text-primary'
                      : scrolled
                      ? 'text-foreground/70 hover:text-foreground'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="tel:+919634119193" className={`flex items-center gap-2 text-sm font-bold transition-colors ${scrolled ? 'text-foreground/70 hover:text-primary' : 'text-white/80 hover:text-white'}`}>
                <Phone className="w-4 h-4" />
                +91 96341 19193
              </a>
              <Link href="/contact">
                <Button size="sm" className="font-bold uppercase tracking-wider">Get Quote</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-sm transition-colors ${
                      location === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-border">
                  <a href="tel:+919634119193" className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-foreground/70">
                    <Phone className="w-4 h-4 text-primary" />
                    +91 96341 19193
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background border-t-4 border-primary">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <Factory className="w-4 h-4 text-white" />
                </div>
                <p className="font-black text-sm uppercase tracking-tight">M/S R.R. ERECTORS</p>
              </div>
              <p className="text-sm text-background/60 leading-relaxed">India's trusted heavy erection specialists since 1984. EOT cranes, industrial chimneys, bridges, and PEB structures.</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block text-sm text-background/70 hover:text-primary transition-colors font-medium">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-background/70">
                <p><a href="tel:+919634119193" className="hover:text-primary transition-colors">+91 96341 19193</a></p>
                <p><a href="tel:+919411068202" className="hover:text-primary transition-colors">+91 94110 68202</a></p>
                <p><a href="mailto:rrerectors786@gmail.com" className="hover:text-primary transition-colors">rrerectors786@gmail.com</a></p>
                <p className="text-background/40 text-xs mt-3">GSTN: 09AOLPA2418P1ZO</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-background/40">
            <p>© {new Date().getFullYear()} M/S R.R. ERECTORS. All rights reserved.</p>
            <p>Pan-India Operations</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/919634119193"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
