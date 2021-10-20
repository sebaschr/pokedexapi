import express from 'express';
import openAPIBackend from 'openapi-backend';
import yaml from 'js-yaml';
import cors from 'cors';
import { readFileSync } from 'fs';
import routes from './routes.js';

const PORT = 3001;
const API_SPEC = 'pokemon-api.v1.yaml';
const API_ROOT = '/v1';

// Setup OpenAPI middleware
const pokemonApi = new openAPIBackend.default({
	definition: yaml.safeLoad(readFileSync(API_SPEC, 'utf8')),
	handlers: routes,
	apiRoot: API_ROOT,
});
pokemonApi.init();

// Setup and start express
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res) => pokemonApi.handleRequest(req, req, res));
app.listen(PORT, () => console.log(`Application listening on http://localhost:${PORT}`));
