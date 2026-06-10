import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { supabaseAdmin } from '@/lib/supabase';
import type { Inquiry } from '@/lib/supabase';
import { MessageSquare, Package, Image as ImageIcon, Activity, CheckCircle2, Clock, Loader2 } from 'lucide-react';

type Stats = {
  totalInquiries: number;
  newInquiries: number;
  totalServices: number;
  totalGallery: number;
  recentInquiries: Inquiry[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: totalInquiries },
        { count: newInquiries },
        { count: totalServices },
        { count: totalGallery },
        { data: recentInquiries },
      ] = await Promise.all([
        supabaseAdmin.from('inquiries').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        supabaseAdmin.from('services').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('gallery').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({
        totalInquiries: totalInquiries ?? 0,
        newInquiries: newInquiries ?? 0,
        totalServices: totalServices ?? 0,
        totalGallery: totalGallery ?? 0,
        recentInquiries: recentInquiries ?? [],
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex justify-center p-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  if (!stats) return null;

  const statCards = [
    { label: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'New Leads', value: stats.newInquiries, icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Services', value: stats.totalServices, icon: Package, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Gallery Items', value: stats.totalGallery, icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight uppercase mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Real-time metrics for your business operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-sm flex items-center justify-center shrink-0`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-tight">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm font-bold text-primary hover:underline uppercase tracking-wider">
            View All
          </Link>
        </div>
        <div className="divide-y divide-border">
          {stats.recentInquiries.length > 0 ? (
            stats.recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-lg">{inquiry.name}</span>
                    {inquiry.status === 'New' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        <Clock className="w-3 h-3" /> New
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-600">
                        <CheckCircle2 className="w-3 h-3" /> Resolved
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{inquiry.phone} · {inquiry.email}</p>
                  <p className="text-sm mt-1 font-medium">Type: {inquiry.project_type}</p>
                </div>
                <div className="text-right sm:max-w-xs">
                  <p className="text-sm text-muted-foreground line-clamp-2 italic">"{inquiry.message}"</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-muted-foreground">No inquiries yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
