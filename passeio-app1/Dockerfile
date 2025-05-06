
#etapa i : build
FROM node:22-alpine AS build

WORKDIR /app

# ./ => qnd coloca mais de uma arquivo
COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

RUN npm install build --prod


#etapa 2 : roda as aplicações

FROM nginx:alpine

# deleta todas os html padrão do nginix
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/passeio-app1/browser /usr/share/nginx/html

#porta padrão nginx nao pode ser mudada
EXPOSE 80

ENTRYPOINT nginx -g 'daemon off;';
