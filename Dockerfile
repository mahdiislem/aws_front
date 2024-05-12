# Stage 1: Build Angular application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Angular project
RUN npm run build --prod

# Stage 2: Serve Angular application with Nginx
FROM nginx:latest

# Copy compiled Angular files from previous stage
COPY --from=builder /app/dist/sakai /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
