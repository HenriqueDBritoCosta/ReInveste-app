import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ref, set } from "firebase/database";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { auth, db, remoteConfig, storage } from "../config/firebaseConfig";

export default function CadastroUserScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [idade, setIdade] = useState("");
  const [celular, setCelular] = useState("");
  const [email] = useState(user?.email || "");
  const [foto, setFoto] = useState<string | null>(null);
  const [fotoPermitida, setFotoPermitida] = useState(true);
  const [loading, setLoading] = useState(false);

  // Remote Config
  useEffect(() => {
    const buscarConfig = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        const valor = getValue(remoteConfig, "habilitar_foto").asBoolean();
        setFotoPermitida(valor);
      } catch (e) {
        console.log("Erro Remote Config:", e);
      }
    };
    buscarConfig();
  }, []);

  // Abrir câmera
  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "É necessário permitir o uso da câmera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  // Abrir galeria
  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "É necessário permitir o uso da galeria.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  const escolherFoto = () => {
    Alert.alert("Selecionar Foto", "Escolha uma opção", [
      { text: "📷 Câmera", onPress: abrirCamera },
      { text: "🖼️ Galeria", onPress: abrirGaleria },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const handleSalvar = async () => {
    if (!nome || !sobrenome || !idade || !celular) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (isNaN(Number(idade))) {
      Alert.alert("Erro", "Idade deve ser um número válido.");
      return;
    }

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      setLoading(true);

      let fotoUrl = null;

      // Upload da foto (se permitido)
      if (foto && fotoPermitida) {
        const response = await fetch(foto);
        const blob = await response.blob();
        const imgRef = storageRef(storage, `fotosPerfil/${user.uid}/perfil.jpg`);
        await uploadBytes(imgRef, blob);
        fotoUrl = await getDownloadURL(imgRef);
      }

      await set(ref(db, `usuario/${user.uid}`), {
        nome,
        sobrenome,
        idade,
        email,
        celular,
        foto: fotoUrl,
      });

      setLoading(false);

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => router.replace("/(tabs)/DashboardScreen") },
      ]);
    } catch (error: any) {
      setLoading(false);
      console.log("Erro ao salvar cadastro:", error);
      Alert.alert("Erro", `Não foi possível salvar os dados: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Preencha o cadastro</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
      <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Email" value={email} editable={false} />
      <TextInput style={styles.input} placeholder="Celular" value={celular} onChangeText={setCelular} keyboardType="phone-pad" />

      {foto && <Image source={{ uri: foto }} style={styles.foto} />}

      {fotoPermitida ? (
        <TouchableOpacity style={styles.button} onPress={escolherFoto}>
          <Text style={styles.buttonText}>Adicionar Foto</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: "#fff", marginBottom: 10 }}>
          📷 Envio de foto desativado pelo administrador
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1e9e89" }]}
        onPress={handleSalvar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Salvar Cadastro</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#124668", padding: 20, alignItems: "center" },
  title: { fontSize: 26, color: "#fff", marginBottom: 20, fontWeight: "bold" },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#555",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  foto: { width: 120, height: 120, borderRadius: 60, marginVertical: 10 },
});
