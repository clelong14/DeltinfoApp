import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image, Pressable, } from "react-native";
import { Link } from "expo-router";
import { Feather } from '@expo/vector-icons';

import 'react-native-url-polyfill/auto';
import { supabase } from "../lib/supabaseClient";

const lightTheme = {
  background: "#f5f7fa",
  text: "#003366",
  cardBackground: "white",
  descriptionText: "#444",
  buttonBackground: "#003366",
  buttonText: "white",
};

const darkTheme = {
  background: "#121212",
  text: "#a1c6e7",
  cardBackground: "#1e1e1e",
  descriptionText: "#ccc",
  buttonBackground: "#4a90e2",
  buttonText: "black",
};

export default function MenuScreen() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utilisation de l'API Supabase pour récupérer les articles
//   useEffect(() => {
//   const fetchArticles = async () => {
//     try {
//       const response = await fetch('http://192.168.30.230:8081/articles');
//       const data = await response.json();

//       if (!Array.isArray(data)) {
//         throw new Error("Format de réponse invalide");
//       }

//       setArticles(data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des articles :", error);
//       setArticles([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchArticles();
// }, []);

// Utilisation de Supabase hébérger en ligne pour récupérer les articles
useEffect(() => {
  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('id', { ascending: true }); // optionnel : ordonner les articles

      if (error) {
        throw error;
      }

      if (!Array.isArray(data)) {
        throw new Error("Format de réponse invalide");
      }

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
  const separatorComp = <View style={styles.separator} />;
  const footerComp = <Text style={styles.footerComp}>Fin du catalogue</Text>;

  if (loading) {
    return (
      <View style={[styles.wrapper, styles.container]}>
        <Text style={styles.emptyText}>Chargement du catalogue...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.toggleButton}
        onPress={() => setIsDark((prev) => !prev)}
        accessibilityLabel="Toggle dark/light mode"
      >
        {isDark ? (
          <Feather name="sun" size={24} color="#FFC107" />
        ) : (
          <Feather name="moon" size={24} color="#555" />
        )}
      </Pressable>

      <Container style={styles.container}>
        <FlatList
          data={Array.isArray(articles) ? articles : []}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => separatorComp}
          ListFooterComponent={footerComp}
          renderItem={({ item }) => (
          <Link href={`/article/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.titre}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <Image
                source={{ uri: item.image_url }}
                style={styles.image}
                resizeMode="cover"
              />
            </Pressable>
          </Link>
        )}

          ListEmptyComponent={
            <Text style={styles.emptyText}>Pas d'article.</Text>
          }
        />
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
      resizeMode: "cover",
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
