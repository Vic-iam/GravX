import style from "./Style/ItemList.module.css";
import Item from "./Item";
import type { Categoria } from "../data/nutrition";

interface Props {
  categorias: Categoria[];

}

const ItemList = ({ categorias }: Props) => {
  return (
    <div className={style.containerNutrition}>
      {categorias.map((categoria) => {

        return (
          <div key={categoria.id}>
            <div className={style.titleAlimentancion}>
              <h3>{categoria.nombre}</h3>
            </div>

            <div className={style.styleNutricion}>
              {categoria.types.map((item) => (
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
