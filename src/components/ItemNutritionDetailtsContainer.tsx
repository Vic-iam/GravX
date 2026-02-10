import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import type { AlimentoItem } from "../data/nutrition"
import { getOneProduct } from "../data/nutrition"
import NutritionDetail from "./NutritionDetail"

const ItemNutritionDetailContainer = () => {

  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<AlimentoItem | null>(null)

  useEffect(() => {
    if (!id) return

    getOneProduct(id)
      .then(setItem)
      .catch(console.log)

  }, [id])

  if (!item) return <p>Cargando...</p>

  return <NutritionDetail item={item} />
}

export default ItemNutritionDetailContainer