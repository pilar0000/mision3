export async function obtenerPokemons() {

  const respuesta = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=40"
  );

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los Pokémon");
  }

  const datos = await respuesta.json();

  const pokemons = await Promise.all(
    datos.results.map(async (pokemon) => {

      const respuestaDetalle = await fetch(pokemon.url);

      if (!respuestaDetalle.ok) {
        throw new Error("Error al cargar un Pokémon");
      }

      const detalle = await respuestaDetalle.json();

      return {
        id: detalle.id,
        nombre: detalle.name,
        imagen: detalle.sprites.front_default,
        tipos: detalle.types.map(tipo => tipo.type.name)
      };
    })
  );

  return pokemons;
}