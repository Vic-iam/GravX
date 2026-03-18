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
          <h1>
            Busca el alimento
            <FaChevronDown style={{
              transform: showCat ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s"
            }} />
          </h1>
          {showCat && (
            <div className={style.category}>
              <Link to="/Item/nombre" onClick={handleLinkClick}>
                Ver Todos
              </Link>
              <Link to="/categoria/frutas">
                Frutas
              </Link>
              <Link to="/categoria/granos" onClick={handleLinkClick}>
                Granos
              </Link>
              <Link to="/categoria/verduras">
                Verduras
              </Link>
              <Link to="/categoria/proteina" onClick={handleLinkClick}>
                Proteinas
              </Link>
            </div>
          )}
        </div>

        <ItemList categorias={nutricion} />
      </div>
    </section>
  );
};

export default ItemListContainer;
