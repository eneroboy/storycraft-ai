# Wybierz obraz bazowy z Node.js
FROM node:16

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Kopiuj pliki package.json i zainstaluj zależności
COPY package*.json ./
RUN npm install

# Kopiuj pozostałe pliki źródłowe
COPY ./ ./

# Zbuduj aplikację (opcjonalnie, w zależności od potrzeb)
RUN npm run build

# Otwórz port 3000
EXPOSE 3000

# Uruchom aplikację
CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]
