import { useEffect, useState } from 'react';
import { supabase, type Service } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

type ServiceForm = Omit<Service, 'id' | 'created_at'>;

const emptyForm: ServiceForm = { title: '', slug: '', icon: '', short_desc: '', detailed_body: '', category: '' };

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (svc: Service) => {
    setEditId(svc.id);
    setForm({ title: svc.title, slug: svc.slug, icon: svc.icon, short_desc: svc.short_desc, detailed_body: svc.detailed_body ?? '', category: svc.category });
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'title' && editId === null) {
      setForm(prev => ({ ...prev, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }));
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.short_desc || !form.category) return;
    setSaving(true);
    if (editId !== null) {
      await supabase.from('services').update(form).eq('id', editId);
    } else {
      await supabase.from('services').insert([form]);
    }
    await fetchServices();
    setShowForm(false);
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    setActionLoading(id);
    await supabase.from('services').delete().eq('id', id);
    setServices(prev => prev.filter(s => s.id !== id));
    setActionLoading(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-black uppercase tracking-tight">Services</h1>
        <Button onClick={openCreate} size="sm" className="font-bold uppercase tracking-widest">
          <Plus className="w-4 h-4 mr-1" /> Add Service
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Manage the services shown on the public Services page.</p>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-primary/30 p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-black uppercase tracking-tight">{editId !== null ? 'Edit Service' : 'New Service'}</h2>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Title *</label>
              <Input name="title" value={form.title} onChange={handleChange} placeholder="Service title" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Category *</label>
              <Input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Crane, Chimney" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Slug</label>
              <Input name="slug" value={form.slug} onChange={handleChange} placeholder="url-friendly-name" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Icon (emoji)</label>
              <Input name="icon" value={form.icon} onChange={handleChange} placeholder="🏗️" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Short Description *</label>
            <Textarea name="short_desc" value={form.short_desc} onChange={handleChange} placeholder="Brief description shown on the card" rows={2} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Detailed Body</label>
            <Textarea name="detailed_body" value={form.detailed_body ?? ''} onChange={handleChange} placeholder="Extended description (optional)" rows={3} />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving || !form.title || !form.short_desc || !form.category} size="sm" className="font-bold uppercase tracking-widest">
              <Check className="w-4 h-4 mr-1" /> {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline" size="sm" className="font-bold uppercase tracking-widest">Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border border-border p-5 animate-pulse h-20" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-muted-foreground">
          <p className="text-3xl mb-3">⚙️</p>
          <p className="font-bold uppercase tracking-widest text-sm">No services yet. Add your first service.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {services.map(svc => (
            <div key={svc.id} className="bg-card border border-border p-4 flex items-start gap-3">
              <p className="text-2xl flex-shrink-0">{svc.icon || '⚙️'}</p>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="font-bold text-sm">{svc.title}</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">{svc.category}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{svc.short_desc}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="ghost" onClick={() => openEdit(svc)} disabled={actionLoading === svc.id}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(svc.id)} disabled={actionLoading === svc.id} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
