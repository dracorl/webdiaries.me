# Use a base image with Node.js installed
FROM node:20.12.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the frontend code
# RUN npm run build

# Expose the port that the frontend will run on
EXPOSE 8000

# Start the frontend server
CMD ["npm", "run", "serve"]