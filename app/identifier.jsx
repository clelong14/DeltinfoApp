import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons'; // import icônes lune/soleil
import 'react-native-url-polyfill/auto';
import { supabase } from '../helper/supabaseClient';

function Identifier() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [darkMode, setDarkMode] = useState(false); // thème clair par défaut

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage("User account created!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkBackground : styles.lightBackground]}>
      {/* Bouton toggle thème */}
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        {darkMode ? (
          <Feather name="sun" size={24} color="#FFC107" />
        ) : (
          <Feather name="moon" size={24} color="#555" />
        )}
      </Pressable>

      <Text style={[styles.title, darkMode ? styles.textLight : styles.textDark]}>S'identifier</Text>
      {message !== "" && <Text style={styles.message}>{message}</Text>}

      <TextInput
        style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
        placeholder="Email"
        placeholderTextColor={darkMode ? "#aaa" : "#555"}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
        placeholder="Mot de passe"
        placeholderTextColor={darkMode ? "#aaa" : "#555"}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </Pressable>

      <Text style={[styles.loginText, darkMode ? styles.textLight : styles.textDark]}>
        Vous avez déjà un compte ?
        <Link href="/connection">
          <Text style={styles.link}> Se connecter</Text>
        </Link>
      </Text>
    </View>
  );
}

export default Identifier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  darkBackground: {
    backgroundColor: '#000',
  },
  lightBackground: {
    backgroundColor: '#f5f5f5',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  textLight: {
    color: '#fff',
  },
  textDark: {
    color: '#000',
  },
  message: {
    color: '#ff5c5c',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputDark: {
    backgroundColor: '#1e1e1e',
    color: 'white',
  },
  inputLight: {
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: '#4da6ff',
    fontWeight: 'bold',
  },
});
