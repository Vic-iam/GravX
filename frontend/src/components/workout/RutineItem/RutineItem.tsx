import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import type { Categoria } from "../../../data/workout";
import { addExerciseToRoutine } from "../../../utils/routineStorage";
import style from "./RutineItem.module.css";

type Props = {
  categoria: Categoria;
  nivel: "principiante" | "intermedio" | "profesional";
};

const RutineItem = ({ categoria, nivel }: Props) => {
  const ejercicios = categoria.types[nivel];
  const { user } = useAuth0();

  const handleAdd = (nombre: string) => {
    if (addExerciseToRoutine(categoria.nombre, nombre, user?.sub)) {
      toast.success(`"${nombre}" agregado a Mi Rutina`);
    } else {
      toast.error("Ese ejercicio ya está en tu rutina");
    }
  };

  return (
    <div className={style.ItemR}>
      {ejercicios.map((item) => (
        <div key={item.id} className={style.ItemRInformation}>
          <h4>{item.nombre}</h4>
          <p>{item.duracion} min</p>
          <p>{item.meta}</p>

          <div className={style.ItemRImage}>
            {item.imagen ? (
              <img src={item.imagen} alt={item.nombre} />
            ) : (
              <div role="img" aria-label={item.nombre} style={{ fontSize: "4rem", textAlign: "center" }}>
                🏋️
              </div>
            )}
          </div>

          <button
            type="button"
            className={style.addBtn}
            onClick={() => handleAdd(item.nombre)}
          >
            + Agregar a mi rutina
          </button>
        </div>
      ))}
    </div>
  );
};

export default RutineItem;
