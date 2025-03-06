
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5e18c50bce85412d989e6e6173938af7',
  appName: 'mindful-gamble-free',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Remove the URL from server configuration to use the bundled web assets
    cleartext: true
  },
  // Add any additional configuration options here
};

export default config;
