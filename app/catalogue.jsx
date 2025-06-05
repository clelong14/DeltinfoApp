import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image, Pressable, Appearance } from "react-native";
import { Link } from "expo-router";

import 'react-native-url-polyfill/auto';
import { supabase } from "../lib/supabaseClient";
import { Colors } from "@/constants/Colors";

export default function MenuScreen() {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === "dark");

  // Thème dynamique global
  const theme = isDark ? Colors.dark : Colors.light;
  const styles = createStyles(theme);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        if (!Array.isArray(data)) throw new Error("Format de réponse invalide");

        setArticles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  return (
    <View style={styles.wrapper}>
      <Container style={styles.container}>
        {loading ? (
          <Text style={styles.emptyText}>Chargement du catalogue...</Text>
        ) : (
          <FlatList
            data={articles}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={<Text style={styles.footerComp}>Fin du catalogue</Text>}
            renderItem={({ item }) => (
              <Link href={`/article/${item.id}`} asChild>
                <Pressable style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.titre}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                  <Image source={{ uri: item.image_url }} style={styles.image} resizeMode="cover" />
                </Pressable>
              </Link>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Pas d'article.</Text>}
          />
        )}
      </Container>
    </View>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    contentContainerStyle: {
      paddingBottom: 20,
      alignItems: "center",
    },
    separator: {
      height: 12,
    },
    footerComp: {
      color: theme.text,
      fontSize: 14,
      textAlign: "center",
      marginVertical: 20,
      fontStyle: "italic",
    },
    card: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 700,
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      alignItems: "center",
    },
    textContainer: {
      flex: 1,
      paddingRight: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 8,
      textDecorationLine: "underline",
    },
    description: {
      fontSize: 16,
      color: theme.descriptionText,
      lineHeight: 22,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 12,
      backgroundColor: "#eee",
    },
    emptyText: {
      textAlign: "center",
      marginTop: 40,
      fontSize: 16,
      color: theme.text,
    },
    toggleButton: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 10,
      padding: 10,
      borderRadius: 30,
    },
  });
}