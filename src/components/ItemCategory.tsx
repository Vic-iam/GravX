import type { AlimentoItem } from '../data/nutrition'
import ButtonItemNutrition from './ButtonItemNutrition'
import style from "./Style/ItemCategory.module.css"

interface Prosp {
    item: AlimentoItem
}

const ItemCategory = ({ item }: Prosp) => {
    return (
        <div className={style.containerCardCategory}>

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