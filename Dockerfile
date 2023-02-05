FROM node:lts

WORKDIR /usr/src/desafio

COPY package.json /usr/src/desafio
RUN npm install --quiet

COPY . /usr/src/desafio

EXPOSE 4000

CMD [ "node", "src/server.js" ]