# Development stage
FROM node:23-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# Build stage
FROM node:23-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build