import { useEffect, useState, useRef } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import type { GalleryItem } from '@/lib/supabase';
import { Plus, Trash2, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORIES = ['EOT Cranes', 'Industrial Chimneys', 'Bridges & Girders', 'Heavy Equipment', 'PEB Structures', 'Other'];
const BUCKET = 'gallery';

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', category: 'EOT Cranes', image_url: '' });
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchItems = async () => {
    const { data } = await supabaseAdmin.from('gallery').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl = form.image_url;

    if (uploadMode === 'file' && fileRef.current?.files?.[0]) {
      const file = fileRef.current.files[0];
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      const { data, error } = await supabaseAdmin.storage.from(BUCKET).upload(fileName, file, { upsert: true });
      if (error) {
        showToast('Upload failed: ' + error.message);
        setSaving(false);
        return;
      }
      const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(data.path);
      imageUrl = urlData.publicUrl;
    }

    await supabaseAdmin.from('gallery').insert({ title: form.title, category: form.category, image_url: imageUrl });
    showToast('Image added!');
    setSaving(false);
    setShowDialog(false);
    setForm({ title: '', category: 'EOT Cranes', image_url: '' });
    setPreviewUrl('');
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    await supabaseAdmin.from('gallery').delete().eq('id', id);
    showToast('Image deleted.');
    fetchItems();
  };

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
          <h1 className="text-3xl font-bold tracking-tight uppercase mb-2">Manage Gallery</h1>
          <p className="text-muted-foreground">Upload and organize project photos.</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="font-bold uppercase tracking-widest gap-2">
          <Plus className="w-4 h-4" /> Add Photo
        </Button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card border border-border shadow-2xl w-full max-w-md rounded-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold uppercase">Upload Photo</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Title *</label>
                <Input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="EOT Crane at XYZ Plant" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Category *</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-background border border-input px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setUploadMode('file')} className={`flex-1 py-2 text-xs font-bold uppercase border rounded-sm transition-colors ${uploadMode === 'file' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}>
                  Upload File
                </button>
                <button type="button" onClick={() => setUploadMode('url')} className={`flex-1 py-2 text-xs font-bold uppercase border rounded-sm transition-colors ${uploadMode === 'url' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}>
                  Image URL
                </button>
              </div>

              {uploadMode === 'file' ? (
                <div>
                  <div className="border-2 border-dashed border-border rounded-sm p-6 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => fileRef.current?.click()}>
                    {previewUrl ? (
                      <img src={previewUrl} alt="preview" className="w-full h-32 object-cover rounded-sm" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="w-8 h-8" />
                        <p className="text-sm">Click to select image</p>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Image URL *</label>
                  <Input required={uploadMode === 'url'} placeholder="https://..." value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 font-bold uppercase" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Upload
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowDialog(false); setPreviewUrl(''); }}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="group relative bg-card border border-border shadow-sm overflow-hidden aspect-square">
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-end">
                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase mb-1">{item.category}</p>
                <p className="text-white font-bold text-sm line-clamp-2">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="p-12 text-center text-muted-foreground bg-card border border-border">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No images yet. Add your first photo!</p>
        </div>
      )}
    </div>
  );
}
