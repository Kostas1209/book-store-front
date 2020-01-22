FROM node:10.9 AS build

RUN mkdir /app
COPY ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm ci
COPY . /app/
# this will build the browser and server files:
RUN npm run build:ssr -- --configuration=production



FROM nginx:1.16.1 AS frontend-browser
COPY --from=build /app/dist/browser/ /usr/share/nginx/html
COPY ./angular-server.nginx.conf /etc/nginx/conf.d/default.conf


FROM node:10.17-alpine AS ssr-server
COPY --from=build /app/dist /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app
EXPOSE 4000
CMD npm run serve:ssr