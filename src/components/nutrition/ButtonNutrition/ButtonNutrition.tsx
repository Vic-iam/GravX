import type { AlimentoItem } from "../../../data/nutrition"
import { Link } from "react-router-dom"
import style from "./ButtonNutrition.module.css"

interface Props {
  item: AlimentoItem
}


const ButtonNutrition = ({ item }: Props) => {

    const closeMenu = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <Link onClick={closeMenu} className={style.btn} to={`/Item/${item.nombre}`}>
      Ver detalle
    </Link>
  )
}

export default ButtonNutrition