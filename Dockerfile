FROM node:16-alpine3.12 as build-deps
WORKDIR /usr/src/app

ENV NODE_OPTIONS --max_old_space_size=4096

COPY / .
RUN set NODE_OPTIONS=--max_old_space_size=4096 && \ 
    yarn install && \
    yarn build

FROM nginx:1.21-alpine

COPY configuracoes/default.conf /etc/nginx/conf.d/
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
