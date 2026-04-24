import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../../../data/nutrition";
import type { AlimentoItem } from "../../../data/nutrition";
import { GoChevronLeft } from "react-icons/go";
import ItemCategory from "../CategoryItem/CategoryItem";
import { useNavigate } from "react-router-dom";
import style from "./NutritionCategory.module.css";
import Loading from "../../ui/Loading/Loading";

const NutritionCategory = () => {
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

  const navigate = useNavigate();

  const hanldeVolver = () => {
    navigate("/Nutrition", {
      state: { scrollTo: "buscador" },
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading text="...Cargando" />
      ) : (
        <div className={style.containerCategory}>
          <button onClick={hanldeVolver} className={style.btn}>
            {" "}
            <GoChevronLeft /> Volver{" "}
          </button>

          <div className={style.indexCategory}>
            {items.map((i) => (
              <ItemCategory key={i.nombre} item={i} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NutritionCategory;
