import { useEffect, useState } from 'react';
import { supabase, type Inquiry } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Trash2 } from 'lucide-react';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'New' | 'Resolved'>('All');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchInquiries = async () => {
    const query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    const { data } = await query;
    setInquiries(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const toggleStatus = async (inquiry: Inquiry) => {
    setActionLoading(inquiry.id);
    const newStatus = inquiry.status === 'New' ? 'Resolved' : 'New';
    await supabase.from('inquiries').update({ status: newStatus }).eq('id', inquiry.id);
    setInquiries(prev => prev.map(i => i.id === inquiry.id ? { ...i, status: newStatus } : i));
    setActionLoading(null);
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return;
    setActionLoading(id);
    await supabase.from('inquiries').delete().eq('id', id);
    setInquiries(prev => prev.filter(i => i.id !== id));
    setActionLoading(null);
  };

  const filtered = filter === 'All' ? inquiries : inquiries.filter(i => i.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-black uppercase tracking-tight">Inquiries</h1>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {inquiries.filter(i => i.status === 'New').length} new
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Customer inquiries submitted via the contact form.</p>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6">
        {(['All', 'New', 'Resolved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border border-border p-5 animate-pulse h-24" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-muted-foreground">
          <p className="text-3xl mb-3">📭</p>
          <p className="font-bold uppercase tracking-widest text-sm">No inquiries {filter !== 'All' ? `with status "${filter}"` : 'yet'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(inq => (
            <div key={inq.id} className={`bg-card border p-5 ${inq.status === 'New' ? 'border-primary/30' : 'border-border'}`}>
              <div className="flex flex-wrap items-start gap-3 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${inq.status === 'New' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {inq.status === 'New' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {inq.status}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{inq.project_type}</span>
                  </div>
                  <p className="font-black text-base">{inq.name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-sm text-muted-foreground">
                    <a href={`tel:${inq.phone}`} className="hover:text-primary transition-colors">{inq.phone}</a>
                    {inq.email && <a href={`mailto:${inq.email}`} className="hover:text-primary transition-colors">{inq.email}</a>}
                  </div>
                  {inq.message && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{inq.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground/60 mt-2">{new Date(inq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant={inq.status === 'New' ? 'default' : 'outline'}
                    disabled={actionLoading === inq.id}
                    onClick={() => toggleStatus(inq)}
                    className="text-xs font-bold uppercase tracking-widest"
                  >
                    {inq.status === 'New' ? 'Resolve' : 'Reopen'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={actionLoading === inq.id}
                    onClick={() => deleteInquiry(inq.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
