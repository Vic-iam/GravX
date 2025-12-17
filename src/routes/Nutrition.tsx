'use client'
import Aurora from "../components/Aurora";
import style from "./Style/Nutrition.module.css"


const  Nutrition = () => {
    return (
        <div className={style.nutritionBody}>

            <section className={style.presentationNutrition}>
                <div className={style.auroraBg}>
                    <Aurora
                        colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

                <div className={style.nutritionContainer}>
                    <h1>Alimentancion</h1>
                    <p>
                        "Descubre y organiza tu alimentación"
                    </p>
                </div>

            </section>
        
        </div>
    );
}

export default Nutrition;