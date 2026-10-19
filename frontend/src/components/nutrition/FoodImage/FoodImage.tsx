import type { AlimentoItem } from "../../../data/nutrition";
import style from "./FoodImage.module.css";

const FoodImage = ({ item }: { item: AlimentoItem }) =>
  item.imagen ? (
    <img src={item.imagen} alt={item.nombre} />
  ) : (
    <div className={style.placeholder} role="img" aria-label={item.nombre}>
      {item.emoji ?? item.nombre.charAt(0)}
    </div>
  );

export default FoodImage;
