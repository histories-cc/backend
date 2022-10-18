FROM node:16.14.2-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 4000

ENV NODE_ENV production

CMD [ "yarn", "start" ]