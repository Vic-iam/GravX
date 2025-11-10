import Aurora from "../components/Aurora";
import style from "./Style/Home.module.css";
import { Link } from "react-router";
import { IoMdFitness } from "react-icons/io";
import { IoFitness } from "react-icons/io5";
import { FaCalculator, FaChevronRight } from "react-icons/fa";
import { GiSteak } from "react-icons/gi";
import Back from "../assets/rutinaBack.png"
import Biceps from "../assets/rutinaBicep.png"
import Pierna from "../assets/rutinaPierna.png"


const Home = () => {
    return (
        <div className={style.homeBody}>

            <div className={style.presentationHome}>
                <div className={style.auroraBg}>
                    <Aurora
                        colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

                <div className={style.titleHome}>
                    <h1>Bienvenido a GravX</h1>
                    <p>"Transforma tu cuerpo y mejora tu salud con rutinas guiadas, planes alimenticios y herramientas diseñadas para ayudarte a alcanzar tus metas."</p>
                </div>

                <div className={style.iconHome}>
                    <div className={style.icon1}>
                        <IoMdFitness />
                    </div>
                    <div className={style.icon2}>
                        <IoFitness />
                    </div>
                    <div className={style.icon3}>
                        <FaCalculator />
                    </div>
                    <div className={style.icon4}>
                        <GiSteak />
                    </div>
                </div>


            </div>


            <div className={style.calculatorHome}>

                <div className={style.calHome}>
                    <h2>Calcula tu IMC (Índice de Masa Corporal)</h2>
                    <p>La calculadora IMC te permite conocer si tu peso es adecuado según tu altura.</p>
                    <Link to="/Calculator" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`${style.btnBase} ${style.verUbicacion}`}>
                        Oprime aqui <FaChevronRight />
                    </Link>
                </div>
            </div>

            <div className={style.iconHome}>
                <div className={style.icon1}>
                    <IoMdFitness />
                </div>
                <div className={style.icon2}>
                    <IoFitness />
                </div>
                <div className={style.icon3}>
                    <FaCalculator />
                </div>
                <div className={style.icon4}>
                    <GiSteak />
                </div>
            </div>

            <div className={style.rutinasHome}>

                <div className={style.rutinaStyle}>
                    <h3>
                        Explora rutinas diseñadas para cada grupo muscular
                    </h3>
                    <div className={style.rutinas}>
                        <div className={style.imgStyle}>
                            <img src={Back} alt="Back" />
                            <h4>
                                Rutinas de espalda
                            </h4>
                            <p>Aumenta fuerza y volumen</p>
                        </div>
                        <div className={style.imgStyle}>
                            <img src={Pierna} alt="Pierna" />
                            <h4>
                                Rutinas de pierna
                            </h4>
                            <p>Construye potencia y resistencia</p>
                        </div>
                        <div className={style.imgStyle}>
                            <img src={Biceps} alt="Biceps" />
                            <h4>
                                Rutinas de biceps
                            </h4>
                            <p>Define y desarrolla tus brazos</p>
                        </div>
                    </div>
                    <Link to="/Workouts" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`${style.btnBase} ${style.verUbicacion}`}>
                        Ver rutinas <FaChevronRight />
                    </Link>
                </div>
            </div>

            <div className={style.iconHome}>
                <div className={style.icon1}>
                    <IoMdFitness />
                </div>
                <div className={style.icon2}>
                    <IoFitness />
                </div>
                <div className={style.icon3}>
                    <FaCalculator />
                </div>
                <div className={style.icon4}>
                    <GiSteak />
                </div>
            </div>

        </div>
    );
};

export default Home;
