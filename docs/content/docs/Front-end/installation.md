---
weight: 999
title: "Installation"
description: ""
icon: "article"
date: "2025-07-14T09:46:08Z"
lastmod: "2025-07-14T09:46:08Z"
draft: false
toc: true
ShowCodeCopyButtons: true
---


1. Clone the repository
2. Change directory to project folder
3. Run npm install
4. Create .env file, check the needed values from below.
5. Run in dev mode or build for production
```
git clone https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub.git
cd DigiBioGasHub
npm install
nano .env
ionic serve
ionic build --prod
```

## ENV file
Add .env file to the root of the project and type the following inside:
```
VITE_BACKEND_ADDRESS=https://address_to_server/api
VITE_CHATSERVER=https://address_to_server/chatserver
VITE_CHATSOCKET=https://address_to_server
VITE_ENABLE_BIOKAASUKLINIKKA=false #true only if BKKlinikkaComponent.vue file exists
VITE_CUBE_ADDRESS=https://address_to_server/analytics
```