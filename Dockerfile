FROM node:alpine

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

CMD ["yarn", "serve"]