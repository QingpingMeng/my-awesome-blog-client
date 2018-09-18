FROM node:alpine as builder

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json
COPY yarn.lock /src/app/yarn.lock

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm install -g -s --no-progress yarn && \
    yarn 

COPY . /src/app

RUN yarn run build && \
    yarn cache clean

FROM nginx:alpine

COPY --from=builder /src/app/build /usr/share/nginx/html