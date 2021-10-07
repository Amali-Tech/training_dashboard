FROM node:12.20.1-alpine3.12


RUN apk update \
 && apk --update --no-cache add git

# set working dir
WORKDIR /app

COPY package.json .
COPY package-lock.json .

#copy project
COPY . .

RUN apk update \
 && apk --update --no-cache add \
 build-base \
 python2 \
 python2-dev \
 libffi-dev \
 libressl-dev \
 libxml2-dev \
 libxslt-dev \
 libexecinfo-dev \
 libc6-compat \
 bash \
 gettext \
 curl \
 gcc \
 g++ \ 
 libc-dev \
 make

# RUN npm install appmetrics

RUN npm install -g pm2 node-gyp
RUN npm install

CMD ["npm", "start"]
