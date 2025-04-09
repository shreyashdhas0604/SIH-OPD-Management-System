# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files to the working directory
COPY . .

# Expose the port your React app runs on
EXPOSE 5173

# Start the React development server
CMD ["npm", "run", "dev"]
