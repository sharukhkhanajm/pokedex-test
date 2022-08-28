import create from 'zustand';
import { IPokemon } from '../types/pokemon.types';
import { getPokemons } from '../services/pokemon';
import { getBaseUrl } from '../utils';

interface Store {
  limit: number;
  pageNumber: number;
  pokemons: {
    data: IPokemon;
    url: string;
    error?: null;
  }[];
  count: number;
  next?: string;
  previous?: string;
  cache: {
    [key: string]: {
      data: IPokemon;
      url: string;
      next?: string;
      previous?: string;
    }[];
  };
  loading: boolean;

  // actions
  setInitialStates: () => void;
  updatePokemons: (
    p: {
      data: IPokemon;
      url: string;
    }[]
  ) => void;
  updateStore: (s: any) => void;
  getPokemonById: (id: number) =>
    | {
        data: IPokemon;
        url: string;
      }
    | undefined;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<Store>((set, get) => ({
  // states
  limit: 20,
  pageNumber: 1,
  pokemons: [],
  count: 0,
  next: '',
  previous: '',
  cache: {},
  loading: false,

  // actions
  updatePokemons: (pokemons) => {
    set((state) => ({
      ...state,
      pokemons,
    }));
  },
  updateStore: (states: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    set((state) => ({
      ...state,
      ...states,
    }));
  },
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  getPokemonById: (id: number) => {
    const { pokemons } = get();
    const pokemon = pokemons.find((p) => p.data.id === id);
    return pokemon;
  },
  setInitialStates: async () => {
    get().setLoading(true);
    try {
      const { limit } = get();
      const url = `${getBaseUrl()}?limit=${limit}`;
      const pokemonsData = await getPokemons(url);
      if (pokemonsData.error) {
        //
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        set((state) => ({
          ...state,
          ...pokemonsData,
          cache: {
            [url]: pokemonsData,
          },
        }));
      }
    } catch (e) {
      //
    } finally {
      get().setLoading(false);
    }
  },
}));
