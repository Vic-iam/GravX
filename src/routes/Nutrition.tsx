'use client'
import { Link } from "react-router";
import Aurora from "../components/Aurora";
import style from "./Style/Nutrition.module.css"
import { GoChevronDown } from "react-icons/go";
import nutricion from "../data/nutrition.json"

import { useRef } from "react";



const Nutrition = () => {

    const searchRef = useRef<HTMLDivElement | null>(null);


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
                    <h1>La Alimentancion</h1>
                    <p>
                        "Es una de la cosas mas importante de la vida"
                    </p>
                    <p>
                        Descubre y organiza tu alimentancion contando las calorias,carbohidratos y proteinas
                    </p>
                </div>

                <div className={style.titleStyle}>
                    <div className={style.listTitle}>
                        <h2>Lista de alimentos</h2>
                    </div>
                    <Link
                        to="/Nutrition"
                        className={style.iconStyle}
                        onClick={(e) => {
                            e.preventDefault();
                            searchRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }}
                    >
                        <GoChevronDown />
                    </Link>
                </div>

            </section>

            <section ref={searchRef} className={style.listContainer}>

                <div className={style.alimentosContainer}>

                    <div className={style.alimentoIndex}>
                        <label>Busca el alimento</label>
                        <input type="search" placeholder="Escribe el alimento"></input>
                    </div>

                    {nutricion.map(nutricio => (

                        <div key={nutricio.id}>

                            <div className={style.titleAlimentancion}>
                                <h3> {nutricio.nombre} </h3>
                            </div>

                            <div className={style.styleNutricion}>

                                {nutricio.types.map(item => (
                                    <div key={item.nombre} className={style.alimentaciónDescripcion}>
                                        <div className={style.desAlimentacion}>
                                            <h4> {item.nombre} </h4>
                                            <p>Calorias: {item.calorias}kcal x 100g </p>
                                            <p>Proteinas {item.proteina}g x 100g </p>
                                            <div className={style.verMasAlimentacion}>
                                                <Link to="/">Ver mas</Link>
                                            </div>
                                        </div>
                                        <img src={item.imagen} alt={item.nombre} />
                                    </div>

                                ))}

                            </div>
                        </div>
                    ))}

                </div>


            </section>

        </div>
    );
}

export default Nutrition;