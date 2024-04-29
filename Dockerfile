FROM node:20.12-bookworm-slim AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20.12-bullseye AS production

WORKDIR /usr/src/app

RUN curl https://cli-assets.heroku.com/install.sh | sh
ENV PATH="${PATH}:/usr/local/bin/heroku"
RUN echo 'export PATH="/usr/local/bin/heroku:$PATH"' >> ~/.bashrc
RUN . ~/.bashrc
RUN heroku --version

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/build ./build

EXPOSE 80

CMD ["node", "build/index.js"]
