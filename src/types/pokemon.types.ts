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

interface Ability {
  name: string;
  url: string;
}
interface Abilities {
  is_hidden: boolean;
  slot: number;
  ability: Ability;
}

interface Moves {
  move: {
    name: string;
    url: string;
  };
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
export interface IPokemon {
  name: string;
  id: number;
  sprites: Sprites;
  weight: number;
  height: number;
  abilities: Abilities[];
  moves: Moves[];
  stats: Stats[];
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
