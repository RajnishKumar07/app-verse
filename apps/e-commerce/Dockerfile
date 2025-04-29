# Step 1: Use Node.js official image to build the app
FROM node:20 AS builder

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json from the root of the project
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install --legacy-peer-deps

# Step 5: Copy all other files and folders from the root to the container (except excluded by .dockerignore)
COPY . .

# Step 6: Build the Angular app for production
RUN npm run build:e-commerce:prod

# Step 7: Use Nginx to serve the built app
FROM nginx:alpine AS production

# Remove default nginx index.html
RUN rm -rf /usr/share/nginx/html/*

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular files from the builder image
COPY --from=builder /app/dist/apps/e-commerce /usr/share/nginx/html

# Expose port 3000 to serve the app
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]