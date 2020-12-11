FROM node:12-alpine

WORKDIR /app
COPY ./package.json ./

RUN npm install
COPY . .

RUN npm run build

ENV HOST=0.0.0.0
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
