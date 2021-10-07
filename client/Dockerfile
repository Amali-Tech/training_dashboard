# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm build

# # production stage`
FROM nginx:stable-alpine as production-stage
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]