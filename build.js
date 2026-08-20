const fs = require('fs');
const path = require('path');

// Load environment variables from .env if present (for local builds)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split(/\r?\n/).forEach(line => {
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('#')) return;
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const configContent = `// Auto-generated configuration file. Do not commit.
window.ENV = {
  SUPABASE_URL: \`${supabaseUrl}\`,
  SUPABASE_ANON_KEY: \`${supabaseAnonKey}\`
};
`;

const configPath = path.join(__dirname, 'js', 'config.js');
fs.writeFileSync(configPath, configContent);
console.log('js/config.js generated successfully!');
