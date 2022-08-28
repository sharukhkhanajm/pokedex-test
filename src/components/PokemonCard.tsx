import { IPokemon } from '../types/pokemon.types';

type Props = {
  pokemon: IPokemon;
};

function PokemonCard({ pokemon }: Props) {
  const { id, name, sprites } = pokemon;
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 cursor-pointer duration-200 transition-all hover:scale-105 hover:shadow-md">
      <div className="flex-1 flex flex-col p-8 bg-gray-100">
        <img className="w-48 h-48 flex-shrink-0 mx-auto" src={sprites.front_default} alt="" />
      </div>
      <div className="py-2 space-y-2">
        <h2 className="capitalize font-bold text-2xl">{name}</h2>
        <h3>#{id}</h3>
      </div>
    </li>
  );
}

export default PokemonCard;
