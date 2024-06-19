# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npm run prisma-generate

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 8080

# Start the Node.js application
CMD ["npm", "start"]
