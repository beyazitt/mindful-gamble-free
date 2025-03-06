
import { AndroidConfig } from '@capacitor/cli';

const config: AndroidConfig = {
  path: 'android',
  packageName: 'app.lovable.5e18c50bce85412d989e6e6173938af7',
  versionName: '1.0.0',
  versionCode: 1,
  gradle: {
    properties: {
      'android.enableJetifier': 'true',
      'android.useAndroidX': 'true',
    },
  },
};

export default config;
