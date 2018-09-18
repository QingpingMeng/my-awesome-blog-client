FROM node:alpine as builder

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm install

COPY . /src/app

RUN npm run build

FROM nginx:alpine

COPY --from=builder /src/app/build /usr/share/nginx/html