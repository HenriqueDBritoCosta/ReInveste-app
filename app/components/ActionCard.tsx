// app/components/ActionCard.tsx
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ActionCard({ title, subtitle, iconElement, color = "#1E9E89", onPress }: any) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity activeOpacity={0.85} style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.left}>{iconElement ?? null}</View>
      <View style={styles.right}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: string) => StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    marginVertical: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: theme === "dark" ? 0.18 : 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  left: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  right: { flex: 1 },
  title: { color: "#fff", fontSize: 16, fontWeight: "700" },
  subtitle: { color: "rgba(255,255,255,0.9)", marginTop: 4, fontSize: 13 },
});
