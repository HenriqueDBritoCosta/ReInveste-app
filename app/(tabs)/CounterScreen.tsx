import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './context/ThemeContext';

export default function CounterScreen() {
  const { theme } = useTheme();
  const [days, setDays] = useState(0);

  const resetCounter = () => {
    Alert.alert(
      'Zerar contador',
      'Você realmente apostou? O contador será resetado.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => setDays(0) },
      ]
    );
  };

  const incrementCounter = () => setDays(prev => prev + 1);

  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1e9e89', marginBottom: 30 },
    button: { backgroundColor: theme === 'dark' ? '#333' : '#1e9e89', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginVertical: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    counterText: { fontSize: 24, color: theme === 'dark' ? '#fff' : '#000', marginBottom: 20 },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dias sem apostas</Text>
      <Text style={styles.counterText}>{days}</Text>

      <TouchableOpacity style={styles.button} onPress={incrementCounter}>
        <Text style={styles.buttonText}>Adicionar 1 dia</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetCounter}>
        <Text style={styles.buttonText}>Zerar contador</Text>
      </TouchableOpacity>
    </View>
  );
}
