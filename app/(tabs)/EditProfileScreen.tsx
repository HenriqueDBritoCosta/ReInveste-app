// app/(tabs)/EditProfileScreen.tsx
import { auth } from "@/config/firebaseConfig";
import { readUser, updateUser, uploadProfileImage } from "@/config/firebaseCRUD";
import { useTheme } from "@/context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user) { setLoading(false); return; }
      const u = await readUser(user.uid);
      if (u) {
        setNome(u.nome || "");
        setSobrenome(u.sobrenome || "");
        setCelular(u.celular || "");
        setFotoUri(u.foto || null);
      }
      setLoading(false);
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Por favor permita acesso à galeria.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
    if (!res.canceled) setFotoUri(res.assets[0].uri);
  };

  const save = async () => {
    if (!user) { Alert.alert("Erro", "Usuário não autenticado."); return; }
    setSaving(true);
    try {
      let fotoUrl = fotoUri;
      if (fotoUri && fotoUri.startsWith("file")) {
        const response = await fetch(fotoUri);
        const blob = await response.blob();
        fotoUrl = await uploadProfileImage(user.uid, blob);
      }
      await updateUser(user.uid, { nome, sobrenome, celular, foto: fotoUrl });
      Alert.alert("Sucesso", "Perfil atualizado.");
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Falha ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <SafeAreaView style={styles.safe}><ActivityIndicator color="#1E9E89" /></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ alignItems: "center", padding: 20 }}>
        {fotoUri ? <Image source={{ uri: fotoUri }} style={styles.avatar} /> : <View style={styles.avatarPlaceholder}><Text style={{color:'#fff'}}>Sem foto</Text></View>}
        <TouchableOpacity style={styles.btn} onPress={pickImage}><Text style={styles.btnText}>Alterar foto</Text></TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
        <TextInput style={styles.input} placeholder="Celular" value={celular} onChangeText={setCelular} keyboardType="phone-pad" />

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1E9E89' }]} onPress={save} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff"/> : <Text style={styles.btnText}>Salvar</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: string) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme === 'dark' ? '#0d0d0d' : '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 16, marginBottom: 12 },
  avatarPlaceholder: { width: 120, height: 120, borderRadius: 16, backgroundColor: '#1E9E89', alignItems:'center', justifyContent:'center', marginBottom:12 },
  btn: { backgroundColor: '#666', padding: 12, borderRadius: 8, alignItems:'center', width: '100%', marginBottom: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 }
});
