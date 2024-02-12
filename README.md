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


### Setting Up Kong with microservices

First create the API service
[Docs](https://docs.konghq.com/gateway/api/admin-oss/latest/#/Services/create-service)

```bash
curl -i -X POST --url http://localhost:8001/services/ --data 'name=service1' --data 'url=http://localhost:3001'
```
url: Kong admin url

data.url: url to your api service


Create routes to the API service
[Docs](https://docs.konghq.com/gateway/api/admin-oss/latest/#/Routes/create-route-for-service)

```bash
curl -i -X POST --url http://localhost:8001/services/service1/routes --data 'paths[]=/service1'
```

url: Kong admin url. "service1" is the name of your service.

data.paths[]: the path that you want to use as root to redirect to your service.

__TEST__: [http://localhost:8000/service1](http://localhost:8000/service1)


## Protected routes
### Add JWT
Add JWT plugin to the service
```bash
curl -i -X POST --url http://localhost:8001/services/service1/plugins/ --data 'name=jwt' --data 'config.claims_to_verify=exp' --data 'config.header_names=Authorization'
```

### Add CORS
Add CORS plugin to the service
```bash
curl -i -X POST --url http://localhost:8001/services/service1/plugins/ --data 'name=cors' --data 'config.exposed_headers=Authorization' --data 'config.credentials=true' --data 'config.methods=GET' --data 'config.headers=Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Authorization'
```



