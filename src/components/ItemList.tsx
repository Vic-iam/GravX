import style from "./Styles/ItemList.module.css";
import Item from "./Item";
import type { Categoria } from "../data/nutrition";

interface Props {
  categorias: Categoria[];
  search: string;
}

const ItemList = ({ categorias, search }: Props) => {
  return (
    <div className={style.containerNutrition}>
      {categorias.map((categoria) => {
        const itemsFiltrados = categoria.types.filter((item) =>
          item.nombre.toLowerCase().includes(search.toLowerCase())
        );

        if (itemsFiltrados.length === 0) return null;

        return (
          <div key={categoria.id}>
            <div className={style.titleAlimentancion}>
              <h3>{categoria.nombre}</h3>
            </div>

            <div className={style.styleNutricion}>
              {itemsFiltrados.map((item) => (
                <Item key={item.nombre} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
