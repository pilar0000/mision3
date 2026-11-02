export async function obtenerPokemons() {

  // Pedimos los primeros 40 Pokémon
  const respuesta = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=40"
  );


  // Comprobamos que la petición haya salido bien
  if (!respuesta.ok) {

    throw new Error(
      "No se pudieron cargar los Pokémon"
    );

  }


  // Convertimos la respuesta a JSON
  const datos = await respuesta.json();


  // Pedimos los detalles de cada Pokémon
  const pokemons = await Promise.all(

    datos.results.map(async (pokemon) => {

      const respuestaDetalle = await fetch(
        pokemon.url
      );


      if (!respuestaDetalle.ok) {

        throw new Error(
          "Error al cargar un Pokémon"
        );

      }


      const detalle =
        await respuestaDetalle.json();


      // Devolvemos solo los datos necesarios
      return {

        id: detalle.id,

        nombre: detalle.name,

        imagen:
          detalle.sprites.front_default,

        tipos: detalle.types.map(
          (tipo) => tipo.type.name
        )

      };

    })

  );


  return pokemons;
}