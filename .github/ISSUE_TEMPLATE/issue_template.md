## Descrição

Esta issue propõe a implementação de Docker Compose no projeto para facilitar a configuração e orquestração de múltiplos serviços, incluindo PostgreSQL, pgAdmin, Jaeger e a aplicação principal. A proposta é criar um ambiente de desenvolvimento mais eficiente e simplificado.

## Objetivo

Adicionar a configuração de Docker Compose para gerenciar os seguintes serviços:

- PostgreSQL: Banco de dados relacional
- pgAdmin: Interface gráfica para gerenciamento do PostgreSQL
- Jaeger: Ferramenta de rastreamento e monitoramento
- Aplicação principal: Serviço que inclui as funcionalidades do projeto

## Justificativa

A configuração manual de múltiplos serviços e dependências pode ser trabalhosa e propensa a erros. Usando Docker Compose, podemos definir e gerenciar todos os serviços necessários em um único arquivo, simplificando o processo de desenvolvimento e testes. Isso melhora a eficiência do desenvolvimento e garante um ambiente consistente.