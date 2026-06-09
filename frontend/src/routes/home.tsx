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
              <h1>Transformá tu físico con GravX</h1>

              <p>
                Todo lo que necesitás para progresar: rutinas, ejercicios,
                nutrición y herramientas para alcanzar tus objetivos.
              </p>

              <div className={style.heroStats}>
                <div>
                  <strong>+30</strong>
                  <span>Ejercicios</span>
                </div>

                <div>
                  <strong>6</strong>
                  <span>Grupos musculares</span>
                </div>

                <div>
                  <strong>100%</strong>
                  <span>Gratis</span>
                </div>
              </div>

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

          {/* CALCULADORA IMC */}
          <section className={style.calculatorHome}>
            <div className={style.calHome}>
              <h2>Conocé tu punto de partida</h2>

              <p>
                Calculá tu IMC y obtené una referencia rápida para comenzar tu
                transformación física.
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

          {/* RUTINAS */}
          <section className={style.rutinasHome}>
            <div className={style.rutinaStyle}>
              <h3>Entrená cada músculo correctamente</h3>
              <p>
                Explorá ejercicios para pecho, espalda, piernas, hombros y
                brazos con explicaciones claras y técnicas correctas.
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

          {/* CARDS DE MOTIVACIÓN */}
          <section className={style.cardContainer}>
            <div className={style.wrappers}>
              <h5>Rutinas organizadas</h5>

              <span className={style.iconwrappers}>
                <LuBicepsFlexed />
              </span>

              <p>Encontrá ejercicios clasificados por grupo muscular.</p>
            </div>

            <div className={style.wrappers}>
              <h5>Técnicas correctas</h5>

              <span className={style.iconwrappers}>
                <FaRepeat />
              </span>

              <p>Aprendé la ejecución adecuada para cada ejercicio.</p>
            </div>

            <div className={style.wrappers}>
              <h5>Rutinas personalizadas</h5>

              <span className={style.iconwrappers}>
                <LuSalad />
              </span>

              <p>Creá y guardá tus propias rutinas de entrenamiento.</p>
            </div>
          </section>

          {/*Alimentancion */}
          <section className={style.homeNutrition}>
            <div className={style.nutritionHomeContainer}>
              <h4>La alimentación también importa</h4>
              <p>
                Calculá tu metabolismo basal y obtené información útil para
                complementar tus entrenamientos.
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
