import {
  useEffect,
  useState
} from "react";

import { obtenerPokemons } from "../services/api.js";


const CLAVE_CACHE = "pokemons40";


// Comprueba que lo guardado en localStorage
// tenga una estructura válida
function cacheEsValida(datos) {

  return (
    Array.isArray(datos) &&
    datos.length > 0 &&
    datos.every((pokemon) =>
      typeof pokemon.id === "number" &&
      typeof pokemon.nombre === "string" &&
      Array.isArray(pokemon.tipos)
    )
  );
}


export function usePokemons() {

  const [pokemons, setPokemons] =
    useState([]);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState("");

  // Nos sirve para volver a ejecutar
  // la carga cuando pulsamos "Reintentar"
  const [recarga, setRecarga] =
    useState(0);


  useEffect(() => {

    // Permite cancelar las peticiones
    // si el componente se desmonta
    const controlador =
      new AbortController();


    async function cargarPokemons() {

      setCargando(true);
      setError("");


      try {

        // Primero miramos si tenemos caché
        const cache =
          localStorage.getItem(
            CLAVE_CACHE
          );


        if (cache) {

          try {

            const datosGuardados =
              JSON.parse(cache);


            // Si la caché es correcta,
            // usamos esos datos
            if (
              cacheEsValida(
                datosGuardados
              )
            ) {

              setPokemons(
                datosGuardados
              );

              return;
            }


            // Si existe pero no es válida,
            // la eliminamos
            localStorage.removeItem(
              CLAVE_CACHE
            );

          } catch {

            // Si el JSON está corrupto,
            // también borramos la caché
            localStorage.removeItem(
              CLAVE_CACHE
            );
          }
        }


        // Si no hay caché válida,
        // consultamos PokéAPI
        const datos =
          await obtenerPokemons(
            controlador.signal
          );


        setPokemons(datos);


        // Guardamos el resultado
        // para la próxima visita
        localStorage.setItem(
          CLAVE_CACHE,
          JSON.stringify(datos)
        );


      } catch (error) {

        // Una cancelación es normal,
        // no la mostramos como error
        if (
          error.name !== "AbortError"
        ) {

          console.error(
            "Error cargando Pokémon:",
            error
          );

          setError(
            "No se pudieron cargar los Pokémon."
          );
        }

      } finally {

        // Si la petición no fue cancelada,
        // terminamos el estado de carga
        if (
          !controlador.signal.aborted
        ) {

          setCargando(false);
        }
      }
    }


    cargarPokemons();


    // Cleanup del useEffect
    return () => {
      controlador.abort();
    };

  }, [recarga]);


  function reintentar() {

    // Borramos una posible caché problemática
    localStorage.removeItem(
      CLAVE_CACHE
    );

    // Cambiar este estado hace que
    // el useEffect vuelva a ejecutarse
    setRecarga(
      (valorAnterior) =>
        valorAnterior + 1
    );
  }


  return {
    pokemons,
    cargando,
    error,
    reintentar
  };
}