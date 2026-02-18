import type { AlimentoItem } from '../data/nutrition'
import style from "./Style/ItemCategory.module.css"
import ButtonItemNutrition from './ButtonItemNutrition'
import Aurora from './Aurora'


interface Prosp {
    item: AlimentoItem
}

const ItemCategory = ({ item }: Prosp) => {
    return (
        <div className={style.containerCardCategory}>

                <div className={style.auroraBg}>
                    <Aurora
                        colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

            <div className={style.cardCategory}>

                <div className={style.desAlimentacion}>
                    <h4>{item.nombre}</h4>
                    <p>Calorías: {item.calorias} kcal x 100g</p>
                    <p>Proteínas: {item.proteina} g x 100g</p>
                    <div className={style.verDetalle}>

                        <ButtonItemNutrition item={item} />
                    </div>
                </div>
                
                <div className={style.imgStyle}>

                <img src={item.imagen} alt={item.nombre} />
                </div>
            </div>

        </div>
    )
}

export default ItemCategory