// Initialize Supabase Client using configurations generated from Env
(function() {
  if (typeof supabase === 'undefined') {
    console.error('Supabase library not loaded. Make sure the CDN script is included before this script.');
    return;
  }

  const supabaseUrl = window.ENV?.SUPABASE_URL || '';
  const supabaseAnonKey = window.ENV?.SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please setup environment variables (SUPABASE_URL and SUPABASE_ANON_KEY).');
  }

  window.supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
})();
