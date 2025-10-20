import { useRouter } from "expo-router";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { auth, db } from "../config/firebaseConfig"; // Removido 'storage' e 'remoteConfig'

export default function CadastroUserScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  // Estados apenas para os campos de texto
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [idade, setIdade] = useState("");
  const [celular, setCelular] = useState("");
  const [email] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  // Removido o useEffect para o Remote Config

  const handleSalvar = async () => {
    // 1. Validação dos campos
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

      // 2. Salvando dados no Realtime Database (sem a fotoUrl)
      await set(ref(db, `usuario/${user.uid}`), {
        nome,
        sobrenome,
        idade: Number(idade), // Salvando como número
        email,
        celular,
      });

      setLoading(false);

      // 3. Sucesso e navegação
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => router.replace("/(tabs)/DashboardScreen") },
      ]);
    } catch (error: any) {
      setLoading(false);
      console.error("Erro ao salvar cadastro:", error);
      Alert.alert("Erro", `Não foi possível salvar os dados: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Preencha o cadastro</Text>

      {/* Formulário */}
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
      <TextInput 
        style={styles.input} 
        placeholder="Idade" 
        value={idade} 
        onChangeText={setIdade} 
        keyboardType="numeric" 
        maxLength={3} 
      />
      <TextInput style={styles.input} placeholder="Email" value={email} editable={false} />
      <TextInput 
        style={styles.input} 
        placeholder="Celular" 
        value={celular} 
        onChangeText={setCelular} 
        keyboardType="phone-pad" 
        maxLength={15} 
      />

      {/* Botão de Salvar */}
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
  // Removido os estilos 'foto', 'fotoContainer', 'fotoPlaceholder'
});