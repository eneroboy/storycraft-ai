# Wybierz obraz bazowy z Node.js
FROM node:16 as build-stage

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Kopiuj pliki package.json i zainstaluj zależności
COPY package*.json ./
RUN npm install

# Kopiuj pozostałe pliki źródłowe
COPY ./ ./

# Zbuduj aplikację
RUN npm run build

# Faza produkcyjna z użyciem serwera nginx
FROM nginx:stable-alpine as production-stage

# Kopiuj zbudowane pliki do serwera nginx
COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Otwórz port 80
EXPOSE 80

# Uruchom nginx
CMD ["nginx", "-g", "daemon off;"]
