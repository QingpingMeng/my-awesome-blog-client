FROM node:alpine as builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm install -g -s --no-progress yarn && \
    yarn 

COPY . /app

RUN yarn run build && \
    yarn cache clean

FROM nginx:alpine

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html