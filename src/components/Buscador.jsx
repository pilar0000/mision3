export function Buscador({ busqueda, setBusqueda }) {

  return (
    <input
      type="text"
      value={busqueda}
      onChange={(evento) => setBusqueda(evento.target.value)}
      placeholder="Buscar Pokémon..."
    />
  );
}