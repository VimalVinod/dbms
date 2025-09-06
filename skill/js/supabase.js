// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔹 Replace these with your project details from Supabase dashboard
const SUPABASE_URL = "https://evkoifoggzpajpkuqbdh.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2a29pZm9nZ3pwYWpwa3VxYmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjY2MTgsImV4cCI6MjA3MjQ0MjYxOH0.UhowOjNezOuUn6HAN9EZ510-_mqmv3UA4WoySL_yuyc"

// Create client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
