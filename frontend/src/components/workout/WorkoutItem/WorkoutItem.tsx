import type { Categoria } from "../../../data/workout";
import style from "./WorkoutItem.module.css";

type Props = {
  categorias: Categoria[];
  onSelect: (categoria: Categoria) => void;
};

const WorkoutItem = ({ categorias, onSelect }: Props) => {
  return (
    <div className={style.Item}>
      {categorias.map((categoria) => (
        <div
          key={categoria.id}
          className={style.nameStyle}
          onClick={() => onSelect(categoria)}
        >
          {categoria.nombre}
        </div>
      ))}
    </div>
  );
};

export default WorkoutItem;