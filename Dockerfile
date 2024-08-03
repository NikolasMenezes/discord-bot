FROM node:20-alpine3.20

WORKDIR /app

COPY package.json /app/

RUN npm install -g pnpm

COPY pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile --silent

COPY . /app/

RUN chown -R node:node /app

USER node

CMD [ "pnpm", "dev" ]