# Use official node image as the base image
FROM node:16.14.0-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . .

# Install all the dependencies
# RUN npm cache clear --force
RUN npm install --force


# Generate the build of the application
RUN npm run build

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/ala-fein /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]