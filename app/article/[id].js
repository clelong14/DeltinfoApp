import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Pressable, Alert, } from "react-native";
import { supabase } from "../../lib/supabaseClient";

export default function ArticleDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header personnalisé dark */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Informations</Text>
      </View>

      {/* Contenu article */}
      <Text style={styles.title}>{article.titre}</Text>
      <Image source={{ uri: article.image_url }} style={styles.image} />
      <Text style={styles.description}>{article.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#121212",  // fond sombre
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    paddingRight: 15,
    paddingVertical: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 10,
    paddingVertical: 5,
    paddingRight: 15,
    flex: 1,
    paddingTop: 5,
    textAlign: "",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
  },
});