FROM node:latest

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install --silent

COPY . ./

# EXPOSE 3000

# # start app
# CMD ["npm", "start"]
