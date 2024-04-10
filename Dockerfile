FROM node:9-slim
WORKDIR /app
COPY . /app
RUN mkdir /app/reports
RUN npm install
VOLUME /app/reports
CMD [ "npm", "start" ]
