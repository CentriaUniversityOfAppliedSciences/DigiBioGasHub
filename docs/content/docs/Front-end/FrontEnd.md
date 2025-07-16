---
title: "Front-end Documentation"
description: ""
icon: "api"
date: "2023-05-22T00:44:31+01:00"
lastmod: "2023-05-22T00:44:31+01:00"
draft: false
toc: true
weight: 310
---

## Front-End
Frontend is build on open source mobile UI toolkit called Ionic. Ios, Android and web applications can be built with the same code with Ionic. For javascript framework Vue was selected.  
Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.  

UI of the frontend is built on pages and components.

### Structure of the project 
```
DigiBioGasHub  
|
|-- DigiBioGasHub (frontend code)
|-- |  
|-- .env (environmental variables)  
|-- .gitignore (files excluded from git)  
|-- package.json (npm libraries used)  
|-- vite.config.js (config for vite)  
|-- src  
|-- |
|-- \-- assets (static files used in the app)  
|-- \-- components (vue components)  
|-- \-- locale (json files for translations)  
|-- \-- router (routing for the app)
|-- \-- |  
|-- \-- \-- index.js (routing inside the app)  
|
|-- \-- views  (vue pages)
|-- \-- main.js (global libraries and variables) 
|-- \-- socket.js (socket init for chat) 
|-- docs (code of documentation you are reading)  
```