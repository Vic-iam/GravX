import type { Categoria } from "../data/workout";
import style from "./Style/ItemWorkoust.module.css"

type Props = {
  categorias: Categoria[];
  onSelect: (categoria: Categoria) => void;
};

const ItemWorkouts = ({ categorias, onSelect }: Props) => {
  return (
    <div className={style.Item}>
      {categorias.map((categoria) => (
        <h2
          key={categoria.id}
          onClick={() => onSelect(categoria)}
      
        >
          {categoria.nombre}
        </h2>
      ))}
    </div>
  );
};

export default ItemWorkouts;