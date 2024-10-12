# Contribuindo para o projeto

Agradecemos o seu interesse em contribuir para a nossa plataforma! Este documento contém as diretrizes para contribuir com o projeto. Siga-as para garantir a consistência e qualidade das contribuições.

## Pré-requisitos para Contribuir

Antes de começar a contribuir, certifique-se de ter:

   - Docker instalado em seu ambiente.
   - Uma conta no Google Console para criar credenciais de API necessárias para acessar o Google Calendar e Gmail.

## Como Contribuir

1. **Fork e Clone:**

    Faça um fork do repositório no GitHub.
    Clone o seu fork para o seu ambiente de desenvolvimento local.
    ```bash
    git clone git@github.com:dedevpradev/faladev.git && cd faladev
    ```

2. **Configurar Ambiente:**

   Configure as variáveis de ambiente conforme necessário para acessar serviços do Google.
   Execute o Docker Compose para subir a aplicação:
    ```bash
    docker-compose up -d
     ```

3. **Trabalhando com Branches:**

   Crie uma branch a partir da `main` para cada nova funcionalidade ou correção.
    ```bash
    git checkout -b feature/nome-da-branch
     ```

4. **Desenvolvimento:**

   Siga as boas práticas de desenvolvimento conforme discutido no projeto.
   Adicione ou atualize os testes conforme necessário.
   Verifique se o código segue os padrões estabelecidos e não introduz problemas novos.

5. **Documentação:**

   Atualize a documentação conforme necessário.
   Se você adicionou novas funcionalidades, atualize a documentação Swagger conforme as instruções no `README.md`.

6. **Commit e Push:**

   Use mensagens de commit claras e descritivas.
   Envie suas alterações para o seu fork.
    ```bash
    git commit -m "Descrição clara e concisa do que foi feito"
     ```

    ```bash
    git push origin nome-da-branch
     ```

7. **Pull Request:**

   Faça um pull request da sua branch no seu fork para a branch `main` do repositório original.
   Descreva claramente o que o seu código faz e por que a sua contribuição é importante.
   Link qualquer issue relevante no seu pull request.

8. **Revisão:**

   Aguarde feedback ou aprovação dos mantenedores do projeto.
   Faça as alterações necessárias se solicitado pelos revisores.

## Código de Conduta

Ao participar deste projeto, espera-se que você trate todos os contribuidores com respeito e contribua ativamente para a criação de um ambiente acolhedor para todos, independentemente de sua senioridade.

## Dúvidas?

Se tiver dúvidas ou precisar de ajuda, não hesite em abrir uma issue no GitHub para solicitar mais informações ou suporte.