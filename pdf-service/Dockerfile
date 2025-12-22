# Image Playwright officielle avec Chromium - VERSION MISE À JOUR
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le code
COPY . .

# Port
EXPOSE 3001

# Démarrer le serveur
CMD ["node", "server.js"]
