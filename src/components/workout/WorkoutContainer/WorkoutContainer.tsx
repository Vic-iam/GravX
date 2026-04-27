import { useEffect, useState } from "react";
import type { Categoria } from "../../../data/workout";
import { getProducts } from "../../../data/workout";
import WorkoutItem from "../WorkoutItem/WorkoutItem";
import RutineItem from "../RutineItem/RutineItem";
import style from "./WorkoutContainer.module.css";

export const ItemWorkoustContainer = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<Categoria | null>(null);

  const [nivelSeleccionado, setNivelSeleccionado] = useState<
    "principiante" | "intermedio" | "profesional"
  >("principiante");

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
        <div className={style.indexWorkout}>
          <WorkoutItem
            categorias={categorias}
            onSelect={setCategoriaSeleccionada}
          />
        </div>
      </div>

      <div className={style.rutineContainer}>

        <h2>Rutinas</h2>

      <div className={style.boxRutine}>

        <div className={style.levelTabs}>
          <button
            className={`${style.levelButton} ${
              nivelSeleccionado === "principiante" ? style.active : ""
            }`}
            onClick={() => setNivelSeleccionado("principiante")}
            >
            Principiante
          </button>

          <button
            className={`${style.levelButton} ${
              nivelSeleccionado === "intermedio" ? style.active : ""
            }`}
            onClick={() => setNivelSeleccionado("intermedio")}
            >
            Intermedio
          </button>

          <button
            className={`${style.levelButton} ${
              nivelSeleccionado === "profesional" ? style.active : ""
            }`}
            onClick={() => setNivelSeleccionado("profesional")}
            >
            Profesional
          </button>
        </div>

        <div className={style.rutineList}>
          {categoriaSeleccionada && (
            <RutineItem
            categoria={categoriaSeleccionada}
            nivel={nivelSeleccionado}
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};
