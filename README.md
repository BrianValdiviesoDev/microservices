# Microservices playground

## What is this?
This is a repository to play with a microservices infrastructure.

Here you can find a ExpressJS API and a React frontend.

## Microservices
### API
Builded with ExpressJS in TypeScript.

It only has one endpoint `whoareyou/` which returns the APP_NAME.

#### Environment variables
__APP_NAME__: a name to return in endpoint. It`s only for differentiate from others.

__PORT__: the port to listen.

### Front
Builded in React + Vite in TypeScript.

It only shows a H1 with the name and the port for differentiate from others.

If you set VITE_API_URL environment variable, it try to make a get request for test connection.

#### Environment variables
__VITE_APP_NAME__: a name to print in H1.

__VITE_APP_PORT__: the port to listen.

__VITE_API_URL__: a URL to check connection in a `GET` request


## KONG
Kong is an API gateway that uses PostgreSQL to store all the information.

[Info](https://docs.konghq.com/gateway/latest/admin-api/)

[DOCS](https://docs.konghq.com/gateway/api/admin-oss/latest/)

### Run only Kong service in Docker

```bash
docker compose -f docker-compose-kong.yml up -d
```

### Run quickstart script with GUI

```bash
./kong-start.sh
```