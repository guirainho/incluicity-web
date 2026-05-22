# Usa uma imagem leve do Node.js
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do React
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do React
EXPOSE 3000

# Comando para rodar o app em modo de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]