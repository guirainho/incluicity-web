FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
# Copia o arquivo .jar que você gerou com o 'mvn package' no VS Code
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]