import type { Categoria } from "../../../data/workout";
import style from "./WorkoutItem.module.css";

type Props = {
  categorias: Categoria[];
  selectedId?: number;
  onSelect: (categoria: Categoria) => void;
};

const WorkoutItem = ({ categorias, selectedId, onSelect }: Props) => {
  return (
    <div className={style.Item}>
      {categorias.map((categoria) => (
        <button
          type="button"
          key={categoria.id}
          className={`${style.nameStyle} ${
            categoria.id === selectedId ? style.selected : ""
          }`}
          aria-pressed={categoria.id === selectedId}
          onClick={() => onSelect(categoria)}
        >
          {categoria.nombre}
        </button>
      ))}
    </div>
  );
};

export default WorkoutItem;