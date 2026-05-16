# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json ./

# Install project dependencies (express)
RUN npm install

# Copy all source code files to the working directory
COPY app.js ./

# Expose port 3000 so it can be accessed outside the container
EXPOSE 3000

# Run the application using the start script
CMD ["npm", "start"]
