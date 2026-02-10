import type { AlimentoItem } from "../data/nutrition"
import Aurora from "./Aurora"
import style from "./Style/NutritionDetail.module.css"
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router";

interface Props {
    item: AlimentoItem
}

const NutritionDetail = ({ item }: Props) => {
    return (
        <div className={style.detailContainer}>
            <div className={style.auroraBg}>
                <Aurora
                    colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>
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
                    <p style={{ fontSize: "1rem", maxWidth: "400px" }}>Que te ofrece: {item.detalle} </p>

                </div>
            </div>
        </div>
    )
}

export default NutritionDetail