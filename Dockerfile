FROM node:16.14.2-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 4000

ENV NODE_ENV production

CMD [ "npm", "start" ]