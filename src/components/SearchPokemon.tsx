import { useMemo } from "react";
import { getBaseUrl } from "../utils";
import { useStore } from "../zustand/pokemon.store";

const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

function SearchPokemon() {
  const { updateStore, setInitialStates } = useStore();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { value } = e.target;
      if (!value) {
        setInitialStates();
        return;
      }
      const url = `${getBaseUrl()}/${value}`;
      const res = await fetch(url);
      const data = await res.json();
      updateStore({
        pokemons: [
          {
            data,
            url,
          },
        ],
        count: 1,
        previous: "",
        next: "",
        pageNumber: 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedFunc = useMemo(() => {
    return debounce(onChange, 500);
  }, [onChange]);

  return (
    <div className="mx-24 my-10">
      <label htmlFor="search-pokemon" className="sr-only">
        Search Pokemon
      </label>
      <input
        onChange={debouncedFunc}
        type="text"
        name="search-pokemon"
        id="search-pokemon"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Search Pokemon Here..."
      />
    </div>
  );
}

export default SearchPokemon;
