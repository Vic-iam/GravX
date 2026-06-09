import style from "./NutritionItem.module.css";
import type { AlimentoItem } from "../../../data/nutrition";
import ButtonNutrition from "../ButtonNutrition/ButtonNutrition";

interface Props {
  item: AlimentoItem;
}

const NutritionItem = ({ item }: Props) => {
  return (

    <div className={style.alimentacionDescripcion}>
      <div className={style.desAlimentacion}>
        <h1>{item.nombre}</h1>
        <p>Calorías: {item.calorias} kcal x 100g</p>
        <p>Proteínas: {item.proteina} g x 100g</p>
        <div className={style.verDetalle}>
        <ButtonNutrition item={item} />
        </div>
      </div>
      
      <div className={style.itemImage}>
      <img src={item.imagen} alt={item.nombre} />

      </div>
    </div>

  );
};

export default NutritionItem;
