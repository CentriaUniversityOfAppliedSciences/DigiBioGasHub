---
weight: 602
title: "Installation"
description: ""
icon: "article"
date: "2025-07-31T13:06:01Z"
lastmod: "2025-07-31T13:06:01Z"
draft: false
toc: true
---

CubeJS (https://cube.dev/) repository uses Docker so you can skip step #1 if you already installed Docker

1. Install Docker (https://docs.docker.com/engine/install/)
2. Clone the repository
    ```
    git clone https://github.com/CentriaUniversityOfAppliedSciences/DigiBiogasHubsCube.git
    ```
3. Create .env file
    ```
    cd DigiBiogasHubsCube
    nano .env
    ```  
      
     <br/> 


    ```
    CUBEJS_DB_HOST=host.docker.internal #if PostgreSQL running in docker or locally, change if installed elsewhere
    CUBEJS_DB_PORT=5432 #change this to match your PostgreSQL port
    CUBEJS_DB_NAME=digibiogashubsdbname #change to match database name created in backend
    CUBEJS_DB_USER=usernamefordigibiogashubsdb #change to match PostgreSQL username created in backend
    CUBEJS_DB_PASS=passwordfordigibiogashubsdb #change to match PostgreSQL password created in backend
    CUBEJS_DB_TYPE=postgres
    CUBEJS_DB_SSL=false #if postgresql in docker false else true
    CUBEJS_EXTERNAL_DEFAULT=true
    CUBEJS_SCHEDULED_REFRESH_DEFAULT=true
    CUBEJS_DEV_MODE=false
    CUBEJS_SCHEMA_PATH=model
    CUBEJS_CUBESTORE_HOST=cubestore
    CUBEJS_JWT_KEY=same-key-as-in-digibiogashubs-backend-jwtkey #change to match backend jwt key
    CUBEJS_API_SECRET=same-key-as-in-digibiogashubs-backend-jwtkey #change to match backend jwt key
    CUBEJS_REFRESH_WORKER=true
    ```
4. Skip if you are using PostgreSQL in docker. Otherwise you need to allow docker ip address to access PostgreSQL. Below are instructions for Ubuntu Server and PostgreSQL 16. Note that docker ip address may be different.

    ```
    sudo nano /etc/postgresql/16/main/postgresql.conf
    #change line with #listen_addresses 'localhost' to (uncomment and add docker internal address like below)
    listen_addresses = 'localhost,172.17.0.1'
    #save file
    
    sudo nano /etc/postgresql/16/main/pg_hba.conf
    #below line with "host all all 127.0.0.1/32 scram-sha-256"
    #add line
    host    all             all             172.17.0.0/24           scram-sha-256
    #save file
    sudo systemctl restart postgresql
    ```
5. Start Docker
    ```
    docker compose up
    ```
