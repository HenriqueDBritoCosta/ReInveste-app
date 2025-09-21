import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

export default function Layout() {
  return (
    <ThemeProvider>
      <TabsWrapper />
    </ThemeProvider>
  );
}

function TabsWrapper() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1e9e89',
        tabBarStyle: { backgroundColor: theme === 'dark' ? '#222' : '#fff' },
      }}
    >
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="CounterScreen"
        options={{
          title: 'Dias sem apostas',
          tabBarIcon: ({ color, size }) => <Ionicons name="timer" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
