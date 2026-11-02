# 🌴 Pokédex Tropical — Misión 3 🌺

Aplicación desarrollada con React a partir de la Pokédex realizada en la Misión 2.

En esta nueva versión he reconstruido la aplicación utilizando componentes, props, estado, eventos y efectos de React. Además, he añadido algunas mejoras para hacer la aplicación más completa y resistente a errores. 

## Tecnologías utilizadas

- React
- JavaScript
- Vite
- CSS
- PokéAPI
- LocalStorage

## Instalación

Para ejecutar el proyecto en local:

```text
    npm install
    npm run dev
```

Después se puede abrir en el navegador la dirección que indique Vite.

## Funcionalidades

La aplicación permite:

- Cargar los primeros 40 Pokémon desde PokéAPI.
- Mostrar el nombre, la imagen y tipo de cada Pokémon.
- Buscar Pokémon por nombre.
- Buscar sin importar mayúsculas o minúsculas.
- Ignorar espacios al principio y al final de la búsqueda.
- Filtrar los Pokémon por tipo.
- Ordenarlos por:
    · Número de Pokédex.
    · Nombre de A-Z.
    · Nombre de Z-A.
- Combinar búsqueda, tipo y orden.
- Mostrar el número de Pokémon encontrados.
- Mostrar un mensaje cuando no existe nungún resultado.
- Mostrar un estado de carga mientras llegan los datos.
- Mostrar un mensaje de error si falla la API.
- Permitir volver a intentar la carga mediante un botón.
- Utilizar una imagen alternativa si un Pokémon no tiene imagen.
- Guardar los Pokémon en `localStorage` para evitar peticiones innecesarias.

## Componentes

La interfaz se ha dividido en varios componentes para que cada uno tenga una responsabilidad concreta.

`App.jsx`

Es el componente principal. Se encarga de:

- Guardar el texto del buscador.
- Guardar el tipo seleccionado.
- Guardar la opción de orden.
- Obtener los Pokémon mediante el hook usePokemons.
- Calcular los Pokémon que deben mostrarse.
- Coordinar el resto de componentes.

`Buscador.jsx`

Contiene el campo de búsqueda. Recibe mediante props:

- El texto actual.
- La función que permite modificarlo.
- Si el buscador debe estar deshabilitado.

`Filtros.jsx`

Contiene:

- El selector de tipos.
- El selector de orden.

Recibe mediante props los valores actuales y la funciones necesarias para cambiarlos.

`PokemonList.jsx`

Recibe un array de Pokémon y crea una tarjeta para cada uno utilizando .map().

Cada elemento utiliza una key estable: 

```text
key={pokemon.id}
```

`PokemonCard.jsx`

Representa un único Pokémon. Muestra:

- Imagen.
- Nombre.
- Tipo o tipos.

## Hook personalizado

Se ha creado:

```text
src/hooks/usePokemons.js
```

El hook usePokemons contiene toda la lógica relacionada con la carga de Pokémon. Se encarga de:

- Estado de los Pokémon.
- Estado de carga.
- Estado de error.
- Lectura de localStorage.
- Validación básica de la caché.
- Eliminación de una caché incorrecta.
- Consulta a PokéAPI.
- Guardado de los datos en caché.
- Cancelación de peticiones.
- Reintento de la carga.

Esto permite que `App.jsx` sea más sencillo y que cada parte del proyecto tenga una responsabilidad clara.

## Peticiones a PokéAPI

Las peticiones están separadas de los componentes dentro de: 

```text
src/services/api.js
```

La función principal es:

```text
obtenerPokemons()
```

Primero se obtienen los primeros Pokémon y después se solicitan sus detalles. También se comprueba:

```text
respuesta.ok
```
Porque `fetch` no considera automáticamente como error una respuesta HTTP como 404 o 500.

## Control de errores

Se han añadido varias mejoras respecto a la versión anterior.

#### Fallos individuales

Para solicitar los detalles de los Pokémon se utiliza:

```text
Promise.allSettled()
```

De esta forma, si falla la petición de un Pokémon concreto, los Pokémon que se hayan cargado correctamente todavía pueden mostrarse.

Si fallan todos, entonces sí se muestra un error general.

#### Caché incorrecta

