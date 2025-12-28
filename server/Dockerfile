# Use Node.js 18 on Debian Bullseye (good for compat)
FROM node:18-bullseye

# Install FFmpeg and other build utilities
# We need python3/make/g++ for native modules like better-sqlite3 or sharp if prebuilds fail
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (including native modules)
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]
