# Webdiaries.me

## Prerequisites

- MongoDB
- BIND9 DNS Server
- [This amazing REST API](https://gitlab.com/jaytuck/bind-rest-api) from Jay Tuckey for adding/deleting DNS records

## Installation Guide

Follow these steps to install and run Webdiaries.me:

1. Blog Service:

   - Change directory to `webdiaries.me/blog-service`
   - Run `npm i` to install dependencies
   - Create a **.env** file in this directory with the following keys:
     ```
     MONGODB_HOST=
     MONGODB_PORT=
     MONGODB_DATABASE=
     MONGODB_USER=
     MONGODB_PASSWORD=
     BIND_API=
     BIND_API_KEY=
     YANDEX_USER=
     YANDEX_PASS=
     ACCESS_TOKEN_SECRET=
     REFRESH_TOKEN_SECRET=
     SERVER_IP=
     ```
   - Build the Docker image: `docker build -t blog-service .`
   - Run the Docker container: `docker run -d --name blog-service -p 4000:4000 blog-service`
   - The blog service is now running!

2. User Dashboard:

   - Change directory to `webdiaries.me/user-dashboard`
   - Run `npm i` to install dependencies
   - Create a **.env** file in this directory with the following key:
     ```
     VITE_BACKEND_API=blog-service-url
     ```
   - Build the project: `npm run build`

3. Frontend:

   - Change directory to `webdiaries.me/frontend`
   - Run `npm i` to install dependencies
   - Create a **.env** file in this directory with the following key:
     ```
     VITE_BACKEND_API=blog-service-url
     ```
   - Build the project: `npm run build`

4. Nginx Configuration:
   ```
   server {
      listen 80;
      server_name webdiaries.me www.webdiaries.me;
      location / {
         root user-dashboard directory;
         index index.html index.htm;
         try_files $uri $uri/ /index.html;
      }
   }
   server {
      listen 80;
      server_name \*.webdiaries.me;
      location / {
         root frontend directory;
         index index.html index.htm;
         try_files $uri $uri/ /index.html;
      }
   }
   ```
