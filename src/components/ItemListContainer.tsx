import { useEffect, useState } from "react";
import { getProducts } from "../data/nutrition";
import type { Categoria } from "../data/nutrition";
import ItemList from "./ItemList";
import style from "./Style/ItemListContainer.module.css";
import { FaChevronDown } from "react-icons/fa6";

const ItemListContainer = () => {
  const [nutricion, setNutricion] = useState<Categoria[]>([]);
  const [showCat, setShowCat] = useState(false);


  useEffect(() => {
    getProducts()
      .then((res) => setNutricion(res))
      .catch(console.error);
  }, []);

  return (
    <section className={style.listContainer}>
      <div className={style.alimentosContainer}>
        <div className={style.alimentoIndex}>
          <label>Busca el alimento <FaChevronDown /></label>
        </div>

        <ItemList categorias={nutricion}  />
      </div>
    </section>
  );
};

export default ItemListContainer;
