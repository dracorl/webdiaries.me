# Development stage
FROM node:23 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["sh", "-c", "npm run seed && npm run dev"]

# Production stage
FROM node:23 AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
CMD ["sh", "-c", "npm run seed && npm run start"]