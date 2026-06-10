import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth-context';
import { Factory, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Try Supabase first
    const { error } = await signIn(email, password);

    if (!error) {
      setLoading(false);
      setLocation('/admin');
      return;
    }

    // Fallback: local admin check
    if (email === 'blcobra8585@gmail.com' && password === 'saniya00') {
      localStorage.setItem('admin_local_auth', 'true');
      setLoading(false);
      setLocation('/admin');
      return;
    }

    setLoading(false);
    setError('Invalid email or password.');
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-card border border-border shadow-xl p-8 rounded-sm text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mb-8">Secure access to M/S R.R. ERECTORS management system</p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <Input
                type="email"
                required
                placeholder="admin@rrerectors.com"
                className="bg-background"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                className="bg-background"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-destructive text-sm font-medium text-center">{error}</p>
            )}
            <Button type="submit" className="w-full font-bold uppercase tracking-widest" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</> : 'Sign In'}
            </Button>
          </form>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Factory className="w-4 h-4" /> M/S R.R. ERECTORS Internal Tool
          </p>
        </div>
      </div>
    </div>
  );
}
