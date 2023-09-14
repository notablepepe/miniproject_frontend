import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.acbx97',
  appName: 'Meal Planner',
  webDir: 'dist/project_angular',
  server: {
    androidScheme: 'https'
  }
};

export default config;
