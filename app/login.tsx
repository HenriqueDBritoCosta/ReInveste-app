// app/login.tsx
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../config/firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.replace("/(tabs)/DashboardScreen");
    } catch (error: any) {
      let message = "Erro ao fazer login";

      if (error.code === "auth/user-not-found") message = "Usuário não encontrado";
      else if (error.code === "auth/wrong-password") message = "Senha incorreta";
      else if (error.code === "auth/invalid-email") message = "Email inválido";

      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReInveste</Text>
      <Text style={styles.subtitle}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Carregando..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/CadastroScreen")}>
        <Text style={styles.linkText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#124668", padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  subtitle: { fontSize: 16, color: "#fff", marginBottom: 40 },
  input: { backgroundColor: "#fff", width: "80%", borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#1e9e89", padding: 15, borderRadius: 10, width: "80%", alignItems: "center", marginTop: 15 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: { color: "#fff", marginTop: 10 },
});
