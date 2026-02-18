import { useEffect, useState } from "react";
import { getProducts, } from "../data/nutrition";
import type { Categoria } from "../data/nutrition";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";
import style from "./Style/ItemListContainer.module.css";
import { FaChevronDown } from "react-icons/fa6";

const ItemListContainer = () => {
  const [nutricion, setNutricion] = useState<Categoria[]>([]);
  const [showCat, setShowCat] = useState(false);

    const handleLinkClick = () => { 
    setShowCat(false); 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    getProducts()
      .then((res) => setNutricion(res))
      .catch(console.error);
  }, []);

  return (
    <section className={style.listContainer}>
      <div className={style.alimentosContainer}>
        <div className={style.alimentoIndex} onClick={() => setShowCat(!showCat)}>
          <label>Busca el alimento <FaChevronDown /></label>
          {showCat && (
            <div>
            <Link to="/Nutrition" onClick={handleLinkClick}>
              Ver Todos
            </Link>
            <Link to="/categoria/proteina">
              Mayor proteina
            </Link>
            <Link to="/categoria/calorias">
              Mayor calorias
            </Link>
            </div>
          )}
        </div>

        <ItemList categorias={nutricion}  />
      </div>
    </section>
  );
};

export default ItemListContainer;
