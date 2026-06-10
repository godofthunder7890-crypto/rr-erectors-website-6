import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Package, Image, TrendingUp } from 'lucide-react';

type Stats = {
  inquiries: number;
  newInquiries: number;
  services: number;
  gallery: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ inquiries: 0, newInquiries: 0, services: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('inquiries').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'New'),
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('gallery').select('*', { count: 'exact', head: true }),
    ]).then(([inq, newInq, svc, gal]) => {
      setStats({
        inquiries: inq.count ?? 0,
        newInquiries: newInq.count ?? 0,
        services: svc.count ?? 0,
        gallery: gal.count ?? 0,
      });
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'Total Inquiries', value: stats.inquiries, sub: `${stats.newInquiries} new`, icon: MessageSquare, href: '/admin/inquiries', color: 'text-blue-500' },
    { label: 'Services', value: stats.services, sub: 'Published', icon: Package, href: '/admin/services', color: 'text-green-500' },
    { label: 'Gallery Items', value: stats.gallery, sub: 'Photos', icon: Image, href: '/admin/gallery', color: 'text-purple-500' },
    { label: 'New Inquiries', value: stats.newInquiries, sub: 'Awaiting reply', icon: TrendingUp, href: '/admin/inquiries', color: 'text-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-8">Overview of your website content and inquiries.</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border border-border p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-4" />
              <div className="h-8 bg-muted rounded w-1/3 mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <Link key={i} href={card.href}>
              <div className="bg-card border border-border p-6 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{card.label}</p>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <p className="text-3xl font-black mb-1">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/inquiries">
          <div className="bg-primary text-primary-foreground p-6 rounded-sm hover:bg-primary/90 transition-colors cursor-pointer">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Quick Action</p>
            <p className="font-black uppercase tracking-tight">View Inquiries →</p>
          </div>
        </Link>
        <Link href="/admin/services">
          <div className="bg-card border border-border p-6 hover:border-primary/40 transition-all cursor-pointer">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Manage</p>
            <p className="font-black uppercase tracking-tight">Services →</p>
          </div>
        </Link>
        <Link href="/admin/gallery">
          <div className="bg-card border border-border p-6 hover:border-primary/40 transition-all cursor-pointer">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Manage</p>
            <p className="font-black uppercase tracking-tight">Gallery →</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
