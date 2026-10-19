import style from "./Style/Workouts.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../components/ui/Loading/Loading";
import { ItemWorkoustContainer } from "../components/workout/WorkoutContainer/WorkoutContainer";
import RoutineBuilder from "../components/workout/RoutineBuilder/RoutineBuilder";

const grupos = ["Pecho", "Bíceps", "Tríceps", "Espalda", "Hombro", "Pierna"];

const pasos = [
  "Elige un grupo muscular",
  "Aprende la técnica de cada ejercicio",
  "Arma y guarda tu propia rutina",
];

const Workouts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading text="...Cargando rutinas" />
      ) : (
        <div className={style.workoutsBody}>
          <section className={style.presentationWorkouts}>
            <div className={style.workoutsContainer}>
              <h1>Entrenamiento</h1>
              <p>
                Organiza y descubre rutinas de entrenamiento para cada nivel,
                con la técnica correcta y 100% gratis.
              </p>

              <ol className={style.stepsList}>
                {pasos.map((paso, index) => (
                  <li key={paso}>
                    <span>{index + 1}</span>
                    {paso}
                  </li>
                ))}
              </ol>

              <div className={style.heroActions}>
                <a href="#ejercicios" className={style.primaryAction}>
                  Explorar ejercicios
                </a>
                <a href="#mis-rutinas" className={style.secondaryAction}>
                  Crear mi rutina
                </a>
              </div>
            </div>

            <nav className={style.iconRotine} aria-label="Grupos musculares">
              {grupos.map((grupo) => (
                <a key={grupo} href="#ejercicios">
                  {grupo}
                </a>
              ))}
            </nav>
            <div className={style.sectionDivider}></div>
          </section>

          <section id="ejercicios" className={style.showcaseRutine}>
            <ItemWorkoustContainer />
          </section>

          <section id="mis-rutinas" className={style.builderSection}>
            <RoutineBuilder />
          </section>

          <section className={style.nextCta}>
            <h2>¿Ya entrenas? Cuida también tu alimentación</h2>
            <p>
              Los resultados se construyen en el gimnasio y en la cocina. Mira
              las calorías y macros de tus alimentos.
            </p>
            <Link to="/Nutrition" onClick={() => window.scrollTo({ top: 0 })}>
              Ver alimentación
            </Link>
          </section>
        </div>
      )}
    </>
  );
};

export default Workouts;
