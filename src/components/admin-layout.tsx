import { Link, useLocation, Redirect } from 'wouter';
import { useAuth } from '@/lib/auth-context';
import { LayoutDashboard, MessageSquare, Package, Image, LogOut, Menu, Factory } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/services', label: 'Services', icon: Package },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const localAuth = localStorage.getItem('admin_local_auth') === 'true';
  if (!user && !localAuth) return <Redirect to="/admin/login" />;

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-foreground text-background z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-background/10">
          <div className="flex items-center gap-3">
            <Factory className="w-6 h-6 text-primary" />
            <div>
              <p className="font-bold text-sm uppercase leading-none">R.R. ERECTORS</p>
              <p className="text-xs text-background/50 mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                location === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-background/70 hover:bg-background/10 hover:text-background'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-background/10">
          <p className="text-xs text-background/40 mb-3 truncate">{user?.email}</p>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar mobile */}
        <header className="lg:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold uppercase text-sm">Admin Panel</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
