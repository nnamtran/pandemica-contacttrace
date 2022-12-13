FROM node:alpine
COPY . /contacttrace-server
WORKDIR /contacttrace-server
CMD npm run start:contact
EXPOSE 3005
