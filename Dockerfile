FROM node:22-alpine

WORKDIR /app

COPY package* .
COPY ./packages/db/prisma .

RUN npm install 
RUN npx prisma generate

COPY . .

EXPOSE 3000
EXPOSE 5000

CMD ["npm","run","dev"]
