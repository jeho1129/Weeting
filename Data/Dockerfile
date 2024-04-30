FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y git && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install git+https://github.com/allinux/PyKoSpacing.git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8000

ENV FASTAPI_ENV production

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]