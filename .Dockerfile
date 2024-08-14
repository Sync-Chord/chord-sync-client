# Step 1: Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Step 2: Set the working directory inside the container to the root of your project
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all the project files to the container
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use an official Nginx image to serve the build
FROM nginx:alpine AS production

# Step 8: Copy the build output to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
