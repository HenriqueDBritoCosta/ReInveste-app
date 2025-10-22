import { auth } from "@/config/firebaseConfig";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const user = auth.currentUser;
  const displayName = user?.displayName || "Usuário";
  const email = user?.email || "email não disponível";
  const photoURL = user?.photoURL;

  // Se não houver foto, usar iniciais
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
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
        style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
        onPress={() => router.push("/(tabs)/edit-profile")}
      >
        {photoURL ? (
          <Image
            source={{ uri: photoURL }}
            style={{ width: 70, height: 70, borderRadius: 35 }}
          />
        ) : (
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: theme === "dark" ? "#333" : "#ddd",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: theme === "dark" ? "#fff" : "#000",
                fontWeight: "bold",
              }}
            >
              {getInitials(displayName)}
            </Text>
          </View>
        )}

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            {displayName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme === "dark" ? "#aaa" : "#555",
            }}
          >
            {email}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Botão Editar Perfil */}
      <TouchableOpacity
        style={{
          marginTop: 30,
          backgroundColor: "#007AFF",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={() => router.push("/(tabs)/edit-profile")}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Excluir conta */}
      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 14,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme === "dark" ? "#444" : "#ccc",
          alignItems: "center",
        }}
        onPress={() => {
          // placeholder por enquanto
        }}
      >
        <Text
          style={{
            color: theme === "dark" ? "#ff5c5c" : "#c62828",
            fontWeight: "600",
          }}
        >
          Excluir conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
