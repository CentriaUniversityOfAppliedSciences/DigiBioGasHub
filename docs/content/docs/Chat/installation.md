---
weight: 502
title: "Installation"
description: ""
icon: "article"
date: "2025-07-14T11:45:34Z"
lastmod: "2025-07-14T11:45:34Z"
draft: false
toc: true
---

1. Clone the repository
2. Change directory to project folder
3. add .env file into server folder
4. install mongodb (https://www.mongodb.com/) (tested with mongodb community server 8.0)
5. install modules from npm 
```
git clone https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHubs-Chat-Server.git
cd DigiBioGasHubs-Chat-Server
nano server/.env
npm i
```

ENV File
```
CONNECTION_STRING="mongodb://address_to_mongodb:mongodb_port/databasename"
PORT=chat_server_port_number
SERVER_ADDRESS=https://serveraddress:port
EMAIL_SENDER=username_for_email_smtp
EMAIL_PASS=password_for_email_smtp
```