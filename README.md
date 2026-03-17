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

## CI/CD
Utilizamos o **GitHub Actions** pela sua integração nativa com o repositório, o que facilita a automação de builds tanto para o Backend (Java) quanto para o Frontend (React) sem a necessidade de gerenciar servidores externos. O pipeline é disparado a cada *push* ou *pull request* na branch `main`.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Plataforma colaborativa para mapeamento de acessibilidade urbana.

## Licença
Este projeto está licenciado sob a licença MIT. 
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
