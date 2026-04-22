import { useEffect, useState } from "react";
import type { Categoria } from "../data/workout";
import { getProducts } from "../data/workout";
import ItemWorkouts from "./ItemWorkoust";
import ItemRutine from "./ItemRutine";
import style from "./Style/ItemWorkoustContainer.module.css";

export const ItemWorkoustContainer = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<Categoria | null>(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setCategorias(res);
        setCategoriaSeleccionada(res[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.workoutContainer}>
      <div className={style.hdf}>
        <h1>Elige la rutina</h1>
        <div className={style.linea}></div>
        <div className={style.indexWorkout}>
          <ItemWorkouts
            categorias={categorias}
            onSelect={setCategoriaSeleccionada}
          />
        </div>
      </div>

      <div className={style.rutineContainer}>
        <h2>Rutinas</h2>
        <div className={style.linea}></div>
        {categoriaSeleccionada && (
          <ItemRutine categoria={categoriaSeleccionada} />
        )}
      </div>
    </div>
  );
};
