# Integrantes
Rodrigo Lima RM98326
Henrique de Brito RM98831
João Antonio Rihan RM99656
Rodrigo Fernandes Serafim RM550816
Adriano Lopes RM98574

# ReInveste-app

ReInveste é um aplicativo mobile desenvolvido com React Native e Expo, voltado para ajudar usuários a se manterem afastados de apostas, promovendo saúde mental, educação financeira e bem-estar.

O app combina funcionalidades de contador de dias sem apostas, acesso a recursos de meditação, suporte psicológico e perfil do usuário, oferecendo uma experiência completa e motivadora.

# Funcionalidades

Tela Dashboard: Tela inicial com navegação rápida para Contador, Meditação e Perfil.

Contador de dias sem apostas: Incrementa dias automaticamente e permite reset em caso de recaída.

Meditation / Exercícios: Links para vídeos de meditação, apoio psicológico e aulas de investimento.

Perfil / Configurações: Tela de perfil do usuário, com botão para alternar entre modo claro e escuro.

Tema global claro/escuro: O usuário pode alternar o tema, que se aplica a todas as telas do aplicativo.

# Estrutura do Projeto

app/
└── (tabs)/ # Telas principais do aplicativo
├── _layout.tsx # Layout dos Bottom Tabs
├── DashboardScreen.tsx # Tela inicial
├── CounterScreen.tsx # Contador de dias sem apostas
├── MeditationScreen.tsx # Tela de exercícios e meditação
├── ProfileScreen.tsx # Tela de perfil do usuário
└── context/
└── ThemeContext.tsx # Contexto global para tema claro/escuro
assets/
└── images/ # Imagens do aplicativo
components/ # Componentes reutilizáveis
hooks/ # Hooks personalizados
constants/ # Constantes do app

# Tecnologias Utilizadas

React Native

Expo

TypeScript

Expo Router

React Context API para tema global

# Instalação

Clone o repositório:
git clone https://github.com/HenriqueDBritoCosta/ReInveste-app.git

Instale as dependências:
cd ReInveste-app
npm install

Execute o app:
npx expo start

# Uso

Abra o aplicativo no simulador ou dispositivo físico usando o QR Code fornecido pelo Expo.

Navegue pelas abas Dashboard, Dias sem apostas e Perfil.

Use o botão de alternar tema na tela de Perfil para mudar entre modo claro e escuro.

No Dashboard, acesse a tela de Meditation para abrir links de exercícios, apoio psicológico e aulas de investimento.

No Contador, incremente os dias sem apostas ou resete o contador em caso de recaída.

# Melhorias Futuras

Persistência de dados com AsyncStorage para salvar contador e preferências de tema.

Notificações push para lembrar o usuário de manter hábitos saudáveis.

Feedback visual com animações ao alternar temas e resetar contador.

Testes unitários e de integração para maior estabilidade.

# Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
Certifique-se de seguir o padrão de código e manter o estilo do projeto.

# Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.