FROM node:alpine as builder

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN npm install --no-cache git

RUN npm install

COPY . /src/app

RUN npm run build

FROM nginx:alpine

COPY --from=builder /src/app/build /usr/share/nginx/html