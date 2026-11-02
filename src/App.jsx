import { useEffect, useState } from "react";

import { obtenerPokemons } from "./services/api.js";
import { PokemonList } from "./components/PokemonList.jsx";
import { Buscador } from "./components/Buscador.jsx";

function App() {

  // Estado donde guardamos los Pokémon
  const [pokemons, setPokemons] = useState([]);

  // Estado del buscador
  const [busqueda, setBusqueda] = useState("");

  // Estado de carga
  const [cargando, setCargando] = useState(true);

  // Estado de error
  const [error, setError] = useState("");


  // Cargar los Pokémon cuando se abre la aplicación
  useEffect(() => {

    async function cargarPokemons() {

      try {

        const datos = await obtenerPokemons();

        setPokemons(datos);

      } catch (error) {

        setError("No se pudieron cargar los Pokémon.");

      } finally {

        setCargando(false);

      }

    }

    cargarPokemons();

  }, []);


  // Pokémon filtrados según lo que escriba el usuario
  const pokemonsFiltrados = pokemons.filter((pokemon) =>
    pokemon.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );


  return (
    <main>

      <h1>🌴 Pokédex Tropical 🌺</h1>

      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />


      {cargando && (
        <p className="estado">
          Cargando Pokémon...
        </p>
      )}


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {!cargando &&
        !error &&
        pokemonsFiltrados.length === 0 && (
          <p className="estado">
            No se encontraron Pokémon 😢
          </p>
        )}


      {!cargando &&
        !error &&
        pokemonsFiltrados.length > 0 && (
          <PokemonList pokemons={pokemonsFiltrados} />
        )}

    </main>
  );
}

export default App;