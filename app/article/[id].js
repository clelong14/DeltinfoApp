import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Pressable, Alert, TouchableOpacity, useColorScheme, } from "react-native";
import { supabase } from "../../lib/supabaseClient";

const lightTheme = {
  background: "#f5f7fa",
  text: "#003366",
  cardBackground: "#fff",
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

export default function ArticleDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setArticle(data);
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  const handleAddToCart = () => {
    Alert.alert("Ajouté au panier", `${article.titre} a été ajouté à votre panier.`);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!article) {
    return <Text style={{ margin: 20, fontSize: 18 }}>Article introuvable.</Text>;
  }

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {/* Header personnalisé */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Détails produit</Text>
      </View>

      {/* Contenu article */}
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Image source={{ uri: article.image_url }} style={styles.image} />
        <Text style={[styles.title, { color: theme.text }]}>{article.titre}</Text>
        <Text style={[styles.price, { color: theme.text }]}>Prix : {article.prix ?? "N/A"} €</Text>
        <Text style={[styles.description, { color: theme.descriptionText }]}>
          {article.description}
        </Text>

        <Pressable
          onPress={handleAddToCart}
          style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Ajouter au panier</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    paddingRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});