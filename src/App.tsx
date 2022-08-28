import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";
import {
  IBasePokemon,
  TBasePokemonWithResult,
  IPokemon,
} from "./types/pokemon.types";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=2";

interface IPokemonData {
  pokemons: {
    data?: IPokemon;
    url: string;
    error?: Error;
  };
}

function App() {
  // console.clear();
  const [data, setData] = useState<
    {
      pokemons: {
        data: IPokemon;
        url: string;
      }[];
    } & IBasePokemon
  >({
    pokemons: [],
    count: 0,
    next: "",
    previous: "",
  });

  useEffect(() => {
    const getPokemons = async () => {
      const basePokemonsRes = await fetch(BASE_URL);
      const basePokemonsData =
        (await basePokemonsRes.json()) as TBasePokemonWithResult;
      const pokemonUrls = basePokemonsData.results.map((p) => p.url);
      const allPokemonData = await getAllPokemons(pokemonUrls);
      setData({
        pokemons: allPokemonData,
        count: basePokemonsData.count,
        next: basePokemonsData.next,
        previous: basePokemonsData.previous,
      });
    };
    getPokemons();
  }, []);

  function getAllPokemons(urls: string[]) {
    return Promise.all(
      urls.map(
        (url) =>
          fetch(url)
            .then((r) => r.json())
            .then((data: IPokemon) => ({ data, url }))
        // .catch((error: Error) => ({ error, url }))
      )
    );
  }

  console.log({ data });

  return (
    <div className="min-h-full p-6 bg-white">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {data.pokemons.length ? (
          <>
            {data.pokemons.map((pokemon) => {
              const { data, url } = pokemon;

              return <Pokemon key={data.id} url={url} pokemon={data} />;
            })}
          </>
        ) : (
          "no pokemons found"
        )}
        {/* {pokemons ? (
          <>
            {pokemons.pokemonsData.map((pokemon) => {
              const { url, data } = pokemon;
              console.log(pokemon);
              return <>hi</>;
            })}
          </>
        ) : (
          "no pokemons found"
        )} */}
        {/* {pokemons?.results.length ? (
          <>
            {pokemons.results.map(({ name, url }) => {
              return <Pokemon name={name} url={url} key={name} />;
            })}
          </>
        ) : (
          "no pokemons found"
        )} */}
      </ul>
    </div>
  );
}

export default App;
