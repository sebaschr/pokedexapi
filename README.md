# Pokedex API

A mock API for the [developer onboarding project](https://konradgroup.atlassian.net/wiki/spaces/DEV/pages/941130021/Web+Training).

## Overview
This is a [mock api server](https://stoplight.io/mock-api-guide/basics/#what-is-a-mock-api-server%3F) to aid in development of your Pokedex web application. If you haven't used a mock API before it's purpose is to provide you with realistic looking (but fake) data in lieu of a real backend. It is fairly common to have a mock backend while the real one is being developed.

### The API definition
The entire API is defined in [pokemon-api.v1.yaml](pokemon-api.v1.yaml). This file describes every endpoint available to you, and should be the first thing you look at. It is written in OpenAPI v3 format (formerly called Swagger).

Right now there isn't a built-in documentation site although we plan on adding one. For the time being we suggest copying the contents of [pokemon-api.v1.yaml](pokemon-api.v1.yaml) into a OpenAPI v3 reader like [editor.swagger.io](https://editor.swagger.io/). Exploring the API using that site should be much friendlier than reading the yaml file in your editor. 

### The node backend
The node application that serves that API, which is in `/src`. This is a mock server that uses [express](https://expressjs.com/) and [openapi-backend](https://www.npmjs.com/package/openapi-backend) to read the contents of the yaml file and automatically create all the endpoints and example responses.

## API endpoints

### GET /pokemon
A single endpoint has been implemented for you as an example: `GET /pokemon`. Calls to this endpoint will return real pokemon data, and it will respect the query parameters defined in the yaml spec. If your server is running it should be available at [localhost:3001/v1/pokemon](http://localhost:3001/v1/pokemon).

### Everything else
All other endpoints listed in the yaml spec are mocked automatically and will return static example data.

## Installation
The api requires that you have `Node >= 8.9` installed.

Run the following in your terminal in this folder
```
npm install
npm start
```

The API should be accessible at [localhost:3001/v1](http://localhost:3001/v1). Use Postman or a similar tool to interact with it.

