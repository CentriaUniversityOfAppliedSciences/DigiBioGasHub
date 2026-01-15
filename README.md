# DigiBioGasHub

![Project is co-funded by the European Union](DigiBioGasHub/src/assets/funder-logo-en.png)
[Project Website](https://sites.uwasa.fi/digibiogashubs/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18199309.svg)](https://doi.org/10.5281/zenodo.18199309)

DigiBioGasHub is a platform for selling biogas and biomass to create biogas products. This platform can also be used for other product types.
NOTE: This platform does not have any payment service integrated, but it can be added.

## Requirements:
```
NodeJS
Vue.js
Docker
Ionic Framework
PostgreSQL
```

## Project structure
Project is split into 4 parts + docs
- This repository is for the front end. THIS IS REQUIRED
- [Backend](https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub-backend) THIS IS REQUIRED
- [ChatServer](https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHubs-Chat-Server) THIS IS REQUIRED
- [Analytics](https://github.com/CentriaUniversityOfAppliedSciences/DigiBiogasHubsCube) THIS IS REQUIRED
- [OpenAPI](https://github.com/CentriaUniversityOfAppliedSciences/DigiBiogasHubsOpenAPI) OPTIONAL
- [Docker for PostgreSQL](https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub-database) OPTIONAL

## Features
### Implemented
- Marketplace for showing the offers
- Wiki style knowledge bank
- Blog for marketing
- User and company system
- I18N localization
- Filters
- Chat
- Map view
- Admin functionalities
### Not yet implemented
- Subscriptions
- Agreements
- Search


## How to get started

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
VITE_ENABLE_BIOKAASUKLINIKKA=false #true only if BKKlinikkaComponent.vue exists
VITE_CUBE_ADDRESS=https://address_to_server/analytics
VITE_USE_PAYMENT=false #does platform show stripe purchase options
```

## Building for production
```
export NODE_OPTIONS=--max_old_space_size=8192
ionic build --prod
```

# Contribution Guidelines
## Missing a feature or found a bug?
Please submit it as an issue to this repository with as much explanation about the bug or feature as possible. In case of a security, do not create a new issue, send email about it to jyri.makela@centria.fi.

## License: MIT
See LICENSE for more information.

## Developers
Centria University of Applied Sciences Ltd.
- Jyri Mäkelä
- Risto Hietala
- Prakash Acharya
