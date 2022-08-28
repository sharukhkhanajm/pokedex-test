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
  getPokemonById: (id: number) => {
    const pokemons = get().pokemons;
    const pokemon = pokemons.find((pokemon) => pokemon.data.id === id);
    return pokemon;
  },
  setInitialStates: async () => {
    const limit = get().limit;
    const url = `${getBaseUrl()}?limit=${limit}`;
    const pokemonsData = await getPokemons(url);
    set((state) => {
      return {
        ...state,
        ...pokemonsData,
        cache: {
          [url]: pokemonsData.pokemons,
        },
      };
    });
  },
}));
