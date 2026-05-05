# Estágio 1: Build (Compilação do código Java)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copia o arquivo de dependências e baixa o necessário
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código fonte e gera o arquivo .jar
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Execução (Roda a aplicação)
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copia apenas o arquivo compilado do estágio anterior para ficar leve
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta padrão do serviço (será mapeada no docker-compose)
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]