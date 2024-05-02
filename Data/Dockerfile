FROM python:3.10-buster

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    apt-get install -y openjdk-8-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $JAVA_HOME/bin:$PATH

RUN pip install --no-cache-dir -r requirements.txt && \
    pip install git+https://github.com/allinux/PyKoSpacing.git

EXPOSE 8000

ENV FASTAPI_ENV production

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]