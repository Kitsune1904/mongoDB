FROM node:20-alpine

#get from build command and actual for Dockerfile only
#to modify default "development" add to build command `--build-arg NODE_ENV_ARG your_value`
ARG NODE_ENV_ARG=development
# goes to image as environment variable
ENV NODE_ENV=$NODE_ENV_ARG

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

RUN npx tsc

CMD if [ "$NODE_ENV_ARG" = "production" ]; then \
        npm run prod; \
    elif [ "$NODE_ENV_ARG" = "test" ]; then \
        npm run test; \
    else \
        npm run dev; \
    fi