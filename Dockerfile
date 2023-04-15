# Partir de l'image node:latest
FROM node:18-slim

# Exposer le port 8000 du conteneur
EXPOSE 8000


COPY . /

WORKDIR / 

# Installer les dépendances
RUN npm install

# Démarrer l'application
CMD ["npm", "start"]

