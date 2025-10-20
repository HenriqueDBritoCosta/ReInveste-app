// app/(tabs)/DashboardScreen.tsx
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ActionCard from '../components/ActionCard';

export default function DashboardScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>Olá 👋</Text>
        <Text style={styles.title}>ReInveste</Text>
        <Text style={styles.subtitle}>Reeducação emocional e financeira — passos curtos, progresso real.</Text>

        <View style={{ width: '100%', marginTop: 18 }}>
          <ActionCard
            title="Saúde emocional"
            subtitle="Meditações, apoio e diário de humor"
            icon="heart"
            color="#4D96FF"
            onPress={() => router.push('/(tabs)/MeditationScreen')}
          />

          <ActionCard
            title="Dias sem apostas"
            subtitle="Acompanhe seu progresso e veja conquistas"
            icon="trophy"
            color="#1E9E89"
            onPress={() => router.push('/(tabs)/CounterScreen')}
          />

          <ActionCard
            title="Aprenda sobre investimentos"
            subtitle="Trilhas educativas e aulas práticas"
            icon="school"
            color="#FF9F43"
            onPress={() => router.push('/(tabs)/MeditationScreen')}
          />
        </View>

        <View style={{ marginTop: 24, width: '100%' }}>
          <Text style={styles.sectionTitle}>Dicas rápidas</Text>
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>Se sentir vontade de apostar: respire 3x, abra aqui um exercício de 3 minutos e anote no diário.</Text>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: string) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme === 'dark' ? '#121212' : '#fff' },
    container: { alignItems: 'center', padding: 20 },
    greeting: { fontSize: 16, color: theme === 'dark' ? '#ccc' : '#666' },
    title: { fontSize: 32, fontWeight: '700', color: '#1E9E89', marginTop: 6 },
    subtitle: { fontSize: 14, color: theme === 'dark' ? '#ddd' : '#666', marginTop: 6, maxWidth: 420 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: theme === 'dark' ? '#fff' : '#222', marginBottom: 8 },
    hintBox: {
      backgroundColor: theme === 'dark' ? '#1b1b1b' : '#f6f8fa',
      padding: 12,
      borderRadius: 12,
    },
    hintText: { color: theme === 'dark' ? '#ddd' : '#333' },
  });
