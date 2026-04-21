import { useEffect, useState } from "react";
import type { Categoria } from "../data/workout";
import { getProducts } from "../data/workout";
import ItemWorkouts from "./ItemWorkoust";
import style from "./Style/ItemWorkoustContainer.module.css";

export const ItemWorkoustContainer = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => setCategorias(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.workoutContainer}>
      <h1>Elige la rutina</h1>
      <ItemWorkouts categorias={categorias} />
    </div>
  );
};
