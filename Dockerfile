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

COPY --from=builder /app/build /usr/share/nginx/html

CMD sed -i -e "s/window.API_HOST_VALUE/'"$API_HOST"'/" /usr/share/nginx/html/config.js && \
    sed -i -e "s/window.GITHUB_CLIENT_ID_VALUE/'"$GITHUB_CLIENT_ID_VALUE"'/" /usr/share/nginx/html/config.js && \
     nginx -g 'daemon off;'