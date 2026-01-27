// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

console.log('=== Environment Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('All REACT_APP_ vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));

// Get environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Supabase URL from env:', supabaseUrl ? 'Present' : 'Missing');
console.log('Supabase Key from env:', supabaseAnonKey ? 'Present' : 'Missing');

// Development fallback (for testing)
const devUrl = 'https://glrbnjezljfyhanroxlw.supabase.co';
const devKey = 'sb_publishable_MtY7U15I9YU2ORh1X87Msg_YBpLQctM';

// Use environment variables if available, otherwise use dev credentials
const finalUrl = supabaseUrl || devUrl;
const finalKey = supabaseAnonKey || devKey;

console.log('Using Supabase URL:', finalUrl);

// Create and export Supabase client
const supabase = createClient(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

console.log('✅ Supabase client initialized');

export { supabase };