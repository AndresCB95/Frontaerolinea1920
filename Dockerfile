FROM node:latest

ADD . .

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "npm","start" ]