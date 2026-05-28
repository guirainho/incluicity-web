[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# IncluiCity Web 

Plataforma colaborativa baseada em microsserviços para o mapeamento, consulta e avaliação de acessibilidade urbana.

## Tecnologias e Arquitetura
- **Backend:** Java 17 (Spring Boot 3), Spring Security, JWT, Gateway de API
- **Frontend:** React, Axios (Interceptores de Requisições), Tailwind CSS, Lucide Icons
- **Base de Dados:** PostgreSQL
- **Infraestrutura & DevOps:** Docker, Docker Compose, JUnit 5, Mockito, GitHub Actions, AWS (EC2)

---

## Como Executar Localmente

### Pré-requisitos
* Docker e Docker Compose instalados
* Ambiente Java 17 (opcional, caso pretenda compilar fora do contêiner)

### Execução da Infraestrutura Completa
Para descarregar o repositório e iniciar todos os microsserviços, base de dados e o frontend em ambiente isolado:

```bash
git clone [https://github.com/guirainho/incluicity-web.git](https://github.com/guirainho/incluicity-web.git)
cd incluicity-web

# Subir toda a infraestrutura via Docker Compose
docker-compose up --build
```
Após o build, a aplicação estará acessível localmente através do ecrã do navegador no endereço do frontend.

## Testes Automatizados (Backend)
O sistema possui uma camada robusta de testes de unidade e de integração para garantir a estabilidade das regras de negócio e dos contratos da API, utilizando JUnit 5, Mockito e MockMvc.
Para executar a suite de testes automatizados no microsserviço de localização, execute o seguinte comando na diretoria do serviço:

```bash
./mvnw test
```
Os testes cobrem cenários críticos como a criação de novos registos, listagem geral, pesquisa por ID e validação de erros (HTTP 404).



## 📑 Contratos da API

O tráfego externo é gerido de forma centralizada pelo API Gateway. As requisições privadas exigem a injeção automática do Token JWT no cabeçalho `Authorization: Bearer <token>` efetuada pelos interceptores do Axios no Frontend.

### `auth-service` - Portal de Segurança e Usuários
Responsável pela gestão de utilizadores, perfis, autenticação e emissão de tokens JWT.

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| `POST` | `/auth/register` | Público | Cria uma nova conta de utilizador no sistema |
| `POST` | `/auth/login` | Público | Autentica o utilizador e retorna o Token JWT |
| `GET`  | `/users/me` | Autenticado | Retorna os dados completos do perfil do utilizador logado |
| `PUT`  | `/users/me` | Autenticado | Atualiza informações do próprio perfil (nome, preferências) |
| `GET`  | `/admin/users` | Admin | Lista todos os utilizadores cadastrados na plataforma |
| `DELETE`| `/admin/users/{id}`| Admin | Inativa ou remove um utilizador do sistema |

### `location-service` - Gestão de Pontos de Acessibilidade
Responsável pelo mapeamento de espaços urbanos, estabelecimentos físicos e critérios de acessibilidade.

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| `GET`  | `/locations` | Autenticado | Lista todos os locais de acessibilidade cadastrados |
| `GET`  | `/locations/search` | Autenticado | Filtra locais por parâmetros (ex: tipo, cidade, acessibilidade) |
| `GET`  | `/locations/{id}` | Autenticado | Procura e retorna os detalhes específicos de um local pelo ID |
| `POST` | `/locations` | Autenticado | Cadastra um novo ponto de interesse com notas e descrição |
| `PUT`  | `/locations/{id}` | Autenticado | Atualiza os dados de um local existente no sistema |
| `DELETE`| `/locations/{id}` | Admin | Remove um ponto do mapeamento que viole as diretrizes |

### `review-service` - Sistema de Avaliações Colaborativas
Responsável por gerir as notas, comentários e o feedback colaborativo da comunidade de PCDs sobre os locais.

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| `GET`  | `/locations/{locationId}/reviews` | Autenticado | Lista todas as avaliações e comentários de um local específico |
| `POST` | `/locations/{locationId}/reviews` | Autenticado | Envia uma nova avaliação (nota de 1 a 5 e comentário) |
| `GET`  | `/reviews/me` | Autenticado | Lista o histórico de todas as avaliações feitas pelo utilizador |
| `DELETE`| `/reviews/{id}` | Admin/Autor | Remove uma avaliação específica por moderação ou escolha do autor |
---

## Utilizador Padrão para Avaliação (Seed)

Para efeitos de testes e validação da banca acadêmica, o sistema inicializa automaticamente com as seguintes credenciais de acesso:

| Campo | Valor de Teste |
|-------|-------|
| **E-mail** | `admin@incluicity.com.br` |
| **Senha** | `admin` |

## CI/CD (Integração Contínua)

**Ferramenta:** GitHub Actions

### Justificativa Arquitetural
A escolha do GitHub Actions baseia-se na sua integração nativa com o ecossistema Git, eliminando a infraestrutura dedicada de servidores de CI. O pipeline valida o ciclo de vida da aplicação a cada submissão de código (`push` ou `pull request`), garantindo que apenas compilações estáveis avancem.

### Fluxo do Pipeline
1. **Checkout do Código:** Extração do código-fonte para o ambiente isolado do GitHub Runner.
2. **Instalação de Dependências:** Resolução e validação de bibliotecas do Maven (Java) e pacotes do NPM (React).
3. **Testes Automatizados:** Execução da suite de testes do JUnit 5. O pipeline é imediatamente interrompido caso ocorra alguma falha técnica.
4. **Build e Compilação:** Geração dos artefactos finais de distribuição da aplicação.
5. **Construção de Imagens Docker:** Empacotamento dos serviços em contêineres padronizados prontos para distribuição.

## Infraestrutura (IaaS)
**Provedor Escolhido:** AWS (Amazon Web Services)

A arquitetura em produção utiliza instâncias Amazon EC2 configuradas de forma segura através de Security Groups, limitando as portas de comunicação pública ao estritamente necessário (HTTP/HTTPS) e protegendo o acesso à base de dados PostgreSQL. Os endereços públicos são fixados através de Elastic IPs.

### Link de acesso
O ambiente de demonstração está ativo e pode ser acessado em: http://32.193.203.94

## Licença
Este projeto está licenciado sob a licença MIT. 
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
