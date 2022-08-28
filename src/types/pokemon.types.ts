interface Sprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
}

export interface IPokemon {
  name: string;
  id: number;
  sprites: Sprites;
}

export interface IBasePokemon {
  count: number;
  next?: string;
  previous?: string;
}

export type TBasePokemonWithResult = IBasePokemon & {
  results: [
    {
      name: string;
      url: string;
    }
  ];
};
