import { useState } from 'react';
import { Link } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';  // pour les icônes lune/soleil

import blueBackgroundImg from "@/assets/images/blue-background.png";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <ImageBackground
        source={blueBackgroundImg}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ opacity: 0.15 }} // assombrit un peu le fond
      >
        {/* Bouton thème en haut à droite */}
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
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa', // fond clair style web Deltinfo
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
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
    color: '#003366', // bleu foncé proche Deltinfo
    textAlign: 'center',
    marginBottom: 60,
    fontFamily: 'System',
  },
  titleDark: {
    color: '#f6f8fa',
  },
  button: {
    backgroundColor: '#0078d4', // bleu vif, bouton principal
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
});