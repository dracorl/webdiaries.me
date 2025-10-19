# Use a base image with Node.js installed
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port (default to 5000, configurable via ARG)
ARG PORT=5000
EXPOSE $PORT

# Start the application based on NODE_ENV
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run build; else npm run dev -- --host; fi"]