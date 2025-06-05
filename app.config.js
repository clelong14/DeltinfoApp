import 'dotenv/config';

export default () => ({
  name: "SupabaseTest",
  slug: "supabasetest",
  version: "1.0.0",
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: {
      projectId: "a32d6bc5-fbff-4574-94f3-8e8498e6e502",
    },
  },
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "supabasetest",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.clelong14.supabasetest",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  ios: {
  bundleIdentifier: "com.clelong14.supabasetest",
  supportsTablet: true,
  infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  owner: "clelong14", // clé owner ici
});