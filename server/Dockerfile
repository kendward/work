# Start with a base image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY .env nest-cli.json tsconfig.json tsconfig.build.json ./

RUN npm install --force

RUN npm install -g nodemon

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["nodemon", "dist/main"]
