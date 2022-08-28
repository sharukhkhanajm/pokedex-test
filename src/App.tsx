import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import Pokemon from "./components/Pokemon";
import { getPokemons } from "./services/pokemon";
import {
  IBasePokemon,
  TBasePokemonWithResult,
  IPokemon,
} from "./types/pokemon.types";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

interface IData {
  pokemons: {
    data: IPokemon;
    url: string;
  }[];
}

function App() {
  const [limit, setLimit] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<IData & IBasePokemon>({
    pokemons: [],
    count: 0,
    next: "",
    previous: "",
  });
  const cache = useRef<{
    [key: string]: IData & IBasePokemon;
  }>({});

  useEffect(() => {
    (async function () {
      const url = `${BASE_URL}?limit=${limit}`;
      const pokemonsData = await getPokemons(url);
      setData(pokemonsData);
      cache.current[url] = pokemonsData;
    })();
  }, [limit]);

  const onNext = async () => {
    if (data.next) {
      if (cache.current[data.next]) {
        setData(cache.current[data.next]);
      } else {
        const pokemonsData = await getPokemons(data.next);
        setData(pokemonsData);
        cache.current[data.next] = pokemonsData;
      }
    }
    setPageNumber((prev) => prev + 1);
  };

  const onPrevious = async () => {
    if (data.previous) {
      if (cache.current[data.previous]) {
        setData(cache.current[data.previous]);
      } else {
        const pokemonsData = await getPokemons(data.previous);
        setData(pokemonsData);
        cache.current[data.previous] = pokemonsData;
      }
    }
    setPageNumber((prev) => prev - 1);
  };

  // console.clear();
  console.log({ data, cache });

  return (
    <div className="min-h-full p-6 bg-white">
      {data.pokemons?.length ? (
        <>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {data.pokemons.map((pokemon) => {
              const { data, url } = pokemon;
              return <Pokemon key={data.id} url={url} pokemon={data} />;
            })}
          </ul>
          <div className="mt-8">
            <Pagination
              data={{
                count: data.count,
                next: data.next,
                previous: data.previous,
              }}
              onNext={onNext}
              onPrevious={onPrevious}
              limit={limit}
              pageNumber={pageNumber}
            />
          </div>
        </>
      ) : (
        "no pokemons found"
      )}
    </div>
  );
}

export default App;
