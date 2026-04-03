FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

HEALTHCHECK CMD curl --fail http://localhost:5000/api/health || exit 1

CMD ["npm", "start"]