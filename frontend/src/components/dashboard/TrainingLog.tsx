import { useMemo, useState, type FormEvent } from "react";
import { loadRoutine, todayName } from "../../utils/routineStorage";
import {
  addWorkoutLogs,
  formatDate,
  newId,
  today,
  useUserData,
  type WorkoutLog,
} from "../../utils/userData";
import style from "../../routes/Style/Dashboard.module.css";

const TrainingLog = ({ userId }: { userId: string }) => {
  const [logs, setLogs] = useUserData<WorkoutLog[]>(userId, "workouts", []);
  const [form, setForm] = useState({
    ejercicio: "",
    series: "3",
    reps: "12",
    peso: "",
  });
  const [error, setError] = useState("");

  const routine = useMemo(() => loadRoutine(userId), [userId]);
  const routineExercises = useMemo(
    () => [...new Set(routine.map((row) => row.ejercicio).filter(Boolean))],
    [routine],
  );
  const routineToday = routine.filter(
    (row) => row.dia === todayName() && row.ejercicio,
  );

  const loadTodayRoutine = () => {
    const done = new Set(
      logs.filter((log) => log.fecha === today()).map((log) => log.ejercicio),
    );
    const pending = routineToday.filter((row) => !done.has(row.ejercicio));
    if (pending.length === 0) {
      setError("Los ejercicios de la rutina de hoy ya están registrados.");
      return;
    }
    addWorkoutLogs(
      userId,
      pending.map((row) => ({
        ejercicio: row.ejercicio,
        series: Number(row.series) || 3,
        reps: Number(row.reps) || 12,
        peso: 0,
      })),
    );
    // useUserData no observa escrituras externas; se recarga la lista.
    setLogs((current) => current);
    setError("");
  };

  const todayLogs = logs.filter((log) => log.fecha === today());
  const history = useMemo(() => {
    const byDate = new Map<string, WorkoutLog[]>();
    logs
      .filter((log) => log.fecha !== today())
      .forEach((log) =>
        byDate.set(log.fecha, [...(byDate.get(log.fecha) ?? []), log]),
      );
    return [...byDate.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 14);
  }, [logs]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const ejercicio = form.ejercicio.trim();
    const series = Number(form.series);
    const reps = Number(form.reps);
    if (!ejercicio || !(series > 0) || !(reps > 0)) {
      setError("Indica el ejercicio, las series y las repeticiones.");
      return;
    }

    const saved = setLogs((current) => [
      ...current,
      {
        id: newId(),
        fecha: today(),
        ejercicio,
        series,
        reps,
        peso: Number(form.peso) || 0,
        completado: false,
      },
    ]);
    if (!saved) {
      setError("No se pudo guardar: el almacenamiento del navegador está lleno.");
      return;
    }
    setForm({ ...form, ejercicio: "" });
  };

  const toggle = (id: string) =>
    setLogs((current) =>
      current.map((log) =>
        log.id === id ? { ...log, completado: !log.completado } : log,
      ),
    );

  const remove = (id: string) =>
    setLogs((current) => current.filter((log) => log.id !== id));

  const describe = (log: WorkoutLog) =>
    `${log.series} x ${log.reps}${log.peso ? ` · ${log.peso} kg` : ""}`;

  return (
    <div className={style.grid}>
      <section className={style.card}>
        <h2>Registrar ejercicio</h2>
        {routineToday.length > 0 && (
          <button
            type="button"
            className={style.secondaryBtn}
            onClick={loadTodayRoutine}
          >
            Cargar mi rutina de hoy ({routineToday.length})
          </button>
        )}
        <form className={style.form} onSubmit={handleSubmit}>
          <label>
            Ejercicio
            <input
              list="routine-exercises"
              value={form.ejercicio}
              onChange={(e) => setForm({ ...form, ejercicio: e.target.value })}
              placeholder="Ej: Press de banca"
              required
            />
            <datalist id="routine-exercises">
              {routineExercises.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </label>
          <div className={style.row}>
            <label>
              Series
              <input
                type="number"
                min="1"
                value={form.series}
                onChange={(e) => setForm({ ...form, series: e.target.value })}
              />
            </label>
            <label>
              Repeticiones
              <input
                type="number"
                min="1"
                value={form.reps}
                onChange={(e) => setForm({ ...form, reps: e.target.value })}
              />
            </label>
            <label>
              Peso (kg)
              <input
                type="number"
                min="0"
                step="any"
                value={form.peso}
                onChange={(e) => setForm({ ...form, peso: e.target.value })}
              />
            </label>
          </div>
          {error && (
            <p className={style.error} role="alert">
              {error}
            </p>
          )}
          <button className={style.primaryBtn} type="submit">
            Agregar
          </button>
        </form>
      </section>

      <section className={style.card}>
        <h2>Entrenamiento de hoy</h2>
        {todayLogs.length === 0 ? (
          <p className={style.muted}>Aún no registraste ejercicios hoy.</p>
        ) : (
          <ul className={style.list}>
            {todayLogs.map((log) => (
              <li key={log.id}>
                <label className={style.check}>
                  <input
                    type="checkbox"
                    checked={log.completado}
                    onChange={() => toggle(log.id)}
                  />
                  <span className={log.completado ? style.done : undefined}>
                    {log.ejercicio}
                    <small>{describe(log)}</small>
                  </span>
                </label>
                <button
                  type="button"
                  className={style.linkBtn}
                  onClick={() => remove(log.id)}
                  aria-label={`Eliminar ${log.ejercicio}`}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {history.length > 0 && <h2>Entrenamientos anteriores</h2>}
        {history.map(([fecha, items]) => (
          <div key={fecha} className={style.group}>
            <h3>{formatDate(fecha)}</h3>
            <ul className={style.list}>
              {items.map((log) => (
                <li key={log.id}>
                  <span className={log.completado ? style.done : undefined}>
                    {log.ejercicio}
                    <small>{describe(log)}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TrainingLog;
