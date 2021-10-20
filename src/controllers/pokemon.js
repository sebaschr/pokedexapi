import oakdexPokemon from "oakdex-pokedex";

/**
 * Take a pokemon object from the oakdex package (which has tons of data in it), and return a simpler object for our
 * api. Doesn't handle errors at all.
 *
 * @param pokemon object - from oakdex-pokemon package
 * @returns PokemonDetails model
 */
function transformOakdexPokemon(pokemon) {
  const paddedId = `${pokemon.national_id}`.padStart(3, "0");

  return {
    id: pokemon.national_id,
    name: pokemon.names.en,
    weight: parseFloat(pokemon.weight_eu.split(" ")[0]),
    height: parseFloat(pokemon.height_eu.split(" ")[0]),
    abilities: pokemon.abilities.map((ability) => ability.name),
    types: pokemon.types.map((type) => type.toLowerCase()),
    evolutions: pokemon.evolutions.map(
      (evolution) => oakdexPokemon.findPokemon(evolution.to).national_id
    ),
    description:
      pokemon.pokedex_entries[Object.keys(pokemon.pokedex_entries)[0]].en,
    images: {
      full: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`,
      sprite_front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.national_id}.png`,
      sprite_back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.national_id}.png`,
    },
  };
}

/**
 * Example controller that returns data for requested pokemon.
 *
 * NOTE: The response returned here is not validated against the api spec so make sure to verify your types.
 */
function getPokemon(context, req, res) {
  const { limit = 20, offset = 0, q } = req.query;
  const responseData = [];

  if (q) {
    // find single pokemon by name. this operation is case sensitive. Limit and offset are ignored
    let pokemon = oakdexPokemon.findPokemon(q);

    if (pokemon) {
      responseData.push(transformOakdexPokemon(pokemon));
    }
  } else {
    // get a range of pokemon
    for (let id = offset + 1; id <= limit + offset; id++) {
      let pokemon = oakdexPokemon.findPokemon(id);

      if (pokemon) {
        responseData.push(transformOakdexPokemon(pokemon));
      }
    }
  }

  return res.status(200).json(responseData);
}

function getPokemonById(context, req, res) {
  const id = context.request.params.id;
  let pokemon = oakdexPokemon.findPokemon(id);
  return res.status(200).json(transformOakdexPokemon(pokemon));
}

function getAllPokemons(context, req, res) {
  const responseData = [];

  let pokemons = oakdexPokemon.allPokemon();

  pokemons.forEach((pokemon) => {
    responseData.push(transformOakdexPokemon(pokemon));
  });

  return res.status(200).json(responseData);
}

function getEvolutions(context, req, res) {
  const responseData = [];
  const id = context.request.params.id;
  let allPokemons = oakdexPokemon.allPokemon();
  const pokemons = [];

  allPokemons.forEach((pokemon) => {
    pokemons.push(transformOakdexPokemon(pokemon));
  });

  let pokemon = transformOakdexPokemon(oakdexPokemon.findPokemon(id));

  while (pokemon.evolutions.length > 0) {
    pokemon = transformOakdexPokemon(
      oakdexPokemon.findPokemon(pokemon.evolutions[0])
    );
  }

  responseData.push(pokemon);

  while (pokemons.find((pk) => pk.evolutions[0] === pokemon.id)) {
    pokemon = pokemons.find((pk) => pk.evolutions[0] === pokemon.id);
    responseData.push(pokemon);
  }

  return res.status(200).json(responseData);
}

export { getPokemon, getPokemonById, getAllPokemons, getEvolutions };
