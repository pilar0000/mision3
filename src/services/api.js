export async function obtenerPokemons(signal) {

  // Pedimos los primeros 40 Pokémon
  const respuesta = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=40",
    { signal }
  );


  // fetch no da error automáticamente con un 404 o 500
  if (!respuesta.ok) {
    throw new Error(
      `Error al cargar los Pokémon: ${respuesta.status}`
    );
  }


  const datos = await respuesta.json();


  // Pedimos los detalles de los 40 Pokémon
  const resultados = await Promise.allSettled(

    datos.results.map(async (pokemon) => {

      const respuestaDetalle = await fetch(
        pokemon.url,
        { signal }
      );


      if (!respuestaDetalle.ok) {
        throw new Error(
          `Error al cargar ${pokemon.name}`
        );
      }


      const detalle = await respuestaDetalle.json();


      return {
        id: detalle.id,

        nombre: detalle.name,

        imagen:
          detalle.sprites.front_default,

        tipos:
          detalle.types.map(
            (tipo) => tipo.type.name
          )
      };

    })

  );


  // Si React ha cancelado la petición,
  // no seguimos trabajando con los resultados
  if (signal?.aborted) {

    const error = new Error(
      "Petición cancelada"
    );

    error.name = "AbortError";

    throw error;
  }


  // Nos quedamos solo con los Pokémon
  // que se pudieron cargar correctamente
  const pokemons = resultados
    .filter(
      (resultado) =>
        resultado.status === "fulfilled"
    )
    .map(
      (resultado) =>
        resultado.value
    );


  // Si han fallado todos, sí mostramos error
  if (pokemons.length === 0) {
    throw new Error(
      "No se pudo cargar ningún Pokémon"
    );
  }


  return pokemons;
}