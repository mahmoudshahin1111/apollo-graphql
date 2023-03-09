FROM node:12.18.1
COPY . ./app
WORKDIR /app
RUN npm i -s
EXPOSE 80:4000
CMD ["npm","run","start"]