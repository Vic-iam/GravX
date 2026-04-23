import style from "./NutritionListItem.module.css";
import NutritionItem from "../NutritionItem/NutritionItem";
import type { Categoria } from "../../../data/nutrition";

interface Props {
  categorias: Categoria[];

}

const NutritionListItem = ({ categorias }: Props) => {
  return (
    <div className={style.containerNutrition}>
      {categorias.map((categoria) => {

        return (
          <div key={categoria.id}>
            <div className={style.titleAlimentancion}>
              <h1>{categoria.nombre}</h1>
            </div>

            <div className={style.styleNutricion}>
              {categoria.types.map((item) => (
                <NutritionItem key={item.nombre} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NutritionListItem;
