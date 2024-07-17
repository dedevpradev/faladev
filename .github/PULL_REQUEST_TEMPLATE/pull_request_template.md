## Descrição

Este pull request introduz melhorias no template HTML da página de erro. A principal melhoria é o aumento do tamanho da fonte do código de erro e da mensagem para torná-los mais destacados e fáceis de ler.

## Mudanças Realizadas

1. **Aumento do Tamanho da Fonte**:
    - Adicionadas estilos CSS personalizados para aumentar o tamanho da fonte do código de erro e da mensagem.
    - Aplicadas classes utilitárias do Tailwind CSS para garantir que o texto esteja centralizado.

### Arquivos Modificados

- `templates/web/error.html`: Estrutura HTML atualizada e adição de estilos personalizados.

### Mudanças Detalhadas

- **Tamanho da Fonte do Código de Erro**:
    - Adicionada a classe CSS `.error-code` com `font-size: 4rem;` para aumentar o tamanho da fonte do código de erro.
- **Tamanho da Fonte da Mensagem de Erro**:
    - Adicionada a classe CSS `.error-message` com `font-size: 1.5rem;` para aumentar o tamanho da fonte da mensagem de erro.
- **Alinhamento Central**:
    - Aplicada a classe `text-center` do Tailwind CSS para centralizar o texto dentro do contêiner.

## Antes e Depois

### Antes

![Screenshot Antes](link_para_screenshot_antes)

### Depois

![Screenshot Depois](link_para_screenshot_depois)

## Motivação e Contexto

O tamanho da fonte anterior para o código de erro e a mensagem era muito pequeno, dificultando para os usuários identificarem e entenderem rapidamente o erro. Aumentar o tamanho da fonte melhora a legibilidade e a experiência do usuário.

## Como Isso Foi Testado?

- Testado manualmente a página de erro para garantir que os novos tamanhos de fonte sejam aplicados corretamente e o texto permaneça centralizado.

## Issue Relacionada

- [Issue #123](link_para_issue_relacionada)

## Tipos de Mudanças

- [ ] Correção de bug (mudança que não quebra a compatibilidade e corrige um problema)
- [x] Nova funcionalidade (mudança que não quebra a compatibilidade e adiciona uma funcionalidade)
- [ ] Mudança que quebra a compatibilidade (correção ou funcionalidade que causa uma mudança em funcionalidades existentes)

## Checklist

- [x] Meu código segue o estilo de código deste projeto.
- [x] Minha mudança requer uma mudança na documentação.
- [x] Eu atualizei a documentação conforme necessário.
- [ ] Eu adicionei testes para cobrir minhas mudanças.
- [x] Todos os novos e antigos testes passaram.

## Notas Adicionais

- Qualquer informação ou contexto adicional que os revisores possam precisar saber.
