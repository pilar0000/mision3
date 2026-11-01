import { PokemonCard } from "./PokemonCard";

export function PokemonList({ pokemons }) {

  return (
    <section id="pokemon-container">

      {pokemons.map((pokemon) => (

        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />

      ))}

    </section>
  );
}