FROM ubuntu:22.04

WORKDIR /app

# 필요한 패키지 설치
RUN apt-get update && \
    apt-get install -y git openjdk-11-jdk python3 python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# JAVA_HOME 환경 변수 설정
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64
ENV PATH $JAVA_HOME/bin:$PATH

# Python 패키지 및 PyKoSpacing 설치
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt && \
    pip3 install git+https://github.com/allinux/PyKoSpacing.git

EXPOSE 8000

ENV FASTAPI_ENV production

CMD ["python3", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]