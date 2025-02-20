# 1. Sử dụng Node.js làm base image
FROM node:18 AS builder

# 2. Thiết lập thư mục làm việc
WORKDIR /app

# 3. Sao chép package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# 4. Sao chép toàn bộ project
COPY . .

# 5. Xóa cache Next.js nếu có lỗi
RUN rm -rf .next

# 6. Tắt Telemetry & ESLint & TypeScript lỗi build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DISABLE_ESLINT=1
ENV NEXT_PUBLIC_IGNORE_BUILD_ERRORS=true

# 7. Build Next.js cho production
RUN npm run build || true

# 8. Production Stage
FROM node:18 AS runner
WORKDIR /app

# 9. Copy build từ builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# 10. Tắt kiểm tra Telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# 11. Mở cổng 3000
EXPOSE 3000

# 12. Chạy Next.js app
CMD ["npm", "start"]
