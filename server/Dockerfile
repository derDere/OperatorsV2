# Packt den fertigen Server samt npm-Abhaengigkeiten und startet ihn -- im
# Image wird nichts kompiliert, npm ci installiert nur die gepinnten Pakete.
# Die Ordner www und wiki kommen zur Laufzeit als Mounts nach /www und /wiki
# (siehe docker-compose.yml).
FROM node:lts-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY *.js ./

ENV WWW_ROOT=/www
ENV WIKI_ROOT=/wiki
EXPOSE 8080

CMD ["node", "server.js"]
