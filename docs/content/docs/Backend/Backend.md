---
title: "Backend"
description: ""
icon: "api"
date: "2023-05-22T00:44:31+01:00"
lastmod: "2023-05-22T00:44:31+01:00"
draft: false
toc: true
weight: 301
---

## Backend

Backend is a REST-server built with nodejs and expressjs.  

You need Docker to run backend.  

Note!! Install database before starting backend for the first time
As database the backend uses PostgreSQL (https://www.postgresql.org/). The docker from project repository uses TimescaleDB that is a PostgreSQL extension. You can use any kind of PostgreSQL installation you have access to (docker/local install/remote server). 