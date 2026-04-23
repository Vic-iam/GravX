import { useEffect, useState } from "react";
import { getProducts, } from "../../../data/nutrition";
import type { Categoria } from "../../../data/nutrition";
import NutritionListItem from "../NutritionListItem/NutritionListItem";
import { Link } from "react-router-dom";
import style from "./ContainerNutrition.module.css";
import { FaChevronDown } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const ContainerNutrition = () => {
  const [nutricion, setNutricion] = useState<Categoria[]>([]);
  const [showCat, setShowCat] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setShowCat(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);


  useEffect(() => {
    getProducts()
      .then((res) => setNutricion(res))
      .catch(console.error);
  }, []);

  return (
    <section className={style.listContainer}>
      <div className={style.alimentosContainer}>
        <div className={style.alimentoIndex} onClick={() => setShowCat(!showCat)}>
          <h1 id="buscador">
            Busca el alimento
            <FaChevronDown style={{
              transform: showCat ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s"
            }} />
          </h1>
          {showCat && (
            <div className={style.category}>
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

        <NutritionListItem categorias={nutricion} />
      </div>
    </section>
  );
};

export default ContainerNutrition;
