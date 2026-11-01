import { useEffect, useState } from "react";
import { obtenerPokemons } from "./services/api.js";
import { PokemonList } from "./components/PokemonList";
import { Buscador } from "./components/Buscador";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {

    async function cargarPokemons() {

      try {

        const datos = await obtenerPokemons();

        setPokemons(datos);

      } catch (error) {

        setError("No se pudieron cargar los Pokémon");

      } finally {

        setCargando(false);

      }

    }

    cargarPokemons();

  }, []);

  return (
    <main>

      <h1>🌴 Pokédex Tropical 🌺</h1>

      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      {cargando && <p>Cargando Pokémon...</p>}

      {error && <p>{error}</p>}

      {!cargando && !error && (
        <PokemonList pokemons={pokemonsFiltrados} />
      )}

    </main>
  );
}

export default App;