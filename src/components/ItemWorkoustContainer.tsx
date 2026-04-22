import { useEffect, useState } from "react";
import type { Categoria } from "../data/workout";
import { getProducts } from "../data/workout";
import ItemWorkouts from "./ItemWorkoust";
import ItemRutine from "./ItemRutine";
import style from "./Style/ItemWorkoustContainer.module.css";

export const ItemWorkoustContainer = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

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
      <div className={style.indexWorkout}>
        <h1>Elige la rutina</h1>
        <div className={style.linea}></div>

        <ItemWorkouts
          categorias={categorias}
          onSelect={setCategoriaSeleccionada}
        />
      </div>

      <div>
        {categoriaSeleccionada && (
          <ItemRutine categoria={categoriaSeleccionada} />
        )}
      </div>
    </div>
  );
};
