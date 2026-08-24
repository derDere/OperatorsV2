# Packt den fertigen Server und startet ihn -- im Image wird nichts kompiliert.
# Der www-Ordner kommt zur Laufzeit als Mount nach /www (siehe docker-compose.yml).
FROM node:lts-alpine

WORKDIR /app
COPY *.js ./

ENV WWW_ROOT=/www
EXPOSE 8080

CMD ["node", "server.js"]
