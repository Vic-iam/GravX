import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../data/nutrition";
import type { AlimentoItem } from "../data/nutrition";
import { GoChevronLeft } from "react-icons/go";
import ItemCategory from "./ItemCategory";
import { useNavigate } from "react-router-dom";
import style from "./Style/CategoryNutritionContainer.module.css"
import Aurora from "./Aurora";
import Loading from "./Loading";

const CategoryNutritionContainer = () => {
  const { type } = useParams<{ type: string }>();
  const [items, setItems] = useState<AlimentoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!type) return;

    setIsLoading(true);

    getProductsByCategory(type)
      .then((res) => setItems(res))
      .catch(console.error)
      .finally(() => setIsLoading(false));

  }, [type]);
  
  const navigate =  useNavigate();

  const hanldeVolver = () => {
    navigate("/Nutrition", {
      state: {scrollTo: "buscador"}
    })
  }

  return (
    <div className={style.containerCategory}>

      <div className={style.auroraBg}>
        <Aurora
          colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <button onClick={hanldeVolver} className={style.btn}> <GoChevronLeft/> Volver </button>

      <div className={style.indexCategory}>

        {isLoading ? (<Loading text="...Cargando" />
        ) : (
          items.map(i => (

            <ItemCategory key={i.nombre} item={i} />
          )))}
      </div>

    </div>
  );
};

export default CategoryNutritionContainer;
