// app/components/SettingRow.tsx
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingRow({
  icon,
  label,
  onPress,
  right,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon as any} size={22} color="#1E9E89" />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View>{right ?? <Ionicons name="chevron-forward" size={20} color={theme === 'dark' ? '#aaa' : '#666'} />}</View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: string) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 8,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#222' : '#eee',
    },
    left: { flexDirection: 'row', alignItems: 'center' },
    label: { marginLeft: 12, fontSize: 16, color: theme === 'dark' ? '#fff' : '#222' },
  });
