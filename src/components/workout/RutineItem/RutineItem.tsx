import type { Categoria } from "../../../data/workout";
import style from "./RutineItem.module.css";

type Props = {
  categoria: Categoria;
  nivel: "principiante" | "intermedio" | "profesional";
};

const RutineItem = ({ categoria, nivel }: Props) => {
  const ejercicios = categoria.types[nivel];

  return (
    <div className={style.ItemR}>
      {ejercicios.map((item) => (
        <div key={item.id} className={style.ItemRInformation}>
          <h4>{item.nombre}</h4>
          <p>{item.duracion} min</p>
          <p>{item.meta}</p>

          <div className={style.ItemRImage}>
            <img src={item.imagen} alt={item.nombre} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RutineItem;
