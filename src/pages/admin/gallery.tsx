import { useEffect, useState } from 'react';
import { supabase, type GalleryItem } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, X, Check } from 'lucide-react';

type GalleryForm = Omit<GalleryItem, 'id' | 'created_at'>;

const emptyForm: GalleryForm = { title: '', category: '', image_url: '' };

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<GalleryForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.category) return;
    setSaving(true);
    await supabase.from('gallery').insert([form]);
    await fetchItems();
    setForm(emptyForm);
    setShowForm(false);
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this gallery item?')) return;
    setActionLoading(id);
    await supabase.from('gallery').delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
    setActionLoading(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-black uppercase tracking-tight">Gallery</h1>
        <Button onClick={() => setShowForm(true)} size="sm" className="font-bold uppercase tracking-widest">
          <Plus className="w-4 h-4 mr-1" /> Add Item
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Manage project photos shown in the public gallery.</p>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-primary/30 p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-black uppercase tracking-tight">New Gallery Item</h2>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Title *</label>
              <Input name="title" value={form.title} onChange={handleChange} placeholder="Project title" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Category *</label>
              <Input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Crane, Chimney" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Image URL</label>
            <Input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
          </div>
          {form.image_url && (
            <div className="border border-border overflow-hidden">
              <img src={form.image_url} alt="Preview" className="max-h-40 object-contain mx-auto" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          )}
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving || !form.title || !form.category} size="sm" className="font-bold uppercase tracking-widest">
              <Check className="w-4 h-4 mr-1" /> {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline" size="sm" className="font-bold uppercase tracking-widest">Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card border border-border animate-pulse aspect-video" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-card border border-border p-12 text-center text-muted-foreground">
          <p className="text-3xl mb-3">📷</p>
          <p className="font-bold uppercase tracking-widest text-sm">No gallery items yet. Add your first photo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-card border border-border overflow-hidden group relative">
              {item.image_url ? (
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-3xl opacity-30">🏗️</p>
                </div>
              )}
              <div className="p-3">
                <p className="font-bold text-xs leading-snug mb-0.5">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={actionLoading === item.id}
                className="absolute top-2 right-2 w-7 h-7 bg-background/80 border border-border rounded-sm hidden group-hover:flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
