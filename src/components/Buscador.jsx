export function Buscador({
  busqueda,
  setBusqueda,
  deshabilitado = false
}) {

  return (
    <input
      type="text"
      id="buscador"
      value={busqueda}
      onChange={(evento) =>
        setBusqueda(
          evento.target.value
        )
      }
      placeholder="Buscar Pokémon..."
      disabled={deshabilitado}
    />
  );
}