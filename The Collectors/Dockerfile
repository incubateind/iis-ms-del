FROM node:lts-slim

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

# Create app directory
WORKDIR /usr/src/app

# Copy package.json for dependencies
COPY package.json yarn.lock ./

RUN yarn install
RUN yarn global add sequelize-cli

# Run dev server
CMD ["yarn", "start"]