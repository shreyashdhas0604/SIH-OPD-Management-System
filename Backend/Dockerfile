# Use an official Node.js image (with version >= 16.13)
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port your backend runs on
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]