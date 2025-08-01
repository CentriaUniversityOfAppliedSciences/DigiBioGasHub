---
weight: 402
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
3. Install nodeJS modules from npm
    ```
    git clone https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub.git
    cd DigiBioGasHub
    npm install --legacy-peer-deps
    ```

4. Create .env file
5. Create missing file (Biokaasuklinikka chatbot is not part of this project)
    ```
    nano .env
    touch src/components/BKKlinikkaComponent.vue
    ```
    .env file contents
    ```
    VITE_BACKEND_ADDRESS=https://address_to_server/api
    VITE_CHATSERVER=https://address_to_server/chatserver
    VITE_CHATSOCKET=https://address_to_server
    VITE_ENABLE_BIOKAASUKLINIKKA=false #true only if BKKlinikkaComponent.vue file exists
    VITE_CUBE_ADDRESS=https://address_to_server/analytics
    VITE_USE_PAYMENT=false
    ```
6. Start frontend. Run in dev mode (ionic serve) or build for production
    ```
    ionic serve #development
    ionic build --prod #build production site
    ```
NOTE! You need to change memory limit for nodejs to be able to build the project
```  
export NODE_OPTIONS=--max_old_space_size=8192
```