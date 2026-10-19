import type { AlimentoItem } from '../../../data/nutrition'
import ButtonNutrition from '../ButtonNutrition/ButtonNutrition'
import FoodImage from '../FoodImage/FoodImage'
import AddToDiary from '../AddToDiary/AddToDiary'
import style from "./CategoryItem.module.css"

interface Prosp {
    item: AlimentoItem
}

const CategoryItem = ({ item }: Prosp) => {
    return (
        <div className={style.containerCardCategory}>

            <div className={style.cardCategory}>
                <div className={style.desAlimentacion}>
                    <h1>{item.nombre}</h1>
                    <p>Calorías: {item.calorias} kcal x 100g</p>
                    <p>Proteínas: {item.proteina} g x 100g</p>
                    <div className={style.verDetalle}>
                        <ButtonNutrition item={item} />
                    </div>
                    <AddToDiary item={item} />
                </div>

                <div className={style.imgStyle}>
                    <FoodImage item={item} />
                </div>
            </div>

        </div>
    )
}

export default CategoryItem