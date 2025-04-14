# DigiBioGasHub

![Project is co-funded by the European Union](DigiBioGasHub/src/assets/funder-logo-en.png)
[Project Website](https://sites.uwasa.fi/digibiogashubs/)

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
Project is split into 3 parts + docs
- This repository is for the front end. THIS IS REQUIRED
- [Backend](https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub-backend) THIS IS REQUIRED
- [Docker for PostgreSQL](https://github.com/CentriaUniversityOfAppliedSciences/DigiBioGasHub-database) OPTIONAL

## Features
### Implemented
- Marketplace for showing the offers
- Wiki style knowledge bank
- Blog for marketing
- User and company system
- I18N localization
- Filters
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
API_PATH="your api"
API_KEY=""
```

# Contribution Guidelines
## Missing a feature or found a bug?
Please submit it as an issue to this repository with as much explanation about the bug or feature as possible.

## License: MIT
See LICENSE.md for more information.