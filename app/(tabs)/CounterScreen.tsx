// app/(tabs)/CounterScreen.tsx
import { useNetwork } from "@/context/NetworkContext";
import { useTheme } from "@/context/ThemeContext";
import { useAsyncStorageNumber } from "@/hooks/useAsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CounterScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { value: days, setValue: setDays, loading } = useAsyncStorageNumber("@reinveste:days", 0);
  const { online } = useNetwork();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // small pop when mounting
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
  }, []);

  const increment = async () => {
    const next = days + 1;
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.08, duration: 150, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    await setDays(next);
  };

  const reset = async () => {
    await setDays(0);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Dias sem apostas</Text>

        <Animated.View style={[styles.ring, { transform: [{ scale }] }]}>
          <Text style={styles.days}>{loading ? "--" : days}</Text>
        </Animated.View>

        <Text style={styles.motivate}>{online ? "Conectado — dados salvos localmente" : "Você está offline — progresso salvo localmente"}</Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={increment} activeOpacity={0.85}>
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.primaryText}>Adicionar 1 dia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ghostBtn} onPress={reset} activeOpacity={0.85}>
          <Text style={styles.ghostText}>Zerar contador</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: string) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme === 'dark' ? '#0f0f0f' : '#fff' },
  container: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 24, color: '#1E9E89', fontWeight: '700', marginBottom: 18 },
  ring: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: '#1E9E89',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    backgroundColor: 'rgba(30,158,137,0.06)'
  },
  days: { fontSize: 42, color: '#1E9E89', fontWeight: '800' },
  motivate: { fontSize: 15, color: theme === 'dark' ? '#ddd' : '#333', marginBottom: 22, textAlign: 'center'},
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E9E89',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '80%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  primaryText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
  ghostBtn: { backgroundColor: 'transparent', paddingVertical: 10, borderRadius: 10 },
  ghostText: { color: theme === 'dark' ? '#bbb' : '#666' },
});
