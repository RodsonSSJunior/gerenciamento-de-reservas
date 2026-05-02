# 🚀 Sistema de Reservas - 404 Café (Back-End)

Este é o motor do Sistema de Reservas, desenvolvido com foco em escalabilidade, manutenibilidade e aplicação de princípios modernos de engenharia de software.



## 📝 Descrição do Projeto

O **Sistema de Reservas - 404 Café** é uma solução robusta voltada para o gerenciamento de atendimento em restaurantes[cite: 1]. O sistema organiza o fluxo de trabalho entre diferentes níveis de acesso, garantindo eficiência operacional:

*   **Atendente:** Responsável pelo cadastro e cancelamento de reservas[cite: 1].
*   **Garçom:** Atua na confirmação de reservas pendentes diretamente no salão[cite: 1].
*   **Gerente:** Possui acesso a relatórios estratégicos para análise de desempenho e produtividade[cite: 1].



## 🏗️ Arquitetura e Design Patterns

A aplicação foi estruturada seguindo os princípios de **Clean Architecture** e **SOLID**, garantindo que as regras de negócio sejam independentes de frameworks externos[cite: 1].

*   **Use Cases (Casos de Uso):** Toda a lógica de negócio está isolada em classes específicas, facilitando testes e evoluções sem efeitos colaterais[cite: 1].
*   **Repository Pattern:** Abstração da camada de persistência que permite a troca de banco de dados com impacto mínimo no código[cite: 1].
*   **Factory Pattern:** Gerenciamento centralizado da injeção de dependências e instanciação de casos de uso na pasta `factories`[cite: 1].
*   **Camada de Controllers:** Desacoplamento total da lógica HTTP, tratando apenas a entrada e saída de dados para as rotas da aplicação[cite: 1].



## 📊 Inteligência de Negócio e Relatórios

O sistema fornece ferramentas essenciais para a tomada de decisão estratégica do **Gerente**, com geradores de relatórios automatizados por:

*   **Período:** Análise de fluxo temporal para previsão de demanda[cite: 1].
*   **Garçom:** Avaliação de volume de atendimento e produtividade por funcionário[cite: 1].
*   **Mesa:** Otimização da ocupação e rotatividade do espaço físico[cite: 1].



## 🛡️ Robustez e Validação

*   **Erros Personalizados:** Sistema de tratamento de exceções específico (`useCases/erros`), garantindo feedbacks claros para falhas de validação de horários, mesas ocupadas ou dados duplicados[cite: 1].
*   **Integridade de Dados:** Validações rigorosas através de utilitários de conferência de tipos (`isGarcom.ts`, `isMesa.ts`), assegurando que apenas dados íntegros cheguem à camada de persistência[cite: 1].



## 🛠️ Tecnologias Utilizadas

*   **TypeScript / Node.js:** Tipagem forte para maior segurança e produtividade no desenvolvimento[cite: 1].
*   **Express:** Framework ágil para a gestão de rotas e comunicação HTTP[cite: 1].
*   **SQLite:** Banco de dados relacional utilizado para persistência ágil de dados[cite: 1].



## 📂 Estrutura de Pastas

A organização foi moldada para garantir a separação total de responsabilidades, facilitando manutenções e auditorias de código:
```text
src/
├── entities/       # Domínio: Modelos de dados e regras fundamentais do negócio
├── http/           # Entrega: Camada de entrada (Controllers) que lida com requisições e respostas
├── repositories/   # Persistência: Contratos (Interfaces) e implementações de acesso ao banco de dados
│   └── sqlite/     # Implementação específica para SQLite utilizando o Repository Pattern
├── useCases/       # Aplicação: Implementação dos fluxos e regras de negócio da plataforma
│   ├── erros/      # Domain Errors: Exceções personalizadas para cada falha de negócio
│   └── factories/  # Injeção de Dependência: Fábricas que orquestram a criação dos Use Cases
├── routes/         # Roteamento: Definição dos endpoints segmentados por perfil de acesso
└── utils/          # Cross-cutting: Funções utilitárias e validações auxiliares de tipos

