---
weight: 999
title: "Installation"
description: ""
icon: "article"
date: "2025-07-14T09:48:33Z"
lastmod: "2025-07-14T09:48:33Z"
draft: false
toc: true
---


1. Clone the repository
2. Change directory to project folder
3. Create .env file in src folder, check the needed values from below.
4. install minio
5. start docker with "docker compose up"

On first run the backend server will create an superadmin user (username:admin, password:admin) and a default hub for the system.
Change the admin password!!!

```
git clone https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub-backend.git
cd DigiBioGasHub-backend
nano src/.env
```

ENV File
```
SERVER_PORT=28765
POSTGRES_USER=username
POSTGRES_DB=database
POSTGRES_PASSWORD=password
DB_HOST=localhost 
DB_PORT=5432 
JWT_KEY=your-secret-jwt-key 
MML_API_KEY=your-mml-api-key https://www.maanmittauslaitos.fi/en/rajapinnat/api-avaimen-ohje 
MINIO_ROOT_USER=your-minio-user 
MINIO_ROOT_PASSWORD=your-minio-password 
MINIO_DEV=false 
MINIO_ADDRESS=your_address_for_minio
EMAIL_SENDER=sender_email_smtp_username
EMAIL_PASS=sender_email_smtp_password 
SERVER_ADDRESS=address_to_frontend 
```

Install min.io (https://github.com/minio/minio) file storage
for Ubuntu
```
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
mv minio /usr/local/bin/
groupadd -r minio-user
useradd -M -r -g minio-user minio-user
mkdir -p /mnt/data/disk1
chown minio-user:minio-user /mnt/data/disk1
```
change user and password in DigiBioGasHub-backend/minio -file to match .env MINIO_ROOT_USER and MINIO_ROOT_PASSWORD
```
cp minio /etc/default/minio
cp minio.service /etc/systemd/system/minio.service
systemctl enable minio.service
systemctl start minio.service
```
open port on firewall or vm settings 
