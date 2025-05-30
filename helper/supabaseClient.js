import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// 🔐 Remplace par TON URL et TA clé
const SUPABASE_URL = 'https://mocnbrmswtszbwrhiznk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY25icm1zd3RzemJ3cmhpem5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTAxMTEsImV4cCI6MjA2MzM4NjExMX0.V3n-mmjs6tVtokfCQSw_dfSFh8eDQX8rQ1ypgqGLqDQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
