[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# IncluiCity Web 

Plataforma colaborativa para mapeamento e avaliação de acessibilidade urbana.

## Tecnologias
- **Backend:** Java 17 (Spring Boot)
- **Frontend:** React (JavaScript/TypeScript)
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker & GitHub Actions

## Como Executar Localmente (Planejado)
```bash
git clone [https://github.com/guilherme/incluicity-web.git](https://github.com/guilherme/incluicity-web.git)
cd incluicity-web
# Subir infraestrutura completa via Docker
docker-compose up --build
```

## CI/CD (Integração e Entrega Contínua)

**Ferramenta Escolhida:** GitHub Actions

### Justificativa
Optamos pelo GitHub Actions por ser uma solução nativa da plataforma, eliminando a necessidade de gerenciar servidores externos (como no Jenkins). Ele permite a automação completa do build e dos testes tanto para o ecossistema Java (Maven) quanto para o React (NPM) em um único workflow, facilitando a colaboração e garantindo que apenas código funcional chegue à branch principal.

### Fluxo do Pipeline Planejado
O pipeline é disparado automaticamente em dois cenários:
1. **Push em qualquer branch:** Executa o checkout do código, instalação de dependências e o **Build** (compilação) para validar a integridade do código.
2. **Merge/Push na branch `main`:** Além do build, executa (futuramente) os testes unitários e o deploy automático para o ambiente de staging/produção.

### Etapas Atuais:
- **Checkout:** Clonagem do repositório no runner do GitHub.
- **Setup JDK & Node:** Configuração dos ambientes necessários para as tecnologias do projeto.
- **Build Backend:** Execução do Maven para validar o código Java.

graph TD
    A[Push/PR na branch main] --> B{GitHub Actions}
    B --> C[Checkout do Código]
    C --> D[Setup JDK 17 & Node 18]
    D --> E[Instalação de Dependências]
    E --> F[Build Backend - Maven]
    F --> G[Build Frontend - NPM]
    G --> H{Sucesso?}
    H -- Sim --> I[Pronto para Deploy]
    H -- Não --> J[Notificar Erro]

## Licença
Este projeto está licenciado sob a licença MIT. 
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
