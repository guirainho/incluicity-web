FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
# Copia o JAR que você gerou localmente no seu Windows
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]