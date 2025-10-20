// app/config/firebaseConfig.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCoh3Z-D0g-o28_pqyyaFHgI4HV--lc61U",
  authDomain: "login-reinveste.firebaseapp.com",
  projectId: "login-reinveste",
  storageBucket: "login-reinveste.appspot.com",
  messagingSenderId: "108071899876",
  appId: "1:108071899876:web:8eccfde10eb7d98400d2f1",
  databaseURL: "https://login-reinveste-default-rtdb.firebaseio.com/",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializa Database e Storage
const db = getDatabase(app);
const storage = getStorage(app);

// Exporta tudo
export { app, auth, db, storage };

