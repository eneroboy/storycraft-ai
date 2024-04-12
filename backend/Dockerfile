# Wybierz obraz bazowy z Mavenem
FROM maven:3.8.4-openjdk-17 as build-stage

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Kopiuj tylko pliki pom.xml najpierw, aby wykorzystać cache Docker’a
COPY pom.xml ./
RUN mvn dependency:go-offline

# Kopiuj resztę plików źródłowych
COPY ./ ./

# Zbuduj aplikację
RUN mvn package -DskipTests

# Faza produkcyjna z użyciem obrazu OpenJDK
FROM openjdk:17-slim

# Kopiuj wykonywalny plik jar do kontenera
COPY --from=build-stage /app/target/*.jar app.jar

# Otwórz port 8080
EXPOSE 8080

# Uruchom aplikację Java
CMD ["java", "-jar", "app.jar"]
