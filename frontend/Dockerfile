FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# If you only need production dependencies for the build itself:
# RUN npm install --production --no-cache && npm cache clean --force 
# If your build step needs devDependencies (e.g., for TypeScript, linters, bundlers like Webpack/Vite):
RUN npm install --no-cache && npm cache clean --force

COPY . .
# IMPORTANT: Add your build command here if you have one for the frontend
# For example: RUN npm run build

FROM node:18-alpine
# You might consider a smaller base image like nginx for serving static files
# if your frontend is purely static after the build step.

WORKDIR /app

# If you have a build step that outputs to a specific folder (e.g., 'dist', 'build'),
# copy only that folder. Otherwise, copy the relevant application files.
# Example for a static build output in 'dist':
# COPY --from=builder /app/dist ./dist 
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/node_modules ./node_modules

# If you are running a Node.js server for your frontend (e.g., Next.js SSR)
# copy the necessary application files and node_modules:
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public # Or your static assets folder
COPY --from=builder /app/.next ./.next # Example for Next.js
COPY --from=builder /app/next.config.js ./ # Example for Next.js

EXPOSE 3000

# Adjust CMD based on whether you have a build step and how you serve your app
# If serving static files from a 'dist' folder with a simple server:
# CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
# If running a Node.js based frontend (e.g., Next.js):
# CMD ["npm", "start"] 
CMD ["npm", "run", "dev"] # Keep this if 'dev' is how you intend to run in container, but ideally switch to a production command