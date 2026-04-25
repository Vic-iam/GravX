import type { AlimentoItem } from "../../../data/nutrition";
import style from "./DetailNutrition.module.css";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../../ui/Loading/Loading";

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
              <img src={item.imagen} />
            </div>

            <div className={style.indexDetail}>
              <h1>{item.nombre}</h1>
              <p>{item.calorias} kcal</p>
              <p>{item.proteina} g proteína</p>
              <p>Que te ofrece: {item.detalle} </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailNutrition;
