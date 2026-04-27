import style from "./Style/Workouts.module.css";
import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading/Loading";
import { ItemWorkoustContainer } from "../components/workout/WorkoutContainer/WorkoutContainer";

const Workouts = () => {
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
        <div className={style.workoutsBody}>

          <section className={style.presentationWorkouts}>

            <div className={style.workoutsContainer}>
              <h1>Entrenamiento</h1>
              <p>Organiza y descubre rutinas de entrenamiento</p>
            </div>

            <div className={style.iconRotine}>
              <a>PECHO</a>
              <a>BICEDS</a>
              <a>TRICEPS</a>
              <a>ESPALDA</a>
              <a>HOMBRO</a>
              <a>PIERNA</a>
            </div>
          <div className={style.sectionDivider}></div>
          </section>

          <section className={style.showcaseRutine}>
                  <ItemWorkoustContainer />
          </section>
        </div>
      )}
    </>
  );
};

export default Workouts;
