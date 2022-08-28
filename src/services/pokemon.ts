import { IPokemon, TBasePokemonWithResult } from '../types/pokemon.types';

const getAllPokemonsByUrls = (urls: string[]) =>
  Promise.all(
    urls.map(
      (url) =>
        fetch(url)
          .then((r) => r.json())
          .then((data: IPokemon) => ({ data, url }))
      // .catch((error: Error) => ({ error, url }))
    )
  );

export const getPokemons = async (url: string) => {
  try {
    const res = await fetch(url);
    const data = (await res.json()) as TBasePokemonWithResult;
    const pokemonUrls = data.results.map((p) => p.url);
    const allPokemonData = await getAllPokemonsByUrls(pokemonUrls);
    return {
      pokemons: allPokemonData,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (e) {
    return {
      error: 'Failed to get pokemons',
    };
  }
};
