FROM node:18

WORKDIR /src/frontend/dam

COPY package*.json ./

RUN npm install -g @ionic/cli @angular-devkit/build-angular && npm install
RUN npm install --save highcharts

EXPOSE 8100