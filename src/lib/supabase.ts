import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY as string;

// Public client - frontend queries
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client - admin panel operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Service = {
  id: number;
  title: string;
  slug: string;
  icon: string;
  short_desc: string;
  detailed_body: string | null;
  category: string;
  created_at: string;
};

export type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  message: string;
  status: 'New' | 'Resolved';
  created_at: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
};
