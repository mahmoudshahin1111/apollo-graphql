FROM node:18.14.2-alpine3.17
COPY . ./app
WORKDIR /app
RUN npm i -s

CMD ["npm","run","start"]