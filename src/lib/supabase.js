import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Debug logging
console.log('=== Supabase Debug ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('REACT_APP_TEST_VAR:', process.env.REACT_APP_TEST_VAR || 'Not found');
console.log('Supabase URL from .env:', supabaseUrl ? '✓ Loaded' : '✗ Missing');
console.log('Supabase Key from .env:', supabaseAnonKey ? '✓ Loaded' : '✗ Missing');

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ WARNING: Supabase environment variables not found');
  console.warn('Make sure .env.local file exists in project root with:');
  console.warn('REACT_APP_SUPABASE_URL=your_url');
  console.warn('REACT_APP_SUPABASE_ANON_KEY=your_key');
  
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Missing Supabase environment variables in production');
  }
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

console.log('✅ Supabase client created successfully');

export { supabase };