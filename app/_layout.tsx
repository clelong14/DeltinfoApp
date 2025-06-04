import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Session } from "@supabase/supabase-js";
import { Appearance, View, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import 'react-native-url-polyfill/auto';
import { supabase } from "../lib/supabaseClient";

import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const router = useRouter();

 const [loading, setLoading] = useState(true);
 const [session, setSession] = useState<Session | null>(null);
  
  // Thème système + écoute dynamique
  const [darkMode, setDarkMode] = useState(
    Appearance.getColorScheme() === "dark"
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === "dark");
    });

    return () => listener.remove();
  }, []);

  const theme = darkMode ? Colors.dark : Colors.light;

// Auth Supabase
 useEffect(() => {
  const getSession = async () => {
     try {
       const { data, error } = await supabase.auth.getSession();
       if (error) {
         console.error("Erreur Supabase session :", error);
       }
       setSession(data?.session ?? null);
     } catch (err) {
       console.error("Erreur inattendue :", err);
     } finally {
       setLoading(false); // <-- essentiel !
     }
   };

   getSession();

   const { data: authListener } = supabase.auth.onAuthStateChange(
     (_event, session) => {
             setSession(session);
     }
   );

   return () => {
     authListener?.subscription?.unsubscribe?.();
   };
 }, []);



  // Fonts
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Loader
  if (loading || !loaded) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 15 }}>
              {session && (
                <Pressable onPress={() => router.push("/profil")}>
                  <Feather name="user" size={24} color={theme.text} />
                </Pressable>
              )}
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="catalogue"
          options={{
            headerShown: true,
            title: "Catalogue Deltinfo",
          }}
        />
        <Stack.Screen
          name="identifier"
          options={{
            headerShown: true,
            title: "S'identifier",
          }}
        />
        <Stack.Screen
          name="connection"
          options={{
            headerShown: true,
            title: "Se connecter",
          }}
        />
        <Stack.Screen
          name="profil"
          options={{
            headerShown: true,
            title: "Mon compte",
          }}
        />
        <Stack.Screen
          name="contact"
          options={{
            headerShown: true,
            title: "Contact Us",
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
}
