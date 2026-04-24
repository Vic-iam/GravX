import style from "./Style/Home.module.css";

import { Link } from "react-router";
import { IoMdFitness } from "react-icons/io";
import { IoFitness } from "react-icons/io5";
import { FaCalculator, FaChevronRight } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { GiSteak } from "react-icons/gi";
import { LuBicepsFlexed, LuSalad } from "react-icons/lu";

import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading/Loading";

const Home = () => {
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
        <div className={style.homeBody}>
          {/* HERO SECTION */}
          <section className={style.presentationHome}>
            <div className={style.homeContainer}>
              <h1>Transformá tu cuerpo con GravX</h1>
              <p>
                Rutinas inteligentes, nutrición personalizada y herramientas
                diseñadas para ayudarte a alcanzar tus objetivos.
              </p>

              <div className={style.heroButtons}>
                <Link to="/Workouts" className={style.primaryBtn}>
                  Empezar ahora
                </Link>

                <Link to="/Calculator" className={style.secondaryBtn}>
                  Calcular IMC
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
          </section>

          <div className={style.sectionDivider}></div>

          {/* CALCULADORA IMC */}
          <section className={style.calculatorHome}>
            <div className={style.calHome}>
              <h2>Calculá tu IMC</h2>

              <p>
                Descubrí si tu peso está dentro del rango saludable según tu
                altura y obtené una referencia rápida para empezar a mejorar tu
                condición física.
              </p>

              <div className={style.imcBenefits}>
                <div>
                  <strong>Rápido</strong>
                  <span>Resultado en segundos</span>
                </div>

                <div>
                  <strong>Simple</strong>
                  <span>Solo altura y peso</span>
                </div>

                <div>
                  <strong>Útil</strong>
                  <span>Conocé tu estado actual</span>
                </div>
              </div>

              <Link
                to="/Calculator"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`${style.btnBase} ${style.verUbicacion}`}
              >
                Usar calculadora <FaChevronRight />
              </Link>
            </div>
          </section>
         
          <div className={style.sectionDivider}></div>

          {/* RUTINAS */}
          <section className={style.rutinasHome}>
            <div className={style.rutinaStyle}>
              <h3>Descubre rutinas</h3>
              <p>
                Explora rutinas diseñadas para cada grupo muscular
              </p>

              <div className={style.rutinas}>

                <div className={style.workoutBg}>
                  <h4>Rutinas de espalda</h4>
                  <p>Aumentá fuerza y volumen</p>
                </div>

                <div className={style.workoutBg}>
                  <h4>Rutinas de pierna</h4>
                  <p>Construí potencia y resistencia</p>
                </div>

                <div className={style.workoutBg}>
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

          <div className={style.sectionDivider}></div>
          {/* CARDS DE MOTIVACIÓN */}
          <section className={style.cardContainer}>
            <div className={style.wrappers}>
              <h5>Entrená por lo que querés ser</h5>
              <span className={style.iconwrappers}>
                <LuBicepsFlexed />
              </span>
              <p>
                "No se trata de ser el mejor que alguien, sino de ser mejor tu
                mejor version."
              </p>
            </div>

            <div className={style.wrappers}>
              <h5>La disciplina gana</h5>
              <span className={style.iconwrappers}>
                <FaRepeat />
              </span>
              <p>"Los resultados son un proceso, cada día cuenta."</p>
            </div>

            <div className={style.wrappers}>
              <h5>Comé para sentirte bien</h5>
              <span className={style.iconwrappers}>
                <LuSalad />
              </span>
              <p>
                "Lo que comés hoy es la energía con la que vas a construir el
                mañana."
              </p>
            </div>
          </section>


          {/*Alimentancion */}
          <section className={style.homeNutrition}>
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

            <div className={style.nutritionHomeContainer}>
              <h4>Transformá tu cuerpo desde la alimentación</h4>
              <p>
                Descubrí tu TMB, planificá tus comidas y alcanzá tus objetivos
                sin dietas extremas.
              </p>
              <Link
                to="/Nutrition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Ver alimentación <FaChevronRight />
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
