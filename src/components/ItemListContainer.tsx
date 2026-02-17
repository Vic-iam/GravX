import { useEffect, useRef, useState } from "react";
import { getProducts } from "../data/nutrition";
import type { Categoria } from "../data/nutrition";
import ItemList from "./ItemList";
import style from "./styles/ItemListContainer.module.css";

const ItemListContainer = () => {
  const [nutricion, setNutricion] = useState<Categoria[]>([]);
  const [search, setSearch] = useState<string>("");

  const searchRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    getProducts()
      .then((res) => setNutricion(res))
      .catch(console.error);
  }, []);

  return (
    <section ref={searchRef} className={style.listContainer}>
      <div className={style.alimentosContainer}>
        <div className={style.alimentoIndex}>
          <label>Busca el alimento</label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Escribe el alimento"
          />
        </div>

        <ItemList categorias={nutricion} search={search} />
      </div>
    </section>
  );
};

export default ItemListContainer;
