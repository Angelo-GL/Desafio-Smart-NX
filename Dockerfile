FROM node:lts

WORKDIR /usr/src/desafio

COPY package.json ./
RUN npm install 

COPY . .

EXPOSE 4000

CMD [ "node", "server.js" ]