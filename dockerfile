FROM node:16.2-alpine
ARG APP_DIR=/apt/app/device-mon-backend
EXPOSE 3001:3001

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY . $APP_DIR
ENV NODE_PATH /usr/lib/node_modules
# ADD package.json package.json
RUN yarn
# ADD . .
RUN yarn build
RUN npm prune --production
RUN chmod -Rf 777 .
# CMD ["node", "./dist/main.js"]
CMD ["yarn","start:prod"]
