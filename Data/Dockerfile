FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y software-properties-common wget && \
    wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add - && \
    echo "deb https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/ $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/adoptopenjdk.list && \
    apt-get update && \
    apt-get install -y adoptopenjdk-8-hotspot && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME /usr/lib/jvm/adoptopenjdk-8-hotspot-amd64
ENV PATH $JAVA_HOME/bin:$PATH

RUN pip install --no-cache-dir -r requirements.txt && \
    pip install git+https://github.com/allinux/PyKoSpacing.git

EXPOSE 8000

ENV FASTAPI_ENV production

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]