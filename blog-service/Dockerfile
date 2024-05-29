# Use the official Node.js 20.12.0 image as the base image
FROM node:20.12.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the application
CMD [ "npm", "start" ]