//app/CadastroScreen
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../config/firebaseConfig";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      if (userCredential.user) await updateProfile(userCredential.user, { displayName: nome });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      router.replace("/CadastroUserScreen");
    } catch (error: any) {
      let msg = "Não foi possível cadastrar";
      if (error.code === "auth/email-already-in-use") msg = "Este email já está em uso.";
      else if (error.code === "auth/invalid-email") msg = "Formato de email inválido.";
      else if (error.code === "auth/weak-password") msg = "Senha muito fraca (mínimo 6 caracteres).";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Carregando..." : "Cadastrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.linkText}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#124668", padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", color: "#fff", marginBottom: 40 },
  input: { width: "80%", backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 15, borderColor: "#ccc", borderWidth: 1 },
  button: { backgroundColor: "#1e9e89", padding: 15, borderRadius: 10, width: "80%", alignItems: "center", marginTop: 15 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: { color: "#fff", marginTop: 10 },
});
