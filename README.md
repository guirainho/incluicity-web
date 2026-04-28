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
git clone [https://github.com/guirainho/incluicity-web.git](https://github.com/guirainho/incluicity-web.git)
cd incluicity-web
# Subir infraestrutura completa via Docker
docker-compose up --build
```

## Contratos de API (Endpoints)

Base da API: `/api/v1`

### `auth-service` - `:8081`
Responsável pela gestão de usuários e segurança via JWT.

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| `POST` | `/auth/registrar` | Público | Cria uma nova conta de usuário |
| `POST` | `/auth/login` | Público | Autentica o usuário e retorna o Token JWT |
| `GET` | `/perfil/me` | Autenticado | Retorna os dados do usuário logado |
| `PUT` | `/perfil/me` | Autenticado | Atualiza dados do próprio perfil |
| `GET` | `/admin/usuarios` | ADMIN | Lista todos os usuários cadastrados |
| `DELETE` | `/admin/usuarios/{id}` | ADMIN | Remove um usuário do sistema |

### `location-service` - `:8082`
Gerencia os pontos de interesse e o mapeamento de acessibilidade.

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| `GET` | `/pontos` | Público | Lista todos os pontos mapeados no mapa |
| `GET` | `/pontos/{id}` | Público | Detalhes específicos de um ponto |
| `POST` | `/pontos` | Autenticado | Cadastra um novo ponto de acessibilidade |
| `PUT` | `/pontos/{id}` | ADMIN ou Autor | Edita informações de um ponto existente |
| `DELETE` | `/pontos/{id}` | ADMIN | Remove um ponto do mapeamento |
| `GET` | `/pontos/busca?tipo=` | Público | Filtra pontos por tipo (Calçada, Comércio, etc) |

### `review-service` - `:8083`
Gerencia as notas e comentários colaborativos sobre os locais.

| Método | Endpoint | Acesso | Descrição |
|--------|----------|--------|-----------|
| `GET` | `/pontos/{pontoId}/avaliacoes` | Público | Lista todas as avaliações de um local |
| `POST` | `/avaliacoes` | Autenticado | Envia uma nova avaliação (nota e comentário) |
| `DELETE` | `/avaliacoes/{id}` | ADMIN ou Autor | Remove uma avaliação específica |
| `GET` | `/avaliacoes/me` | Autenticado | Lista todas as avaliações feitas pelo usuário |

## Administrador Padrão (Seed)

Para fins de teste e avaliação do projeto, o sistema inicializa com um usuário administrativo padrão:

| Campo | Valor |
|-------|-------|
| **E-mail** | `admin@incluicity.com.br` |
| **Senha** | `admin123` |
| **Role** | `ROLE_ADMIN` |

> **NOTA DE SEGURANÇA:** Em ambiente de produção, a senha do administrador deve ser alterada no primeiro acesso e as portas dos microsserviços (`8081-8083`) devem ser restritas ao tráfego interno da VPC, sendo acessíveis externamente apenas via Gateway de API.

## CI/CD (Integração e Entrega Contínua)

**Ferramenta Escolhida:** GitHub Actions

### Justificativa
Optamos pelo GitHub Actions por ser uma solução nativa da plataforma, eliminando a necessidade de gerenciar servidores externos (como no Jenkins). Ele permite a automação completa do build e dos testes tanto para o ecossistema Java (Maven) quanto para o React (NPM) em um único workflow, facilitando a colaboração e garantindo que apenas código funcional chegue à branch principal.

### Fluxo do Pipeline Planejado
PUSH / PULL REQUEST -> [1] Checkout do código - > [2] Instalação de dependências -> [3] Lint / Análise estática -> [4] Testes unitários -> [5] Build / Compilação -> [6] Build de imagem Docker (Branch main) -> [7] Deploy em ambiente de staging (AWS)

Descrição das Etapas:
1) Quando roda: Em todos os gatilhos de Push ou Pull Request.
O que aprova: Disponibiliza o código fonte do repositório para o ambiente isolado do GitHub Actions (Runner).

2) Quando roda: Após o checkout.
O que aprova: Valida se as bibliotecas do Maven (Java) e NPM (React) estão acessíveis e sem conflitos de versão.

3) Quando roda: Após a instalação das dependências.
O que aprova: Verifica a padronização do código e identifica vulnerabilidades de segurança estática antes da execução.

4) Quando roda: Após a análise estática.
O que aprova: Valida as regras de negócio de forma isolada, garantindo que novas alterações não quebraram funcionalidades existentes.

5) Quando roda: Após a aprovação nos testes.
O que aprova: Realiza a compilação final do projeto. Caso ocorram erros de sintaxe ou referências perdidas, o pipeline é interrompido.

6) Quando roda: Apenas em merges ou pushes realizados na branch principal (main).
O que aprova: Cria um contêiner padronizado que garante que a aplicação rode na AWS exatamente da mesma forma que rodou nos testes.

7) Quando roda: Etapa final, após o build da imagem Docker.
O que aprova: Disponibiliza a aplicação para acesso público através da infraestrutura configurada na AWS, garantindo a disponibilidade do sistema.

## Infraestrutura (IaaS)
**Provedor Escolhido:** AWS (Amazon Web Services)

### Justificativa
A AWS foi selecionada pela sua robustez e conformidade com padrões internacionais de segurança, permitindo o uso de instâncias EC2 escaláveis. Através de Security Groups, o acesso ao servidor é restrito apenas às portas essenciais (HTTP/SSH), garantindo a segurança e a alta disponibilidade do sistema (RNF05).

### Link de acesso
O ambiente de demonstração está ativo e pode ser acessado em: http://32.193.203.94

## Licença
Este projeto está licenciado sob a licença MIT. 
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
