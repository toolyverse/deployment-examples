# 1. Build Aşaması (Node yerine Bun imajı kullanıyoruz)
FROM oven/bun:1 AS builder

WORKDIR /app

# Dependency dosyalarını kopyala
# bun.lockb dosyasını da kopyalıyoruz
COPY package.json bun.lockb* ./

# Bağımlılıkları kur (npm ci yerine bun install)
# --frozen-lockfile: lock dosyasını değiştirmeden kurar (npm ci gibi)
RUN bun install --frozen-lockfile

# Kaynak kodları kopyala
COPY . .

# Build al
RUN bun run build

# 2. Production Aşaması (Nginx kısmı değişmez)
FROM nginx:alpine

# Builder aşamasından çıkan 'dist' klasörünü Nginx'e kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]