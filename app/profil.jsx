import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import 'react-native-url-polyfill/auto';
import { supabase } from '../helper/supabaseClient';

export default function Profil() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [password, setPassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setLoading(false);
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/identifier');
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    if (!password || password.length < 6) {
      setDeleteError('Mot de passe requis');
      return;
    }

    const email = session?.user?.email;

    // Re-authentifier l'utilisateur
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setDeleteError("Mot de passe incorrect.");
      return;
    }

    // Supprimer le compte après vérification
    const { error: deleteError } = await supabase.auth.admin.deleteUser(session.user.id);

    if (deleteError) {
      setDeleteError("Erreur lors de la suppression.");
    } else {
      Alert.alert("Compte supprimé", "Votre compte a été supprimé.");
      router.replace("/identifier");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vous n'êtes pas connecté</Text>
        <Pressable style={styles.button} onPress={() => router.push('/identifier')}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push('/connection')}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <Text style={styles.info}>Email : {session.user.email}</Text>
      <Text style={styles.info}>ID : {session.user.id}</Text>
      <Text style={styles.info}>
        Créé le : {new Date(session.user.created_at).toLocaleDateString()}
      </Text>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </Pressable>

      {!confirmDelete ? (
        <Pressable style={styles.deleteButton} onPress={() => setConfirmDelete(true)}>
          <Text style={styles.buttonText}>Supprimer mon compte</Text>
        </Pressable>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {deleteError !== '' && <Text style={styles.error}>{deleteError}</Text>}
          <Pressable style={styles.confirmDeleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>Confirmer la suppression</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4da6ff',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  logoutButton: {
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  confirmDeleteButton: {
    backgroundColor: '#b30000',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 6,
    marginBottom: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
