# Projeto Node.js

## 🚀 Instruções para rodar o projeto

Siga os passos abaixo para configurar e rodar o projeto localmente:

### 1️⃣ Configurar a versão do Node.js

Certifique-se de que você está utilizando a versão correta do Node.js especificada no projeto:

```bash
nvm use
```

Se você não tiver o `nvm` instalado, consulte a documentação oficial: [NVM GitHub](https://github.com/nvm-sh/nvm)

---

### 2️⃣ Configurar as variáveis de ambiente

Copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```

Depois, edite o arquivo `.env` com as configurações necessárias.

---

### 3️⃣ Instalar as dependências

Instale as dependências do projeto:

```bash
yarn install
# ou
npm install
```

---

### 4️⃣ Configurar o banco de dados com Prisma

Gere os clientes Prisma:

```bash
npx prisma generate
```

Aplique as migrações no banco de dados:

```bash
npx prisma db push
```

---

### 5️⃣ Rodar o servidor

Inicie o servidor na porta **3333**:

```bash
yarn dev
```

O projeto estará disponível em: [http://localhost:3333](http://localhost:3333)


## 📚 Tecnologias utilizadas

- Node.js
- Prisma
- NVM

