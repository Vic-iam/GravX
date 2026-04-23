import type { AlimentoItem } from "../../../data/nutrition"
import { Link } from "react-router-dom"
import style from "./ButtonNutrition.module.css"

interface Props {
  item: AlimentoItem
}

const ButtonNutrition = ({ item }: Props) => {
  return (
    <Link className={style.btn} to={`/Item/${item.nombre}`}>
      Ver detalle
    </Link>
  )
}

export default ButtonNutrition