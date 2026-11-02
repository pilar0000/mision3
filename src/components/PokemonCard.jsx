export function PokemonCard({
  pokemon
}) {

  return (
    <article className="pokemon-card">

      {pokemon.imagen ? (

        <img
          src={pokemon.imagen}
          alt={`Imagen de ${pokemon.nombre}`}
        />

      ) : (

        <div
          className="sin-imagen"
          aria-label={
            `Sin imagen de ${pokemon.nombre}`
          }
        >
          ❓
        </div>

      )}


      <h2>
        {pokemon.nombre}
      </h2>


      <p>
        Tipo:{" "}
        {pokemon.tipos.join(", ")}
      </p>

    </article>
  );
}