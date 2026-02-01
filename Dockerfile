# Utiliser l'image Node.js officielle
FROM node:22

# Créer le répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Compiler TypeScript
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["npm", "start"]
