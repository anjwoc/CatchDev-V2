FROM node:12-alpine

WORKDIR /app
COPY ./package.json ./

RUN npm install
COPY . .

# RUN npm run build

ENV HOST=0.0.0.0
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3550

EXPOSE 3550

CMD ["npm", "start"]
