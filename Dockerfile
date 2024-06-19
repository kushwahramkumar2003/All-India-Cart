# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the root package.json and package-lock.json files.
COPY package.json package-lock.json ./

# Install the root dependencies.
RUN npm install

# Copy the entire project.
COPY . .

# Change the working directory to the API
WORKDIR /usr/src/app/apps/api

# Install the API dependencies.
RUN npm install

# Install the Prisma CLI and generate the Prisma client
RUN npx prisma generate

# Build the API application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]