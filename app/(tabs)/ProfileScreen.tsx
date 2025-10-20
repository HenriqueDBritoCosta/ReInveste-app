// app/(tabs)/ProfileScreen.tsx
import { auth } from "@/config/firebaseConfig";
import { deleteUser, readUser } from "@/config/firebaseCRUD";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingRow from "../components/SettingRow";

export default function ProfileScreen({ navigation }: any) {
  const { theme, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const data = await readUser(u.uid);
        setUsuario(data);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleDelete = () => {
    Alert.alert("Excluir conta", "Tem certeza que deseja excluir sua conta? Esta ação é irreversível.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          if (!user) return;
          try {
            await deleteUser(user.uid);
            // Note: you may want to also delete auth user (reauth required) — omitted for safety
            Alert.alert("Conta excluída", "Dados removidos do banco.");
          } catch (e) {
            Alert.alert("Erro", "Não foi possível excluir conta.");
          }
        },
      },
    ]);
  };

  if (loading) return <SafeAreaView style={styles.safe}><ActivityIndicator color="#1E9E89" /></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        {usuario?.foto ? <Image source={{ uri: usuario.foto }} style={styles.avatarImg} /> : <View style={styles.avatarPlaceholder}><Ionicons name="person" size={40} color="#fff" /></View>}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{usuario?.nome || "Usuário"}</Text>
          <Text style={styles.email}>{user?.email || "Sem email"}</Text>
        </View>
      </View>

      <View style={{ marginTop: 18 }}>
        <SettingRow icon="create" label="Editar perfil" onPress={() => navigation.push("/(tabs)/EditProfileScreen")} />
        <SettingRow icon="moon" label={`Alternar para ${theme === 'dark' ? 'modo claro' : 'modo escuro'}`} onPress={toggleTheme} />
        <SettingRow icon="time" label="Histórico de progresso" onPress={() => alert("Abrir histórico")} />
        <SettingRow icon="settings" label="Configurações" onPress={() => alert("Configurações")} />
        <View style={{ marginTop: 12 }} />
        <TouchableOpacity style={{ padding: 12 }} onPress={handleDelete}><Text style={{ color: '#c0392b', fontWeight: '700' }}>Excluir conta</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: string) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme === 'dark' ? '#0d0d0d' : '#fff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatarImg: { width: 72, height: 72, borderRadius: 16 },
  avatarPlaceholder: { width: 72, height: 72, borderRadius: 16, backgroundColor: '#1E9E89', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: '700', color: theme === 'dark' ? '#fff' : '#111' },
  email: { color: theme === 'dark' ? '#bbb' : '#666', marginTop: 4 },
});
