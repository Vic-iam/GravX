import type { AlimentoItem } from "../../../data/nutrition";
import style from "./DetailNutrition.module.css";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../../ui/Loading/Loading";
import FoodImage from "../FoodImage/FoodImage";
import AddToDiary from "../AddToDiary/AddToDiary";

interface Props {
  item: AlimentoItem;
}

const DetailNutrition = ({ item }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading text="...Cargando datos" />
      ) : (
        <div className={style.detailContainer}>
          <div className={style.LinkStyle}>
            <Link
              to="/Nutrition"
              className={style.icon}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <GoChevronLeft /> Volver
            </Link>
          </div>

          <div className={style.detailInformtaion}>
            <div className={style.detailImage}>
              <FoodImage item={item} />
            </div>

            <div className={style.indexDetail}>
              <h1>{item.nombre}</h1>
              <p>{item.calorias} kcal</p>
              <p>{item.proteina} g proteína</p>
              <p>{item.carbos} g carbohidratos · {item.grasas} g grasas (por 100 g)</p>
              <p>Que te ofrece: {item.detalle} </p>
              <AddToDiary item={item} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailNutrition;
