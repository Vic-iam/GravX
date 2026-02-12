import type { AlimentoItem } from "../data/nutrition"
import { Link } from "react-router-dom"

interface Props {
  item: AlimentoItem
}

const ButtonItemNutrition = ({ item }: Props) => {
  return (
    <Link to={`/Item/${item.nombre}`}>
      Ver detalle
    </Link>
  )
}

export default ButtonItemNutrition