import { Switch, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth-context';
import { Layout } from '@/components/layout';
import { AdminLayout } from '@/components/admin-layout';

import Home from '@/pages/home';
import About from '@/pages/about';
import Services from '@/pages/services';
import Gallery from '@/pages/gallery';
import Contact from '@/pages/contact';
import NotFound from '@/pages/not-found';

import AdminLogin from '@/pages/admin/login';
import AdminDashboard from '@/pages/admin/dashboard';
import AdminInquiries from '@/pages/admin/inquiries';
import AdminServices from '@/pages/admin/services';
import AdminGallery from '@/pages/admin/gallery';

const queryClient = new QueryClient();

function PublicRoutes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/inquiries" component={AdminInquiries} />
        <Route path="/admin/services" component={AdminServices} />
        <Route path="/admin/gallery" component={AdminGallery} />
      </Switch>
    </AdminLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/:rest*" component={AdminRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route component={PublicRoutes} />
        </Switch>
      </AuthProvider>
    </QueryClientProvider>
  );
}
