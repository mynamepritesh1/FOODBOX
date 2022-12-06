# stage 1
FROM node:16.17.1-alpine as node
WORKDIR /app
COPY . .
RUN npm install -g npm@9.1.3
CMD ["npm" , "start"]
# RUN  npm run build --prod


# stage 2
FROM nginx:alpine
EXPOSE 8080
# COPY --from=node /app/dist/food-box-front-end  /usr/share/nginx/html