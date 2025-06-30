# Use the official Node.js 18 image as base
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN chmod +x entrypoint.sh

# Run the application
CMD ["sh", "./entrypoint.sh"]
