import type { AlimentoItem } from "../../../data/nutrition"
import style from "./DetailNutrition.module.css"
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router";

interface Props {
    item: AlimentoItem
}

const DetailNutrition = ({ item }: Props) => {
    return (
        <div className={style.detailContainer}>


                <div className={style.LinkStyle}>
                    <Link
                        to="/Nutrition"
                        className={style.icon}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <GoChevronLeft /> Regresar
                    </Link>
                </div>

            <div className={style.detailInformtaion}>


                <div className={style.detailImage}>
                    <img src={item.imagen} />
                </div>

                <div className={style.indexDetail}>


                    <h2>{item.nombre}</h2>
                    <p>{item.calorias} kcal</p>
                    <p>{item.proteina} g proteína</p>
                    <p style={{ fontSize: "1.1rem", maxWidth: "500px" }}>Que te ofrece: {item.detalle} </p>

                </div>
            </div>
        </div>
    )
}

export default DetailNutrition