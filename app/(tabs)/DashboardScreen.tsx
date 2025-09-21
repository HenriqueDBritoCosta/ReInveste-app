import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from './context/ThemeContext';

export default function DashboardScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1e9e89', marginBottom: 30 },
    button: { backgroundColor: theme === 'dark' ? '#333' : '#1e9e89', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginVertical: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  });

  const telas = [
    { title: 'Tratamento', screen: '/(tabs)/MeditationScreen' },
    { title: 'Contador', screen: '/(tabs)/CounterScreen' },
    { title: 'Perfil', screen: '/(tabs)/ProfileScreen' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ReInveste</Text>

      {telas.map(item => (
        <TouchableOpacity
          key={item.screen}
          style={styles.button}
          onPress={() => router.push(item.screen)}
        >
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
