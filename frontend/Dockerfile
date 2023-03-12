FROM node:latest

WORKDIR /frontend

COPY package.json package-lock.json ./


RUN npm install

COPY . ./

EXPOSE 3000

# # start app
CMD ["npm", "start"]
