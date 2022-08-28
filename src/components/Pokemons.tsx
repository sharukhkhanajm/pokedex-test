import { useEffect, useRef, useState } from "react";
import { getPokemons } from "../services/pokemon";
import { IBasePokemon, IPokemon } from "../types/pokemon.types";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";

interface IData {
  pokemons: {
    data: IPokemon;
    url: string;
  }[];
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

function Pokemons() {
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

  return (
    <>
      {data.pokemons?.length ? (
        <>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {data.pokemons.map((pokemon) => {
              const { data, url } = pokemon;
              return (
                <Link to={`/pokemon/${data.id}`} key={data.id}>
                  <PokemonCard url={url} pokemon={data} />{" "}
                </Link>
              );
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
    </>
  );
}

export default Pokemons;
