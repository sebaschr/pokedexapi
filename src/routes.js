import {
  getPokemon,
  getPokemonById,
  getAllPokemons,
  getEvolutions,
} from "./controllers/pokemon.js";
import { validationFail, notFound } from "./controllers/errors.js";

/**
 * If an endpoint's `operationId` exists in this object it will be used to handle that request.
 */
const routes = {
  /**
   * We have implemented the getPokemon endpoint ('/v1/pokemon'). All other endpoints are mocked.
   */
  getPokemon,
  getPokemonById,
  getEvolutions,
  getAllPokemons,
  /**
   * Special function that openapi-backend will call for every endpoint defined in our spec that does not have a
   * corresponding handler. If there is an "example" object in the endpoint's yaml then that will be returned,
   * otherwise it will just return the response schema.
   */
  notImplemented: (context, req, res) => {
    const { status, mock } = context.api.mockResponseForOperation(
      context.operation.operationId
    );

    return res.status(status).json(mock);
  },

  /**
   * Generic error handlers defined by openapi-backend
   */
  validationFail,
  notFound,
};

export default routes;
