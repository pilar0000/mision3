import { useState } from "react";

import { usePokemons } from "./hooks/usePokemons.js";

import { Buscador } from "./components/Buscador.jsx";

import { Filtros } from "./components/Filtros.jsx";

import { PokemonList } from "./components/PokemonList.jsx";


function App() {

  // Texto escrito en el buscador
  const [busqueda, setBusqueda] =
    useState("");


  // Tipo elegido por el usuario
  const [
    tipoSeleccionado,
    setTipoSeleccionado
  ] = useState("todos");


  // Forma de ordenar la lista
  const [orden, setOrden] =
    useState("original");


  // El custom hook se ocupa
  // de cargar los Pokémon
  const {
    pokemons,
    cargando,
    error,
    reintentar
  } = usePokemons();


  // Quitamos espacios y pasamos
  // el texto a minúsculas
  const textoBusqueda =
    busqueda
      .trim()
      .toLowerCase();


  // Sacamos todos los tipos disponibles.
  // Set evita que haya tipos repetidos.
  const tiposDisponibles = [
    ...new Set(
      pokemons.flatMap(
        (pokemon) =>
          pokemon.tipos
      )
    )
  ].sort();


  // Filtramos por nombre y tipo.
  // No necesitamos otro useState.
  const pokemonsFiltrados =
    pokemons.filter((pokemon) => {

      const coincideNombre =
        pokemon.nombre
          .toLowerCase()
          .includes(
            textoBusqueda
          );


      const coincideTipo =
        tipoSeleccionado === "todos" ||
        pokemon.tipos.includes(
          tipoSeleccionado
        );


      return (
        coincideNombre &&
        coincideTipo
      );

    });


  // Creamos una copia antes de ordenar
  // para no modificar el array original.
  const pokemonsOrdenados =
    [...pokemonsFiltrados];


  if (orden === "az") {

    pokemonsOrdenados.sort(
      (a, b) =>
        a.nombre.localeCompare(
          b.nombre
        )
    );

  }


  if (orden === "za") {

    pokemonsOrdenados.sort(
      (a, b) =>
        b.nombre.localeCompare(
          a.nombre
        )
    );

  }


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


      {!cargando && !error && (

        <Filtros
          tipos={tiposDisponibles}
          tipoSeleccionado={
            tipoSeleccionado
          }
          setTipoSeleccionado={
            setTipoSeleccionado
          }
          orden={orden}
          setOrden={setOrden}
        />

      )}


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
        !error && (

          <p className="contador-resultados">

            Mostrando{" "}
            {pokemonsOrdenados.length}
            {" "}
            Pokémon

          </p>

        )}


      {!cargando &&
        !error &&
        pokemonsOrdenados.length === 0 && (

          <p className="estado">

            No se encontraron Pokémon 😢

          </p>

        )}


      {!cargando &&
        !error &&
        pokemonsOrdenados.length > 0 && (

          <PokemonList
            pokemons={
              pokemonsOrdenados
            }
          />

        )}

    </main>
  );
}


export default App;