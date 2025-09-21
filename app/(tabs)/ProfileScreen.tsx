import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './context/ThemeContext';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1e9e89', marginBottom: 30 },
    button: { backgroundColor: theme === 'dark' ? '#333' : '#1e9e89', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginVertical: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          Alternar para {theme === 'dark' ? 'modo claro' : 'modo escuro'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => alert('Editar perfil')}>
        <Text style={styles.buttonText}>Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => alert('Configurações')}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => alert('Logout')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
