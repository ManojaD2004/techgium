FROM node:18-bullseye-slim

WORKDIR /app

RUN apt-get update
RUN apt-get install -y python3
RUN ln -s /usr/bin/python3 /usr/bin/python
RUN apt-get clean
RUN apt-get install -y python3-pip

RUN mkdir python

RUN mkdir server

COPY ./python/requirements.txt /app/python/requirements.txt

COPY ./server/package.json /app/server/package.json

WORKDIR /app/python

RUN pip install -r requirements.txt

WORKDIR /app/server

RUN npm install

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean


COPY . .

WORKDIR /app/server


EXPOSE 9000

CMD [ "npm", "run", "start" ]