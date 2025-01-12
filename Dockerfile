FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/amhe-arbitrage-front/ /usr/share/nginx/html
EXPOSE 80