# Utiliser l'image officielle Playwright avec Node.js
FROM mcr.microsoft.com/playwright:v1.49.1-jammy

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste du code
COPY . .

# Build de l'application Next.js (mode standalone)
RUN npm run build

# Copier les fichiers statiques dans le dossier standalone
RUN cp -r .next/static .next/standalone/.next/static
RUN cp -r public .next/standalone/public

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Démarrer l'application avec le serveur standalone
CMD ["node", ".next/standalone/server.js"]
