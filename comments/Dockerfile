FROM node:lts-alpine

# Set workdir
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json'
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Force port to 8080
ENV APP_PORT=8080

# Expose application port
EXPOSE 8080

# Run commnets service
CMD [ "node", "index.js" ]