# Integrantes

| Nome | RM |
|------|-----|
| Adriano Lopes | RM98574 |
| Henrique de Brito | RM98831 |
| João Antonio Rihan | RM99656 |
| Rodrigo Fernandes Serafim | RM550816 |
| Rodrigo Lima | RM98326 |
---

# ReInveste-app 🔥

Este é um projeto mobile desenvolvido com **React Native** e **Expo**, integrado ao **Firebase Authentication**, voltado para ajudar usuários a se manterem afastados de apostas, promovendo **saúde mental**, **educação financeira** e **bem-estar**.

---

## 🚀 Tecnologias Utilizadas

* **React Native** - Framework para desenvolvimento mobile multiplataforma
* **Expo** - Plataforma que simplifica o desenvolvimento React Native
* **Firebase** - Backend-as-a-Service da Google para autenticação e persistência de dados
* **TypeScript** - Superset do JavaScript com tipagem estática

---

## 📱 Funcionalidades

✅ Configuração completa do Firebase
✅ Sistema de autenticação (login e cadastro)
✅ Navegação protegida com rotas autenticadas
✅ Contador de dias sem apostas com reset
✅ Tela de meditação e links de apoio psicológico
✅ Tema global claro/escuro
✅ Interface moderna e responsiva

---

## 🛠️ Configuração do Projeto

### Pré-requisitos

* Node.js (versão 16 ou superior)
* Expo CLI instalado globalmente
* Conta no Firebase Console
* Xcode (para iOS) ou Android Studio (para Android)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/HenriqueDBritoCosta/ReInveste-app.git 
cd ReInveste-app
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o Firebase:

* Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
* Ative a autenticação por Email/Senha
* Crie o arquivo `app/config/firebaseConfig.ts` com suas credenciais:

```ts
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
  databaseURL: "SEU_ULR",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
```

4. Instale o AsyncStorage se ainda não tiver:

```bash
npm install @react-native-async-storage/async-storage
```

5. Execute o projeto:

```bash
npx expo prebuild
npx expo start

```


## 🔐 Autenticação

O sistema de autenticação inclui:

* **Login** - Autenticação com email e senha
* **Cadastro** - Criação de novas contas
* **Proteção de rotas** - Apenas usuários autenticados acessam certas telas

---

## 📱 Plataformas Suportadas

* Android - Desenvolvido e testado

---

## 💡 Melhorias Futuras

* Notificações push para lembrar hábitos saudáveis
* Feedback visual com animações ao alternar temas e resetar contador
* Testes unitários e de integração para maior estabilidade

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NomeFeature`)
3. Commit suas mudanças (`git commit -m 'Add feature X'`)
4. Push para a branch (`git push origin feature/NomeFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo LICENSE para mais detalhes.

---

## 📞 Suporte

* Consulte a documentação do [Expo](https://docs.expo.dev/)
* Consulte a documentação do [Firebase](https://firebase.google.com/docs)

---
