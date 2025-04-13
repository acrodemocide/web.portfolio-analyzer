# Frontend Dockerfile
FROM node:18.14.2

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend/ ./

# Build the React app
RUN npm run build

# Use a simple server to serve static files
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
