# Use the official Node.js 23 image as the base image
FROM node:23

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Configure npm with alternative registry and increased timeout
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["sh", "-c", "npm run start"]