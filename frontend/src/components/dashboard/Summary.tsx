import {
  emptyProfile,
  lastDays,
  today,
  useUserData,
  type Meal,
  type Measurement,
  type Profile,
  type WaterLog,
  type WorkoutLog,
} from "../../utils/userData";
import style from "../../routes/Style/Dashboard.module.css";

const round = (value: number) => Math.round(value);

const Bar = ({ label, value, goal, unit }: { label: string; value: number; goal: number; unit: string }) => {
  const percent = goal > 0 ? Math.min(100, (value / goal) * 100) : 0;
  return (
    <div className={style.metric}>
      <div className={style.metricHead}>
        <span>{label}</span>
        <span>
          {round(value)}
          {goal > 0 ? ` / ${goal}` : ""} {unit}
        </span>
      </div>
      <div className={style.track}>
        <div className={style.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

const Summary = ({ userId }: { userId: string }) => {
  const [profile] = useUserData<Profile>(userId, "profile", emptyProfile);
  const [meals] = useUserData<Meal[]>(userId, "meals", []);
  const [workouts] = useUserData<WorkoutLog[]>(userId, "workouts", []);
  const [measures] = useUserData<Measurement[]>(userId, "measures", []);
  const [water, setWater] = useUserData<WaterLog>(userId, "water", {});

  const day = today();
  const week = lastDays(7);

  const totals = meals
    .filter((meal) => meal.fecha === day)
    .reduce(
      (sum, meal) => ({
        calorias: sum.calorias + meal.calorias,
        proteina: sum.proteina + meal.proteina,
        carbos: sum.carbos + meal.carbos,
        grasas: sum.grasas + meal.grasas,
      }),
      { calorias: 0, proteina: 0, carbos: 0, grasas: 0 },
    );

  const todayWorkouts = workouts.filter((log) => log.fecha === day);
  const doneToday = todayWorkouts.filter((log) => log.completado).length;

  const weekMeals = meals.filter((meal) => week.includes(meal.fecha));
  const activeMealDays = new Set(weekMeals.map((meal) => meal.fecha)).size;
  const avgCalories = activeMealDays
    ? weekMeals.reduce((sum, meal) => sum + meal.calorias, 0) / activeMealDays
    : 0;
  const weekWorkoutDays = new Set(
    workouts.filter((log) => week.includes(log.fecha)).map((log) => log.fecha),
  ).size;

  const weights = [...measures]
    .filter((item) => item.peso > 0)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const weightChange =
    weights.length >= 2
      ? weights[weights.length - 1].peso - weights[0].peso
      : null;

  const glasses = water[day] ?? 0;
  const setGlasses = (next: number) =>
    setWater((current) => ({ ...current, [day]: Math.max(0, next) }));

  const hasData = meals.length + workouts.length + measures.length > 0;

  return (
    <div className={style.grid}>
      <section className={style.card}>
        <h2>Hoy</h2>
        <Bar label="Calorías" value={totals.calorias} goal={Number(profile.metaCalorias) || 0} unit="kcal" />
        <Bar label="Proteína" value={totals.proteina} goal={Number(profile.metaProteina) || 0} unit="g" />
        <Bar label="Carbohidratos" value={totals.carbos} goal={Number(profile.metaCarbos) || 0} unit="g" />
        <Bar label="Grasas" value={totals.grasas} goal={Number(profile.metaGrasas) || 0} unit="g" />

        <div className={style.metricHead}>
          <span>Agua</span>
          <span>{glasses} vasos</span>
        </div>
        <div className={style.waterRow}>
          <button type="button" className={style.secondaryBtn} onClick={() => setGlasses(glasses - 1)} disabled={glasses === 0}>
            −
          </button>
          <button type="button" className={style.primaryBtn} onClick={() => setGlasses(glasses + 1)}>
            + Agregar vaso
          </button>
        </div>
      </section>

      <section className={style.card}>
        <h2>Entrenamiento de hoy</h2>
        <p className={style.big}>
          {doneToday} <span>de {todayWorkouts.length} ejercicios completados</span>
        </p>

        <h2>Resumen semanal</h2>
        <ul className={style.stats}>
          <li>
            <strong>{weekWorkoutDays}</strong>
            <span>días entrenados</span>
          </li>
          <li>
            <strong>{round(avgCalories)}</strong>
            <span>kcal promedio</span>
          </li>
          <li>
            <strong>
              {weightChange === null
                ? "-"
                : `${weightChange > 0 ? "+" : ""}${Math.round(weightChange * 10) / 10}`}
            </strong>
            <span>kg desde el primer registro</span>
          </li>
        </ul>
        {!hasData && (
          <p className={style.muted}>
            Empieza registrando una comida o un entrenamiento y verás tu
            progreso aquí.
          </p>
        )}
      </section>
    </div>
  );
};

export default Summary;
