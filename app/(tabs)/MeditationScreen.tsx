import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './context/ThemeContext';

export default function MeditationScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const abrirLink = (url: string) => Linking.openURL(url).catch(err => console.error('Erro ao abrir link:', err));

  const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1e9e89', marginBottom: 30 },
    button: { backgroundColor: theme === 'dark' ? '#333' : '#1e9e89', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginVertical: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReInveste</Text>

      <TouchableOpacity style={styles.button} onPress={() => abrirLink('https://youtu.be/A-_MfC5Mk9Y?si=zfy6KiRHqLb98r2D')}>
        <Text style={styles.buttonText}>Exercícios de meditação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => abrirLink('https://unolife.com.br/terapia-para-vicio-em-bets/')}>
        <Text style={styles.buttonText}>Apoio psicológico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => abrirLink('https://youtu.be/Q6x0xnI0uCg?si=eE9e2V_wmfSLmG41')}>
        <Text style={styles.buttonText}>Aulas sobre investimento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/DashboardScreen')}>
        <Text style={styles.buttonText}>Voltar para o Início</Text>
      </TouchableOpacity>
    </View>
  );
}
