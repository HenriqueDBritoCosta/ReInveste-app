// app/(tabs)/MeditationScreen.tsx
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ActionCard from '../components/ActionCard';

export default function MeditationScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = createStyles(theme);

  const openLink = (url: string) => Linking.openURL(url).catch(() => null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-estar</Text>
        <Text style={styles.subtitle}>Recursos para reduzir a ansiedade e lidar com impulsos.</Text>

        <View style={{ width: '100%', marginTop: 18 }}>
          <ActionCard
            title="Meditações guiadas"
            subtitle="Práticas de 3 a 15 minutos"
            icon="flower"
            color="#6C63FF"
            onPress={() => openLink('https://youtu.be/A-_MfC5Mk9Y?si=zfy6KiRHqLb98r2D')}
          />

          <ActionCard
            title="Apoio psicológico"
            subtitle="Artigos e serviços profissionais"
            icon="people"
            color="#1E9E89"
            onPress={() => openLink('https://unolife.com.br/terapia-para-vicio-em-bets/')}
          />

          <ActionCard
            title="Aprenda sobre investimentos"
            subtitle="Aulas e conteúdos básicos"
            icon="school"
            color="#FF9F43"
            onPress={() => openLink('https://youtu.be/Q6x0xnI0uCg?si=eE9e2V_wmfSLmG41')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: string) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme === 'dark' ? '#0b0b0b' : '#fff' },
    container: { padding: 20, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: '700', color: '#1E9E89' },
    subtitle: { marginTop: 6, color: theme === 'dark' ? '#ddd' : '#666', textAlign: 'center' },
  });
