#Specify the base image
FROM node:14.14.0-alpine as builder

#Specify the workdir
WORKDIR /app

#Copy the package json
COPY ./package.json ./

#Install dependencies
RUN npm install

#Copy all files and folders
COPY ./ ./

#Create build
RUN npm run build


#Start new image creation
FROM nginx

#Expose port
EXPOSE 3000

#Copy default.conf file
COPY ./nginx/default.conf ./etc/nginx/conf.d/

#Copy files from the previous image
COPY --from=builder ./app/build ./usr/share/nginx/html