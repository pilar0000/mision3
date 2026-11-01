export function PokemonCard({ pokemon }) {

  return (
    <article className="pokemon-card">

      <img
        src={pokemon.imagen}
        alt={pokemon.nombre}
      />

      <h2>{pokemon.nombre}</h2>

      <p>
        Tipo: {pokemon.tipos.join(", ")}
      </p>

    </article>
  );
}