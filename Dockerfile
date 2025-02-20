# 1. Use Node.js as the base image
FROM node:18 AS builder

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# 4. Copy the entire project
COPY . .

# 5. Build Next.js for production
RUN npm run build

# 6. Production image
FROM node:18 AS runner
WORKDIR /app

# 7. Copy build files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# 8. Expose the port Next.js runs on
EXPOSE 3000

# 9. Start the Next.js app
CMD ["npm", "start"]
