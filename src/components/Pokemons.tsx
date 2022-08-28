import { useContext, useEffect } from "react";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";
import { useStore } from "../zustand/pokemon.store";
import SearchPokemon from "./SearchPokemon";
import CardsSkeleton from "./CardsSkeleton";

function Pokemons() {
  const { pokemons, setInitialStates, next, previous, count, limit, loading } =
    useStore();

  useEffect(() => {
    if (pokemons.length <= 0) {
      setInitialStates();
    }
  }, []);

  console.log(useStore());

  return (
    <>
      <SearchPokemon />

      {loading ? <CardsSkeleton /> : null}

      {pokemons?.length && !loading ? (
        <>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {pokemons.map((pokemon) => {
              const { data, url } = pokemon;
              return (
                <Link to={`/pokemon/${data.id}`} key={data.id}>
                  <PokemonCard url={url} pokemon={data} />{" "}
                </Link>
              );
            })}
          </ul>
          {count > limit ? (
            <div className="mt-8">
              <Pagination />
            </div>
          ) : null}
        </>
      ) : loading ? null : (
        "no pokemons found"
      )}
    </>
  );
}

export default Pokemons;
