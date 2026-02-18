import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../data/nutrition";
import type { AlimentoItem } from "../data/nutrition";
import Item from "./Item";

const CategoryNutritionContainer = () => {
  const { type } = useParams<{ type: string }>();
  const [items, setItems] = useState<AlimentoItem[]>([]);

  useEffect(() => {
    if (!type) return;

    getProductsByCategory(type).then(setItems);
  }, [type]);

  if (!items.length) return <p>Cargando...</p>;

  return (
    <div>
      {items.map(i => (
        <Item key={i.nombre} item={i} />
      ))}
    </div>
  );
};

export default CategoryNutritionContainer;
