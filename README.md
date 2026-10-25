# Estoque Fácil

Sistema de gerenciamento de estoque desenvolvido como projeto acadêmico para praticar desenvolvimento full stack.

## Sobre o projeto

O Estoque Fácil permite cadastrar produtos, cadastrar fornecedores e associar fornecedores aos produtos.

O projeto é composto por:

- Frontend em React;
- Backend em NestJS;
- Banco de dados PostgreSQL;
- Docker para execução do banco localmente.

## Funcionalidades

- Cadastro de produtos;
- Edição de produtos;
- Exclusão de produtos;
- Cadastro de fornecedores;
- Edição de fornecedores;
- Exclusão de fornecedores;
- Validação de CNPJ, telefone e e-mail;
- Associação entre produtos e fornecedores;
- Remoção de associações;
- Persistência dos dados no PostgreSQL.

## Tecnologias

### Frontend

- React;
- React Router;
- Bootstrap;
- Bootstrap Icons;
- Jest;
- React Testing Library.

### Backend

- Node.js;
- NestJS;
- TypeScript;
- TypeORM;
- class-validator;
- PostgreSQL.

### Infraestrutura

- Docker;
- Docker Compose.

## Estrutura do projeto

```text
integrator project/
├── Backend/
│   └── estoque-facil/
├── frontend/
│   └── estoque-facil/
├── docker-compose.yml
└── README.md
```

## Pré-requisitos

Instale:

- Node.js;
- npm;
- Docker Desktop;
- Git.

## Configuração do banco

O PostgreSQL é executado pelo Docker.

Na raiz do projeto, execute:

```bash
docker compose up -d postgres
```

Verifique o container:

```bash
docker compose ps
```

O PostgreSQL deve aparecer com status `Up`.

## Configuração do backend

Entre na pasta do backend:

```bash
cd Backend/estoque-facil
```

Crie um arquivo `.env` com:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=estoque
DB_PASSWORD=estoque_dev
DB_NAME=estoque_facil
```

Instale as dependências:

```bash
npm install
```

Execute em modo de desenvolvimento:

```bash
npm run start:dev
```

A API ficará disponível em <http://localhost:3000>.

### Comandos do backend

```bash
npm run build
npm run start:dev
npm test
npm run test:e2e
npm run test:cov
```

## Configuração do frontend

Abra outro terminal e entre na pasta:

```bash
cd frontend/estoque-facil
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm start
```

O frontend ficará disponível em <http://localhost:3001>.

## Endpoints principais

### Produtos

```http
GET    /products
POST   /products
GET    /products/:id
PATCH  /products/:id
DELETE /products/:id
```

### Fornecedores

```http
GET    /suppliers
POST   /suppliers
GET    /suppliers/:id
PATCH  /suppliers/:id
DELETE /suppliers/:id
```

### Associações

```http
GET    /product-suppliers
POST   /product-suppliers
GET    /product-suppliers/product/:productId
GET    /product-suppliers/:id
PATCH  /product-suppliers/:id
DELETE /product-suppliers/:id
```

## Testando a API

Com o backend rodando:

```bash
curl.exe http://localhost:3000
curl.exe http://localhost:3000/products
curl.exe http://localhost:3000/suppliers
curl.exe http://localhost:3000/product-suppliers
```

## Observações

- O arquivo `.env` contém configurações locais e não deve ser versionado.
- O banco PostgreSQL usado localmente é executado em um container Docker.

## Melhorias futuras

- Criar migrations do banco;
- Dockerizar o backend;
- Melhorar a interface visual;
- Adicionar filtros e busca;
- Ampliar a cobertura de testes;
- Adicionar autenticação;
- Publicar o frontend no Netlify;
- Publicar o backend e o banco em ambiente de produção.
