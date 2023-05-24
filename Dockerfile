
# Use the official Node.js image
FROM node:14

# Set the working directory to /app
WORKDIR /app


RUN mkdir /images
# Install dependencies
COPY package*.json ./
# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./
RUN npm install
RUN npm install express
RUN npm install @types/express
RUN npm install --save-dev ts-node
RUN npm install cors
RUN npx prisma generate
# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 8080

# Start the application
CMD ["npm", "start"]