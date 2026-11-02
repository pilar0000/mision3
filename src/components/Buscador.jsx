export function Buscador({ busqueda, setBusqueda }) {

  return (
    <input
      type="text"
      id="buscador"
      value={busqueda}
      onChange={(evento) => setBusqueda(evento.target.value)}
      placeholder="Buscar Pokémon..."
    />
  );
}