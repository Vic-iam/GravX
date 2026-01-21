import style from "./Style/Workouts.module.css"
import Aurora from "../components/Aurora";


const Workouts = () => {
  return (
    <div className={style.workoutsBody}>

      <section className={style.presentationWorkouts}>
        <div className={style.auroraBg}>
          <Aurora
            colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        <div className={style.workoutsContainer}>

            <h1>Edita y organiza tus rutinas</h1>

        </div>

      </section>

    </div>

  );
};

export default Workouts;
