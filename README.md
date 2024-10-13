# Plataforma para gestão de mentorias

Este projeto é uma aplicação open source feita em Go no backend e React no frontend, inicialmente integrada aos serviços do Google Calendar e Gmail, base para discutirmos boas práticas, conceitos e fundamentos.

## Pré-requisitos

- Go versão 1.21 ou superior
- Conta no Google Console para criar credenciais de API

## Instalação

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/dedevpradev/faladev.git
   cd faladev
   ```

2. **Configurar Credenciais do Google Console:**

   Para que a aplicação possa acessar o Google Calendar e enviar emails, você precisa configurar as credenciais no Google Console:

   Acesse o Google Cloud Console: [Google Cloud Console](https://console.cloud.google.com/)

   Crie um Novo Projeto:

   - Vá para o painel do Google Cloud Console.
   - Clique em "Select a Project" e depois em "New Project".
   - Dê um nome ao seu projeto e clique em "Create".

   Habilite as APIs Necessárias:

   - Vá para "API & Services" > "Library".
   - Pesquise e habilite a API do Google Calendar.
   - Pesquise e habilite a API do Gmail.

   Configure a Tela de Consentimento OAuth:

   - Vá para "API & Services" > "OAuth consent screen".
   - Escolha "External" e clique em "Create".
   - Preencha as informações necessárias, como nome do aplicativo e email de suporte.
   - Adicione o escopo .../auth/calendar para acesso ao Google Calendar e .../auth/gmail.send para enviar emails.
   - Salve as alterações.

   Crie Credenciais OAuth 2.0:

   - Vá para "API & Services" > "Credentials".
   - Clique em "Create Credentials" e selecione "ID do cliente OAuth".
   - Quando solicitado, adicione os URIs de redirecionamento autorizados. Exemplo: http://localhost:8080/callback
   - Salve as credenciais e anote o Client ID e Client Secret.

4. **Configurar Variáveis de Ambiente:**

   Crie um arquivo .env no diretório ./backend e adicione as seguintes variáveis, incluindo suas credenciais do Google:

   ```env
   GOOGLE_REDIRECT_URL=http://localhost:8080/callback
   GOOGLE_CLIENT_ID=seu-client-id
   GOOGLE_CLIENT_SECRET=seu-client-secret
   ```

## Instruções para executar a aplicação utilizando Docker Compose

   Para iniciar a aplicação, execute o comando:

   ```bash
   docker-compose up -d
   ```

   Para parar e remover contêineres, redes, volumes e imagens usadas pelo docker compose, execute o comando:

   ```bash
   docker-compose down --rmi all
   ```

   Para limpar caches e configurações locais, você pode remover os arquivos de configuração e imagens desnecessárias:

   ```bash
   docker system prune -a --volumes
   ```

## Como Usar

   Para acessar a aplicação:

   ```bash
   http://localhost:3000
   ```

   URL da API:

   ```bash
   http://localhost:8080
   ```

   Para acessar o Jaeger:

   ```bash
   http://localhost:16686/
   ```

   Para acessar o pgAdmin:

   ```bash
   http://localhost:5050/
   ```

   Para acessar a documentação swagger:

   ```bash
   http://localhost:8080/swagger/index.html
   ```

