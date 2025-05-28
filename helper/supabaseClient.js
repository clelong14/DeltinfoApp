import 'react-native-url-polyfill/auto'; // obligatoire
import { createClient } from '@supabase/supabase-js';

// Parfois, tu dois forcer fetch global (mais tu l'as déjà fait, c'est bien)
// Et ajouter d'autres polyfills si nécessaire.

const supabaseUrl = "https://mocnbrmswtszbwrhiznk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY25icm1zd3RzemJ3cmhpem5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTAxMTEsImV4cCI6MjA2MzM4NjExMX0.V3n-mmjs6tVtokfCQSw_dfSFh8eDQX8rQ1ypgqGLqDQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
  global: {
    fetch: fetch, // important
  },
});

export default supabase;
