import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Image, } from 'react-native';
import { Feather } from '@expo/vector-icons';

import 'react-native-url-polyfill/auto';
import { supabase } from "../lib/supabaseClient";

import blueBackgroundImg from '../assets/images/blue-background.png';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [articles, setArticles] = useState([]); // ✅ Ajouté ici

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
  const fetchArticles = async () => {
    const { data, error } = await supabase.from('articles').select('*');
    if (error) console.error(error);
    else console.log('Articles:', data);
  };
  fetchArticles();
}, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.title}>{item.titre}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.price}>{item.prix} €</Text>
    </View>
  );

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <ImageBackground
        source={blueBackgroundImg}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ opacity: 0.15 }}
      >
        <Pressable onPress={toggleTheme} style={styles.themeToggle}>
          {darkMode ? (
            <Feather name="sun" size={24} color="#FFC107" />
          ) : (
            <Feather name="moon" size={24} color="#555" />
          )}
        </Pressable>

        <Text style={[styles.title, darkMode && styles.titleDark]}>Deltinfo</Text>

        <Link href="/catalogue" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Catalogue</Text>
          </Pressable>
        </Link>

        <Link href="/identifier" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </Pressable>
        </Link>

        <Link href="/contact" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contactez-nous</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 60,
    fontFamily: 'System',
  },
  titleDark: {
    color: '#f6f8fa',
  },
  button: {
    backgroundColor: '#0078d4',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    padding: 16,
    elevation: 3,
  },
  price: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#0078d4',
  },
});