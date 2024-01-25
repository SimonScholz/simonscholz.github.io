---
id: "keycloak-quarkus-postgres-docker-compose"
path: "/tutorials/keycloak-quarkus-postgres-docker-compose"
created: "2023-04-17"
updated: "2023-04-17"
title: "Run Keycloak v21 (based on Quarkus) including postgres using docker compose"
description: "Setting up Keycloak v21 (based on Quarkus) with docker compose and connect it to postgres"
author: "Simon Scholz"
tags:
  [
    "keycloak",
    "OAuth",
    "OIDC",
    "Open ID Connect",
    "security",
    "quarkus",
    "docker",
    "docker-compose",
    "container",
  ]
vgWort: "vg09.met.vgwort.de/na/d4c5fb9e0a2f4f75ab0577ae3b02a759"
---

## Keycloak with Postgres

In https://simonscholz.github.io/tutorials/keycloak-realm-export-import I described how to load initial data for Keycloak using realm data export and import capabilities.
This can be really helpful for demonstration purposes and tutorials. ;-)
But in this tutorial I'd like to share some insights on setting up Keycloak with a Postgres database on your local machine using docker compose.
Having a Postgres instance as a persisted volume can be quite handy to store different Keycloak realms between sessions.

Besides the Postgres database also several other database technologies are supported, but Postgres is considered as so called "first class database" for Keycloak. Also see https://www.keycloak.org/2022/02/dbs.html

## Setting up Postgres and PGAdmin

In order to run Postgres and PGAdmin (Postgres database UI client) via docker compose the following can be done:

```yaml
---
version: "3.7"

services:
  keycloak-postgres:
    container_name: keycloak-postgres
    image: "postgres:15.2"
    volumes:
        - ./dev-environment/docker-config/postgres/data:/var/lib/postgresql/data:rw
    environment:
        - POSTGRES_DB=keycloak
        - POSTGRES_USER=keycloak
        - POSTGRES_PASSWORD=keycloak
    ports:
        - "5432:5432"
    restart: unless-stopped

   pgadmin:
      container_name: postgres-pgadmin
      image: "dpage/pgadmin4:7.0"
      environment:
          - PGADMIN_DEFAULT_EMAIL=admin@postgres.dev
          - PGADMIN_DEFAULT_PASSWORD=admin
      ports:
          - "5050:80"
      restart: unless-stopped
```

When saving this to a `docker-compose.yml` file and running `docker-compose up` a Postgres database and a PGAdmin UI client will be started.

Once the container are up and running PGAdmin can be used to browse the Postgres database.
Just go to http://localhost:5050 to login into PGAdmin using the above defined credentials with username `admin@postgres.dev` and `admin` as password.

![PGAdmin login screen](./pgadmin-login.png)

## Starting Keycloak 21 and connect it to the Postgres database

Now we can configure to also start Keycloak once the Postgres DB is up and running.
To ensure this we make use of the depends_on directive like this:

```yml
---
version: "3.7"

services:
  keycloak:
    image: "bitnami/keycloak:21.0.2"
    container_name: keycloak
    depends_on:
      - "keycloak-postgres" # the name of the service above
    restart: unless-stopped
    ports:
      - "8180:8080" # Changing this port because 8080 is usually the default for the actual app, e.g., Quarkus or Spring
    environment:
      - KEYCLOAK_ADMIN_USER=admin
      - KEYCLOAK_ADMIN_PASSWORD=admin
      - KEYCLOAK_DATABASE_NAME=keycloak
      - KEYCLOAK_DATABASE_USER=keycloak
      - KEYCLOAK_DATABASE_PASSWORD=keycloak
      - KEYCLOAK_DATABASE_HOST=keycloak-postgres
```

This samples uses the currently latest version (21.0.2) of Keycloak (dec 4th 2022), which is based on Quarkus instead of Wildfly.

`KEYCLOAK_ADMIN_USER` and `KEYCLOAK_ADMIN_PASSWORD` will be the user name and password to get access to keycloak.

`KEYCLOAK_DATABASE_USER` and `KEYCLOAK_DATABASE_PASSWORD` are the username and password, which have been configured earlier for the Postgres container.

`KEYCLOAK_DATABASE_HOST` is referencing the postgres container `keycloak-postgres`, which will be used by Keycloak to create a jdbc connection towards the postgres.

The meaning of the different environment variables can be found here: https://hub.docker.com/r/bitnami/keycloak/

## Putting all together

The complete docker-compose.yaml file will look like this:

```yml
---
version: "3.7"

services:
  keycloak-postgres:
    container_name: keycloak-postgres
    image: "postgres:15.2"
    volumes:
      - ./dev-environment/docker-config/postgres/data:/var/lib/postgresql/data:rw
    environment:
      - POSTGRES_DB=keycloak
      - POSTGRES_USER=keycloak
      - POSTGRES_PASSWORD=keycloak
    ports:
      - "5432:5432"
    restart: unless-stopped

  pgadmin:
    container_name: postgres-pgadmin
    image: "dpage/pgadmin4:7.0"
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@postgres.dev
      - PGADMIN_DEFAULT_PASSWORD=admin
    ports:
      - "5050:80"
    restart: unless-stopped

  keycloak:
    image: "bitnami/keycloak:21.0.2"
    container_name: keycloak
    depends_on:
      - "keycloak-postgres" # the name of the service above
    restart: unless-stopped
    ports:
      - "8180:8080" # Changing this port because 8080 is usually the default for the actual app, e.g., Quarkus or Spring
    environment:
      - KEYCLOAK_ADMIN_USER=admin
      - KEYCLOAK_ADMIN_PASSWORD=admin
      - KEYCLOAK_DATABASE_NAME=keycloak
      - KEYCLOAK_DATABASE_USER=keycloak
      - KEYCLOAK_DATABASE_PASSWORD=keycloak
      - KEYCLOAK_DATABASE_HOST=keycloak-postgres
```

Going to http://localhost:8180/ will show the Keycloak home screen:

![Keycloak home screen](./keycloak-home.png)

You can click the `Administration Console` link on the left and login using `admin` as username and password:

![Keycloak login screen](./keycloak-login.png)

Once logged in you should be able to see config of the master realm:

![Keycloak admin screen](./keycloak-admin.png)

The first thing you'd probably might want to do is to create a dedicated realm for your application besides the master realm.
You can do so by clicking on the `master` realm and hit `Create Realm`:

![Keycloak create new realm](./keycloak-new-realm.png)

## Viewing the data using PGAdmin

PGAdmin can be used to visualize Keycloak's data in the Postgres database.

Just login at http://localhost:5050 with username `admin@postgres.dev` and `admin` as password, as described earlier above and add a new server:

![PGAdmin Add New Server](./pgadmin-new-server.png)

As name you can use `keycloak` and the `Connection` must have the following values:

| Property             | Value             |
| -------------------- | ----------------- |
| Hostname/address     | keycloak-postgres |
| Port                 | 5432              |
| Maintenance database | keycloak          |
| username             | keycloak          |
| password             | keycloak          |

![PGAdmin Register Server](./pgadmin-register-server.png)

Once the data has been entered you can hit `Save` and you'll be connected to the Postgres database.

![PGAdmin Keycloak tables](./pgadmin-keycloak-tables.png)

## Sources

- https://www.keycloak.org/guides#getting-started
- https://hub.docker.com/r/bitnami/keycloak/
- https://www.keycloak.org/server/containers
- https://hub.docker.com/_/postgres
- https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html
