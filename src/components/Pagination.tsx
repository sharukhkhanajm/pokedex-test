import { useContext } from "react";

import { getPokemons } from "../services/pokemon";
import { IBasePokemon } from "../types/pokemon.types";
import { useStore } from "../zustand/pokemon.store";
import Button from "./Button";

function Pagination() {
  const {
    pageNumber,
    limit,
    count,
    previous,
    next,
    cache,
    updateStore,
    updatePokemons,
  } = useStore();

  const onPrevious = async () => {
    if (previous) {
      if (cache[previous]) {
        updateStore({
          ...cache[previous],
          pageNumber: pageNumber - 1,
        });
      } else {
        const pokemonsData = await getPokemons(previous);
        updateStore({
          ...pokemonsData,
          pageNumber: pageNumber - 1,
          cache: {
            ...cache,
            [previous]: pokemonsData,
          },
        });
      }
    }
  };
  const onNext = async () => {
    if (next) {
      if (cache[next]) {
        updateStore({
          ...cache[next],
          pageNumber: pageNumber + 1,
        });
      } else {
        const pokemonsData = await getPokemons(next);
        updateStore({
          ...pokemonsData,
          pageNumber: pageNumber + 1,
          cache: {
            ...cache,
            [next]: pokemonsData,
          },
        });
      }
    }
  };

  return (
    <nav
      className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{limit * (pageNumber - 1) || "1"}</span>{" "}
          to <span className="font-medium">{limit * pageNumber}</span> of{" "}
          <span className="font-medium">{count}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end space-x-4">
        <Button disabled={!previous} onClick={onPrevious}>
          Previous
        </Button>
        <Button disabled={!next} onClick={onNext}>
          Next
        </Button>
      </div>
    </nav>
  );
}

export default Pagination;
