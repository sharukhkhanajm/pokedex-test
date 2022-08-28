import { useCallback, useMemo, useState } from 'react';
import { getBaseUrl } from '../utils';
import { useStore } from '../zustand/pokemon.store';
import { IPokemon } from '../types/pokemon.types';

// debounce the request on frequent type
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(func: F, waitFor: number) => {
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

function SearchPokemon() {
  const { updateStore, setInitialStates, setLoading, search, setSearch } = useStore();
  const [error, setError] = useState('');

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      try {
        const { value } = e.target;
        setSearch(value);
        // reset the states on input empty
        if (!value) {
          setInitialStates();
          return;
        }
        setLoading(true);
        const url = `${getBaseUrl()}/${value.trim().toLowerCase()}`;
        const res = await fetch(url);
        const data = (await res.json()) as IPokemon;
        setError('');
        updateStore({
          pokemons: [
            {
              data,
              url,
            },
          ],
          count: 1,
          previous: '',
          next: '',
          pageNumber: 1,
        });
      } catch (err) {
        setError('Please check the Pokemon name');
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [setInitialStates, setLoading, setSearch, updateStore]
  );

  const debouncedFunc = useMemo(() => debounce(onChange, 500), [onChange]);

  return (
    <div className="lg:mx-24 my-10">
      <p className="text-red-400 mb-4 font-semibold">{error}</p>
      <label htmlFor="search-pokemon" className="sr-only">
        Search Pokemon
      </label>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
          debouncedFunc(e);
        }}
        type="text"
        name="search-pokemon"
        id="search-pokemon"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Search Pokemon Here..."
        value={search}
      />
    </div>
  );
}

export default SearchPokemon;
