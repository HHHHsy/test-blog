#!/bin/bash
set -euxo pipefail

APP_DIR="/opt/elegance-journal"
NODE_VERSION="22.16.0"

dnf update -y
dnf install -y nginx tar gzip xz

if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" -o /tmp/node.tar.xz
mkdir -p /opt/node
tar -xJf /tmp/node.tar.xz -C /opt/node --strip-components=1
ln -sf /opt/node/bin/node /usr/local/bin/node
ln -sf /opt/node/bin/npm /usr/local/bin/npm
ln -sf /opt/node/bin/npx /usr/local/bin/npx

mkdir -p "$APP_DIR"
curl -L "__APP_TARBALL_URL__" -o /tmp/elegance-app.tgz
tar -xzf /tmp/elegance-app.tgz -C "$APP_DIR"

cat > /etc/elegance-journal.env <<'ENV'
DATABASE_URL="__DATABASE_URL__"
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
ENV

cd "$APP_DIR"
npm ci
npx prisma generate
set -a
source /etc/elegance-journal.env
set +a
npx prisma db push --accept-data-loss
npm run prisma:seed
npm run build

cat > /etc/systemd/system/elegance-journal.service <<'SERVICE'
[Unit]
Description=Elegance Journal Next.js app
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/opt/elegance-journal
EnvironmentFile=/etc/elegance-journal.env
ExecStart=/usr/local/bin/npm run start
Restart=always
RestartSec=5
User=root
StandardOutput=append:/var/log/elegance-journal.log
StandardError=append:/var/log/elegance-journal.log

[Install]
WantedBy=multi-user.target
SERVICE

cat > /etc/nginx/conf.d/elegance-journal.conf <<'NGINX'
server {
  listen 80;
  server_name _;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
NGINX

rm -f /etc/nginx/conf.d/default.conf
systemctl daemon-reload
systemctl enable --now elegance-journal
systemctl enable --now nginx
nginx -s reload || systemctl restart nginx
