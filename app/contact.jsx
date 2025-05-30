import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, SafeAreaView, View, Text, Pressable
} from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';  // pour icônes lune/soleil
import 'react-native-url-polyfill/auto';
import { supabase } from '../helper/supabaseClient';

export default function ContactScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>

      {/* Bouton toggle thème en haut à droite */}
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        {darkMode ? (
          <Feather name="sun" size={24} color="#FFC107" />
        ) : (
          <Feather name="moon" size={24} color="#555" />
        )}
      </Pressable>

      <View style={[styles.imgContainer, darkMode && styles.imgContainerDark]}>
        <Ionicons name="people-circle-outline" size={200} color={darkMode ? "#f6f8fa" : "#003366"} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, darkMode && styles.titleDark]}>Deltinfo</Text>

        <View style={styles.textView}>
          <Text style={[styles.text, darkMode && styles.textDark]}>
            51 Av. de la Côte de Nacre{'\n'}
            14000 Caen
          </Text>
        </View>

        <View style={styles.textView}>
          <Text style={[styles.text, darkMode && styles.textDark]}>
            Téléphone:{'\n'}
            <Link href="tel:0258470376" style={styles.link}>02 58 47 03 76</Link>
          </Text>
        </View>

        <View style={styles.textView}>
          <Text style={[styles.text, darkMode && styles.textDark]}>
            Horaires:{'\n'}
            Lundi au vendredi de 9h00 à 18h00
          </Text>
        </View>

        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Retour à l’accueil</Text>
          </Pressable>
        </Link>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  imgContainer: {
    backgroundColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
  },
  imgContainerDark: {
    backgroundColor: '#353636',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    color: '#003366',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
  },
  titleDark: {
    color: '#f6f8fa',
  },
  textView: {
    marginBottom: 16,
  },
  text: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  textDark: {
    color: '#ddd',
  },
  link: {
    color: '#0078d4',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#0078d4',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
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
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
    padding: 10,
  },
});
