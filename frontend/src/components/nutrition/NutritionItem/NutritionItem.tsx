import style from "./NutritionItem.module.css";
import type { AlimentoItem } from "../../../data/nutrition";
import ButtonNutrition from "../ButtonNutrition/ButtonNutrition";
import FoodImage from "../FoodImage/FoodImage";
import AddToDiary from "../AddToDiary/AddToDiary";

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
        <AddToDiary item={item} />
      </div>
      
      <div className={style.itemImage}>
      <FoodImage item={item} />

      </div>
    </div>

  );
};

export default NutritionItem;
