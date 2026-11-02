export function Filtros({
  tipos,
  tipoSeleccionado,
  setTipoSeleccionado,
  orden,
  setOrden
}) {

  return (
    <section className="filtros">

      <div className="grupo-filtro">

        <label htmlFor="tipo">
          Tipo:
        </label>

        <select
          id="tipo"
          value={tipoSeleccionado}
          onChange={(evento) =>
            setTipoSeleccionado(
              evento.target.value
            )
          }
        >

          <option value="todos">
            Todos
          </option>

          {tipos.map((tipo) => (
            <option
              key={tipo}
              value={tipo}
            >
              {tipo}
            </option>
          ))}

        </select>

      </div>


      <div className="grupo-filtro">

        <label htmlFor="orden">
          Orden:
        </label>

        <select
          id="orden"
          value={orden}
          onChange={(evento) =>
            setOrden(
              evento.target.value
            )
          }
        >

          <option value="original">
            Número Pokédex
          </option>

          <option value="az">
            Nombre A-Z
          </option>

          <option value="za">
            Nombre Z-A
          </option>

        </select>

      </div>

    </section>
  );
}