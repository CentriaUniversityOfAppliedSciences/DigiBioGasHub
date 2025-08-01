---
weight: 302
title: "Installation"
description: ""
icon: "article"
date: "2025-07-14T09:48:33Z"
lastmod: "2025-07-14T09:48:33Z"
draft: false
toc: true
---

1. Install PostgreSQL
2. Install Docker  
3. Create PostgreSQL role with password for backend (in example code username "biogas")  
4. Create database (in example code "digibiogashub")
    ```
    sudo -i -u postgres
    createuser --interactive
    Enter name of role to add: biogas
    Shall the new role be a superuser? (y/n) n
    Shall the new role be allowed to create databases? (y/n) n
    Shall the new role be allowed to create more new roles? (y/n) n
    psql
    \password biogas
    Enter new password for user "biogas":
    Enter it again:
    CREATE DATABASE "digibiogashub" OWNER biogas;
    ```

5. Clone the repository
6. Change directory to project folder
7. Create .env file in src folder
    ```
    git clone https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub-backend.git
    cd DigiBioGasHub-backend
    nano src/.env
    ```

    ```
    SERVER_PORT=28765
    POSTGRES_USER=username #username you created in #3
    POSTGRES_DB=database #database you created in #4
    POSTGRES_PASSWORD=password #password you created in #3
    DB_HOST=localhost #address to your PostgreSQL installation
    DB_PORT=5432 #port number of PostgreSQL installation
    JWT_KEY=your-secret-jwt-key #secret key to create JWT needs to match with one in cubejs .env and in chat .env
    MML_API_KEY=your-mml-api-key #https://www.maanmittauslaitos.fi/en/rajapinnat/api-avaimen-ohje 
    MINIO_ROOT_USER=your-minio-user 
    MINIO_ROOT_PASSWORD=your-minio-password 
    MINIO_DEV=false #false will use http://localhost:9000, if true then uses MINIO_ADDRESS in links to files
    MINIO_ADDRESS=your_address_for_minio
    EMAIL_SENDER=sender_email_smtp_username
    EMAIL_PASS=sender_email_smtp_password 
    SERVER_ADDRESS=address_to_frontend  #development http://localhost:8100
    HUB_NAME=name_of_your_hub  #default hub created on first start
    HUB_ORIGIN=url_address_of_your_hub  #(local dev is ionic address http://localhost:8100)  
    HUB_ADMIN_USER=username_for_default_admin  #needs to be email e.g. admin@admin.fi
    HUB_ADMIN_PASS=password_for_default_admin  #needs to be atleast 8 char long  
    ```

8. Move out of DigiBioGasHub-backend folder
9. Install min.io (https://github.com/minio/minio) file storage  


    for Ubuntu (some commands might need to be run as sudo)
    ```
    cd ..
    wget https://dl.min.io/server/minio/release/linux-amd64/minio
    chmod +x minio
    mv minio /usr/local/bin/
    groupadd -r minio-user
    useradd -M -r -g minio-user minio-user
    mkdir -p /mnt/data/disk1
    chown minio-user:minio-user /mnt/data/disk1
    ```

10. Configure min.io and run it as service

    change username and password in DigiBioGasHub-backend/minio -file to match .env MINIO_ROOT_USER and MINIO_ROOT_PASSWORD
    ```
    cd DigiBioGasHub-backend
    nano minio
    cp minio /etc/default/minio
    cp minio.service /etc/systemd/system/minio.service
    systemctl enable minio.service
    systemctl start minio.service
    ```

11. Start docker
    ```
    docker compose up
    ```

On first run the backend server will create an superadmin user and a default hub for the system. Username and password for the superadmin are set in .env. Change the superadmin password!!! 
It might be necessary to open port on firewall or vm settings to access backend
