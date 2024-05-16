# 빌드 스테이지
FROM gradle:8.5.0-jdk17-alpine AS build
USER root
WORKDIR /back
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
# gradlew 실행 권한 부여
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

# 실행 스테이지
FROM azul/zulu-openjdk:17

WORKDIR /back

# 빌드된 JAR 파일 복사
COPY --from=build /back/build/libs/*.jar app.jar

# 애플리케이션 실행
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]

# 볼륨 설정
VOLUME /tmp