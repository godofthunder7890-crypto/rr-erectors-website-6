import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import type { Inquiry } from '@/lib/supabase';
import { Loader2, CheckCircle2, Clock, Mail, Phone, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchInquiries = async () => {
    const { data } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    setInquiries(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleResolve = async (id: number) => {
    await supabaseAdmin.from('inquiries').update({ status: 'Resolved' }).eq('id', id);
    showToast('Marked as resolved.');
    fetchInquiries();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return;
    await supabaseAdmin.from('inquiries').delete().eq('id', id);
    showToast('Inquiry deleted.');
    fetchInquiries();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-primary text-primary-foreground px-5 py-3 rounded shadow-lg font-bold text-sm">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight uppercase mb-2">Inquiries & Leads</h1>
        <p className="text-muted-foreground">Manage customer quotes and contact requests.</p>
      </div>

      {/* Mobile cards */}
      <div className="block md:hidden space-y-4">
        {inquiries.map(inquiry => (
          <div key={inquiry.id} className="bg-card border border-border p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-lg">{inquiry.name}</p>
                <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                  <Phone className="w-3 h-3" /> {inquiry.phone}
                </a>
                <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                  <Mail className="w-3 h-3" /> {inquiry.email}
                </a>
              </div>
              {inquiry.status === 'New' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-primary/20 text-primary uppercase shrink-0">
                  <Clock className="w-3 h-3" /> New
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-green-500/20 text-green-600 uppercase shrink-0">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </span>
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-sm">{inquiry.project_type}</span>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{inquiry.message}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{new Date(inquiry.created_at).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              {inquiry.status === 'New' && (
                <Button size="sm" className="font-bold uppercase text-xs flex-1" onClick={() => handleResolve(inquiry.id)}>
                  Mark Resolved
                </Button>
              )}
              <Button size="sm" variant="destructive" onClick={() => handleDelete(inquiry.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-card border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase font-bold text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Project Request</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inquiries.map(inquiry => (
                <tr key={inquiry.id} className={`transition-colors ${inquiry.status === 'New' ? 'bg-card' : 'bg-muted/30'}`}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-base mb-1">{inquiry.name}</p>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-primary"><Phone className="w-3 h-3" /> {inquiry.phone}</a>
                      <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-primary"><Mail className="w-3 h-3" /> {inquiry.email}</a>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-2">{inquiry.project_type}</span>
                    <p className="text-muted-foreground line-clamp-2">{inquiry.message}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2">{new Date(inquiry.created_at).toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    {inquiry.status === 'New' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-primary/20 text-primary uppercase">
                        <Clock className="w-3 h-3" /> New
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-green-500/20 text-green-600 uppercase">
                        <CheckCircle2 className="w-3 h-3" /> Resolved
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {inquiry.status === 'New' && (
                      <Button size="sm" className="font-bold uppercase text-xs" onClick={() => handleResolve(inquiry.id)}>
                        Mark Resolved
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(inquiry.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No inquiries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
