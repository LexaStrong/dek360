// Supabase Configuration
// You can find these in your Supabase Project Settings > API
const SUPABASE_URL = 'https://kxgqxmpusxzujufgokct.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YNGPGd1SaFwS2aq3dbWhUA_r1Xvemt3';

// Initialize the Supabase client
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = client;
