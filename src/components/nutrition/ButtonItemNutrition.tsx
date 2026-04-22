import type { AlimentoItem } from "../data/nutrition"
import { Link } from "react-router-dom"
import style from "./Style/ButtonItemNutrition.module.css"

interface Props {
  item: AlimentoItem
}

const ButtonItemNutrition = ({ item }: Props) => {
  return (
    <Link className={style.btn} to={`/Item/${item.nombre}`}>
      Ver detalle
    </Link>
  )
}

export default ButtonItemNutrition