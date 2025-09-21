// app/config/firebaseConfig.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// Config gerado pelo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCoh3Z-D0g-o28_pqyyaFHgI4HV--lc61U",
  authDomain: "login-reinveste.firebaseapp.com",
  projectId: "login-reinveste",
  storageBucket: "login-reinveste.appspot.com",
  messagingSenderId: "108071899876",
  appId: "1:108071899876:web:8eccfde10eb7d98400d2f1",
  measurementId: "G-FJ5H0X8D6L",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

