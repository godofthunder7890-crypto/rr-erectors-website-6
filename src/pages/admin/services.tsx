import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import type { Service } from '@/lib/supabase';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ICON_OPTIONS = ['crane', 'wrench', 'building', 'bridge', 'factory', 'settings'];
const emptyForm = { title: '', slug: '', icon: 'wrench', short_desc: '', detailed_body: '', category: 'General' };

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchServices = async () => {
    const { data } = await supabaseAdmin.from('services').select('*').order('created_at', { ascending: true });
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowDialog(true);
  };

  const openEdit = (s: Service) => {
    setEditingId(s.id);
    setForm({ title: s.title, slug: s.slug, icon: s.icon, short_desc: s.short_desc, detailed_body: s.detailed_body ?? '', category: s.category });
    setShowDialog(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await supabaseAdmin.from('services').update(form).eq('id', editingId);
      showToast('Service updated!');
    } else {
      await supabaseAdmin.from('services').insert(form);
      showToast('Service created!');
    }
    setSaving(false);
    setShowDialog(false);
    fetchServices();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    await supabaseAdmin.from('services').delete().eq('id', id);
    showToast('Service deleted.');
    fetchServices();
  };

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-primary text-primary-foreground px-5 py-3 rounded shadow-lg font-bold text-sm">
          {toast}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase mb-2">Manage Services</h1>
          <p className="text-muted-foreground">Add, edit, or remove service offerings.</p>
        </div>
        <Button onClick={openNew} className="font-bold uppercase tracking-widest gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card border border-border shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold uppercase">{editingId ? 'Edit Service' : 'New Service'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Title *</label>
                  <Input required value={form.title} onChange={f('title')} placeholder="EOT Crane Erection" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Slug *</label>
                  <Input required value={form.slug} onChange={f('slug')} placeholder="eot-crane" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Category *</label>
                  <Input required value={form.category} onChange={f('category')} placeholder="Cranes" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Icon</label>
                  <select value={form.icon} onChange={f('icon')} className="w-full bg-background border border-input px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Short Description *</label>
                <Textarea required rows={2} value={form.short_desc} onChange={f('short_desc')} className="resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Detailed Body</label>
                <Textarea rows={5} value={form.detailed_body} onChange={f('detailed_body')} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 font-bold uppercase" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {editingId ? 'Update' : 'Create'} Service
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-card border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase font-bold text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map(service => (
                <tr key={service.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-base mb-1">{service.title}</p>
                    <p className="text-muted-foreground line-clamp-1 text-xs">{service.short_desc}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 text-xs font-bold uppercase rounded-sm">{service.category}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{service.slug}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No services yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
