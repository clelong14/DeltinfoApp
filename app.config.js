import 'dotenv/config';

export default {
  expo: {
    name: "MyApp",
    slug: "MyApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/deltinfo-logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.MyApp",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/deltinfo-logo.png",
          imageWidth: 200,
          resizeMode: "cover",
          backgroundColor: "#000000",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },

    // ici on injecte les variables d’environnement
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      router: {},
      eas: {
        projectId: "68dd9ae7-c58c-417f-91bb-25cb307949a8",
      },
    },
  },
};