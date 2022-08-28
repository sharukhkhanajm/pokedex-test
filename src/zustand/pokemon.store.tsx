import create from "zustand";
import produce from "immer";
import { IPokemon } from "../types/pokemon.types";
import { getPokemons } from "../services/pokemon";
import { getBaseUrl } from "../utils";

interface Store {
  limit: number;
  pageNumber: number;
  pokemons: {
    data: IPokemon;
    url: string;
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
  setInitialStates: Function;
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
  next: "",
  previous: "",
  cache: {},
  loading: false,

  // actions
  updatePokemons: (pokemons) => {
    set((state) => {
      return {
        ...state,
        pokemons,
      };
    });
  },
  updateStore: (states: any) => {
    set((state) => {
      return {
        ...state,
        ...states,
      };
    });
  },
  setLoading: (loading) => {
    set((state) => {
      return {
        ...state,
        loading,
      };
    });
  },
  getPokemonById: (id: number) => {
    const pokemons = get().pokemons;
    const pokemon = pokemons.find((pokemon) => pokemon.data.id === id);
    return pokemon;
  },
  setInitialStates: async () => {
    get().setLoading(true);
    try {
      const limit = get().limit;
      const url = `${getBaseUrl()}?limit=${limit}`;
      const pokemonsData = await getPokemons(url);
      if (pokemonsData.error) {
        //
      } else {
        set((state) => {
          return {
            ...state,
            ...pokemonsData,
            cache: {
              [url]: pokemonsData,
            },
          };
        });
      }
    } catch (e) {
    } finally {
      get().setLoading(false);
    }
  },
}));
