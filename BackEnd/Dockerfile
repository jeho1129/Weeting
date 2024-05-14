# 빌드 스테이지
FROM amazoncorretto:17 AS builder
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
FROM amazoncorretto:17
USER root
WORKDIR /back

# 필요한 패키지를 설치합니다.
RUN apt-get update && apt-get install -y redis-tools

# 시간대 설정을 위한 환경 변수 추가
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 빌드된 JAR 파일 복사
COPY --from=builder /back/build/libs/*.jar app.jar

# 애플리케이션 실행
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]

# 볼륨 설정
VOLUME /tmp