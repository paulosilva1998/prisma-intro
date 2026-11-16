# Introdução ao ORM com Prisma, Node.js e MySQL

Projeto prático desenvolvido para explorar operações de CRUD, modelagem relacional, migrations, seed de dados e manipulação de relacionamentos utilizando **Node.js**, **Prisma ORM (v7)** e **MySQL**[cite: 2, 19].

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (ES Modules)[cite: 2, 5]
* **Prisma ORM v7** (`prisma-client` + `@prisma/adapter-mariadb`)[cite: 5, 19]
* **MySQL** (Banco de dados relacional)[cite: 2]

---

## 🗄️ Modelagem do Banco de Dados

O schema (`prisma/schema.prisma`) implementa as seguintes entidades e relacionamentos[cite: 5, 6]:

* **User** (`1:1` com `Profile` e `1:N` com `Post`)[cite: 5, 6]
* **Profile** (Perfil opcional associado a um único usuário)[cite: 5, 6]
* **Post** (Publicações pertencentes a um autor, com suporte a múltiplas categorias)[cite: 5, 6]
* **Categoria** (`N:N` com `Post` via tabela de junção implícita `_CategoriaToPost`)[cite: 5, 6, 8]

---

## 📂 Estrutura do Projeto

```text
prisma-intro/
├── prisma/
│   ├── migrations/           # Histórico de migrations SQL geradas pelo Prisma[cite: 7, 21]
│   ├── schema.prisma         # Definição dos modelos e relacionamentos[cite: 2, 5]
│   └── seed.js               # Script para popular dados iniciais no banco[cite: 9]
├── atividade-crud.js         # Operações básicas de Create, Read, Update e Delete[cite: 2, 3]
├── atividade-relacoes.js     # Criação aninhada de Usuário, Perfil, Posts e Categorias[cite: 12]
├── atividade-categorias.js   # Gerenciamento de vínculos N:N (connectOrCreate e disconnect)[cite: 14, 15]
├── prismaClient.js           # Instância e configuração do adapter do Prisma Client[cite: 2]
├── prisma7.config.ts         # Configuração de schema, migrations e seed do Prisma 7[cite: 7, 9, 19]
└── package.json
```

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
* **Node.js** (v20.19+ ou superior)[cite: 18]
* **MySQL Server** em execução com um banco de dados criado (ex: `orm_aula`)[cite: 2]

### 2. Instalação e Configuração
Clone o repositório e instale as dependências:
```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com a string de conexão do seu banco MySQL[cite: 2]:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/orm_aula"
```

### 3. Migrations e Geração do Client
Aplique as migrations para criar as tabelas no MySQL e gere o Prisma Client[cite: 7]:
```bash
npx prisma migrate dev --config ./prisma7.config.ts
npx prisma generate --config ./prisma7.config.ts
```

### 4. Popular o Banco (Seed)
Execute o seed idempotente (usa `upsert` para evitar duplicações)[cite: 9, 10, 11]:
```bash
npx prisma db seed --config ./prisma7.config.ts
```

### 5. Executar os Scripts Práticos
* **CRUD Básico (Create, Read, Update, Delete):**[cite: 2, 3]
  ```bash
  node atividade-crud.js
  ```
* **Criação de Registros Relacionados:**[cite: 12, 13]
  ```bash
  node atividade-relacoes.js
  ```
* **Vinculação e Desvinculação de Categorias (`N:N`):**[cite: 14, 15, 16]
  ```bash
  node atividade-categorias.js
  ```

### 6. Visualizar Dados (Prisma Studio)
Para inspecionar as tabelas e registros pelo navegador[cite: 11]:
```bash
npx prisma studio --config ./prisma7.config.ts
```
