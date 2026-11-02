import { useState } from "react";

import { usePokemons } from "./hooks/usePokemons.js";

import { Buscador } from "./components/Buscador.jsx";

import { PokemonList } from "./components/PokemonList.jsx";


function App() {

  const [busqueda, setBusqueda] =
    useState("");


  const {
    pokemons,
    cargando,
    error,
    reintentar
  } = usePokemons();


  // Quitamos espacios al principio y al final
  // y pasamos el texto a minúsculas
  const textoBusqueda =
    busqueda
      .trim()
      .toLowerCase();


  // No usamos otro useState.
  // Esta lista se deriva de los Pokémon
  // y del texto del buscador.
  const pokemonsFiltrados =
    pokemons.filter(
      (pokemon) =>
        pokemon.nombre
          .toLowerCase()
          .includes(
            textoBusqueda
          )
    );


  return (
    <main>

      <h1>
        🌴 Pokédex Tropical 🌺
      </h1>


      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        deshabilitado={
          cargando || Boolean(error)
        }
      />


      {cargando && (
        <p className="estado">
          ⏳ Cargando Pokémon...
        </p>
      )}


      {error && (
        <section className="mensaje-error">

          <p className="error">
            ⚠️ {error}
          </p>

          <button
            className="boton-reintentar"
            onClick={reintentar}
          >
            🔄 Reintentar
          </button>

        </section>
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

          <PokemonList
            pokemons={
              pokemonsFiltrados
            }
          />

        )}

    </main>
  );
}


export default App;