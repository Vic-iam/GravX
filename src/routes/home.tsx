import Aurora from "../components/Aurora";
import ScrollVelocity from "../components/ScrollVelocity";
import style from "./Style/Home.module.css";

import { Link } from "react-router";
import { IoMdFitness } from "react-icons/io";
import { IoFitness } from "react-icons/io5";
import { FaCalculator, FaChevronRight } from "react-icons/fa";
import { GiSteak } from "react-icons/gi";

import Back from "../assets/rutinaBack.png";
import Biceps from "../assets/rutinaBicep.png";
import Pierna from "../assets/rutinaPierna.png";

const Home = () => {
    const velocity = 70;

    return (
        <div className={style.homeBody}>

            {/* HERO SECTION */}
            <section className={style.presentationHome}>
                <div className={style.auroraBg}>
                    <Aurora
                        colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

                <div className={style.homeContainer}>
                    <h1>Bienvenido a GravX</h1>
                    <p>
                        "Transforma tu cuerpo y mejora tu salud con rutinas guiadas,
                        planes alimenticios y herramientas diseñadas para ayudarte
                        a alcanzar tus metas."
                    </p>
                </div>

                <div className={style.iconHome}>
                    <div className={style.icon1}><IoMdFitness /></div>
                    <div className={style.icon2}><IoFitness /></div>
                    <div className={style.icon3}><FaCalculator /></div>
                    <div className={style.icon4}><GiSteak /></div>
                </div>
            </section>


            {/* CALCULADORA IMC */}
            <section className={style.calculatorHome}>
                <div className={style.calHome}>
                    <h2>Calculá tu IMC (Índice de Masa Corporal)</h2>
                    <p>La calculadora IMC te permite conocer si tu peso es adecuado según tu altura.</p>
                    <div className={style.linea}></div>
                    <h2>Calcula tu TMB (Tasa metabolica basal)</h2>
                    <p>La TMB estima cuánta energía (calorías) necesita tu cuerpo para funcionar en reposo</p>
                    <Link
                        to="/Calculator"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className={`${style.btnBase} ${style.verUbicacion}`}
                    >
                        Usar calculadora <FaChevronRight />
                    </Link>
                </div>
            </section>


            {/* ANIMACIÓN SCROLL TEXT */}
            <ScrollVelocity
                texts={['Motivation', 'Workouts']}
                velocity={velocity}
                className="custom-scroll-text"
            />


            {/* RUTINAS */}
            <section className={style.rutinasHome}>
                <div className={style.rutinaStyle}>
                    <h3>Explorá rutinas diseñadas para cada grupo muscular</h3>

                    <div className={style.rutinas}>
                        <div className={style.imgStyle}>
                            <img src={Back} alt="Back" />
                            <h4>Rutinas de espalda</h4>
                            <p>Aumentá fuerza y volumen</p>
                        </div>

                        <div className={style.imgStyle}>
                            <img src={Pierna} alt="Pierna" />
                            <h4>Rutinas de pierna</h4>
                            <p>Construí potencia y resistencia</p>
                        </div>

                        <div className={style.imgStyle}>
                            <img src={Biceps} alt="Biceps" />
                            <h4>Rutinas de bíceps</h4>
                            <p>Definí y desarrollá tus brazos</p>
                        </div>
                    </div>

                    <Link
                        to="/Workouts"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className={`${style.btnBase} ${style.verUbicacion}`}
                    >
                        Ver rutinas <FaChevronRight />
                    </Link>
                </div>
            </section>


            {/* CARDS DE MOTIVACIÓN */}
            <section className={style.cardContainer}>
                <div className={style.wrappers}>
                    <h5>Entrená por lo que querés ser</h5>
                    <span className={style.iconwrappers}>💪</span>
                    <p>"No se trata de ser el mejor que alguien, sino de ser mejor que ayer."</p>
                </div>

                <div className={style.wrappers}>
                    <h5>La disciplina gana</h5>
                    <span className={style.iconwrappers}>🔁</span>
                    <p>"Los resultados son un proceso, cada día cuenta."</p>
                </div>

                <div className={style.wrappers}>
                    <h5>Comé para sentirte bien</h5>
                    <span className={style.iconwrappers}>🥗</span>
                    <p>"Lo que comés hoy es la energía con la que vas a construir el mañana."</p>
                </div>
            </section>

            <section className={style.homeNutrition}>

                <div className={style.auroraBgInverse}>
                    <Aurora
                        colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                        blend={0.5}
                        amplitude={1.5}
                        speed={0.5}
                    />
                </div>

                <div className={style.nutritionHomeContainer}>
                    <h2>Transformá tu cuerpo desde la alimentación</h2>
                    <p>Descubrí tu TMB, planificá tus comidas y alcanzá tus objetivos sin dietas extremas.</p>
                    <Link to="/Nutrition">Ver alimentación <FaChevronRight /></Link>
                </div>


            </section>

        </div>
    );
};

export default Home;
