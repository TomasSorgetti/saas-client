FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3001"]