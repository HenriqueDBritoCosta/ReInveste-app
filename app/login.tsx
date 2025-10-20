// app/login.tsx
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, ref } from "firebase/database";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../config/firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Busca dados do aluno
      const snapshot = await get(ref(db, `alunos/${user.uid}`));
      const data = snapshot.val();

      Alert.alert("Sucesso", "Login realizado!");
      // Redireciona para o dashboard
      router.replace({
        pathname: "/(tabs)/DashboardScreen",
        params: {
          userName: data?.nome || "",
          userPhoto: data?.foto || "",
        },
      });
    } catch (error: any) {
      Alert.alert("Erro ao logar", error.message || "Erro desconhecido");
    }
  };

  const irParaCadastro = () => {
    router.replace("/CadastroScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login FIAP</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#555" }]} onPress={irParaCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    padding: 14,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
