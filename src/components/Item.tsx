import style from "./Style/Item.module.css";
import type { AlimentoItem } from "../data/nutrition";
import ButtonItemNutrition from "./ButtonItemNutrition";

interface Props {
  item: AlimentoItem;
}

const Item = ({ item }: Props) => {
  return (
    <div className={style.alimentacionDescripcion}>
      <div className={style.desAlimentacion}>
        <h4>{item.nombre}</h4>
        <p>Calorías: {item.calorias} kcal x 100g</p>
        <p>Proteínas: {item.proteina} g x 100g</p>
        <div className={style.verDetalle}>

        <ButtonItemNutrition item={item} />
        </div>
      </div>

      <img src={item.imagen} alt={item.nombre} />
    </div>
  );
};

export default Item;
