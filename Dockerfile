FROM node:20-alpine AS builder


# Define build-time arguments
ARG REACT_APP_BASE_API_URL
ARG REACT_APP_IMAGE_BASE_URL

# Set them as environment variables so React can access them
ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL
ENV REACT_APP_IMAGE_BASE_URL=$REACT_APP_IMAGE_BASE_URL

# Echo for debug
RUN echo "BASE URL: $REACT_APP_BASE_API_URL" && \
    echo "IMAGE URL: $REACT_APP_IMAGE_BASE_URL"

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Serve the built app using a lightweight server
FROM nginx:alpine

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]