FROM node:12.19.1 AS build_node_at_development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY ./jest.config.json \
     ./nest-cli.json \
     ./package.json \
     ./tsconfig.json \
     ./yarn.lock \
     ./
RUN yarn install
COPY ./libs ./libs
COPY ./apps/at ./apps/at
ENTRYPOINT ["./node_modules/.bin/nest","start","at","--watch"]