Antes de utilizar los datos guardados en localStorage, se comprueba que tengan una estructura válida.

Si el JSON está corrupto o la información no es válida, se elimina la caché y se vuelve a consultar la API.

#### Cancelación de peticiones

Se utiliza `AbortController` para cancelar las peticiones si el componente deja de utilizarse.

## Estado mínimo y datos derivados

Se ha intentado evitar crear estados innecesarios.

Por ejemplo, no existe un estado llamado:

```text
pokemonsFiltrados
```

La lista se calcula directamente a partir de:

- Los Pokémon originales.
- El buscador.
- El tipo seleccionado.
- El orden seleccionado.

Ejemplo:

```text
const pokemonsFiltrados = pokemons.filter(...);
```

Esto evita tener información duplicada en diferentes estados.

## Ordenación sin modificar el estado

Antes de utilizar `.sort()` se crea una copia del array:

```text
const pokemonsOrdenados = {...pokemonsFiltrados};
```

Después se ordena esa copia.

Así evitamos modificar directamente el array original.

## Estructura principal

src/
|
| - components/
|   | - Buscador.jsx
|   | - Filtros.jsx
|   | - PokemonCard.jsx
|   | - PokemonList.jsx
|
| - hooks/
|   | - usePokemons.js
|
| - services/
|   | - api.js
|
| - App.jsx
| - main.jsx
| - style.css

## Uso de Inteligencia Artificial

Durante el desarrollo se ha utilizado ChatGPT homo herramienta de apoyo. Se ha utilizado principalmente para:

- Resolver dudas sobre React.
- Entender useState, useEffect y props.
- Organizar la aplicación en componentes.
- Revisar errores durante el desarrollo.
- Proponer mejoras a partir del feedback de la Misión 2.
- Ayudar a estructurar el custom hook.
- Revisar el código y el README

Ejemplos de preguntas realizadas:

```text
Cómo puedo convertir mi Pokédex de JS en componentes de React?
```

```text
Cómo puedo evitar guardar los Pokémon filtrados en otro useState?
```

```text
Cómo puedo crear un custom hook sencillo para cargar los Pokémon?
```

```Cómo puedo evitar que falle toda la Pokédex si una petición individual da error?
```

## Autopsia del proyecto

#### Decisión 1 - No guardar los Pokémon filtrados en estado

Una posibilidad era crear:

```text
const [pokemonsFiltrados, setPokemonsFiltrados] = useState([]);
```

Y actualizarlo cada vez que cambiara el buscador o los filtros. Finalmente se decidió no hacerlo. 

Los Pokémon filtrados pueden calcularse directamente a partir de los Pokémon originales y de los filtros seleccionados:

```text
const pokemonsFiltrados = pokemons.filter(...);
```

Porque guardar el mismo tipo de información en varios estados puede provocar que se desincronicen. Con esta solución existe una sola fuente de datos y el código es más sencillo.

#### Decisión 2 - Extraer la carga de datos a un custom hook

Al principio, App.jsx contenía:

- Los Pokémon.
- La carga.
- Los errores.
- El useEffect.
- La caché.
- La petición a la API.
- Los filtros.
- La interfaz.

Funcionaba, pero el componente tenía demasiadas responsabilidades, así que se decidió crear:

```text
usePokemons.js
```

Ahora App se centra principalmente en coordinar la interfaz y los filtros, mientras que el hook se ocupa de cargar los datos.

Resulta más fácil entender qué hace cada archivo y la lógica de carga queda separada de la interfaz.

#### Decisión 3 - Promise.allSettled() en lugar de Promise.all()

En la versión anterior se utilizaba Promise.all().

El problema es que si una sola petición falla, toda la operación puede fallar. En esta versión se ha utilizado:

```text
Promise.allSettled()
```

Esto permite conservar los Pokémon que sí se han podido cargar. Se considera una mejora porque un fallo aislado no impide utilizar toda la aplicación.

## Resultado final

La Misión 3 transforma la Pokédex de la misión anterior en una aplicación React organizada por componentes.

Además de mantener las funcionalidades principales de la M2, se han incorporado mejoras como filtros, ordenación, caché más robusta, reintento de errores y un hook personalizado.

El objetivo principal ha sido aplicar los conceptos de React de forma sencilla evitando añadir complejidad innecesaria.