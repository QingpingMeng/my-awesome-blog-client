FROM node:alpine as builder

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN apt-get install git

RUN npm install

COPY . /src/app

RUN npm run build

FROM nginx:alpine

COPY --from=builder /src/app/build /usr/share/nginx/html