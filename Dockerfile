FROM python:3.9-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    FLASK_APP=FlaskBackend/app.py \
    FLASK_DEBUG=1

RUN apt-get update && apt-get install -y --no-install-recommends \
        curl ca-certificates git build-essential xz-utils procps \
        libgl1 libglib2.0-0 libsm6 libxext6 libxrender1 \
    && curl -fsSL https://nodejs.org/dist/v16.20.2/node-v16.20.2-linux-x64.tar.xz \
        | tar -xJ -C /usr/local --strip-components=1 \
    && rm -rf /var/lib/apt/lists/*

# cordova should be something like a cross platform file browser
RUN npm install -g @ionic/cli@6 cordova@11

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt