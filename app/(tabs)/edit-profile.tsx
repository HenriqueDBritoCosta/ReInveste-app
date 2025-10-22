import { auth } from "@/config/firebaseConfig";
import { useTheme } from "@/context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo || undefined,
      });
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
      }}
    >
      <TouchableOpacity
        onPress={pickImage}
        style={{
          alignSelf: "center",
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: theme === "dark" ? "#333" : "#ddd",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
          {photo ? "Alterar Foto" : "Adicionar Foto"}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginBottom: 6, color: theme === "dark" ? "#fff" : "#000" }}>
        Nome completo
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
        placeholderTextColor={theme === "dark" ? "#777" : "#aaa"}
        style={{
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          borderRadius: 8,
          padding: 12,
        }}
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        style={{
          marginTop: 30,
          backgroundColor: "#007AFF",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "600" }}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
