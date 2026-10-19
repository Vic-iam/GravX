import { useMemo, useState, type FormEvent } from "react";
import { alimentos, type AlimentoItem } from "../../data/nutrition";
import {
  COMIDAS,
  emptyProfile,
  newId,
  today,
  useUserData,
  type Meal,
  type Profile,
} from "../../utils/userData";
import style from "../../routes/Style/Dashboard.module.css";

const catalog: AlimentoItem[] = alimentos.flatMap((categoria) => categoria.types);

const round = (value: number) => Math.round(value * 10) / 10;

const blankForm = {
  comida: COMIDAS[0],
  nombre: "",
  gramos: "100",
  calorias: "",
  proteina: "",
  carbos: "",
  grasas: "",
};

const FoodLog = ({ userId }: { userId: string }) => {
  const [meals, setMeals] = useUserData<Meal[]>(userId, "meals", []);
  const [profile] = useUserData<Profile>(userId, "profile", emptyProfile);
  const [form, setForm] = useState(blankForm);
  const [base, setBase] = useState<AlimentoItem | null>(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState(today());

  const dayMeals = useMemo(
    () => meals.filter((meal) => meal.fecha === date),
    [meals, date],
  );
  const totals = dayMeals.reduce(
    (sum, meal) => ({
      calorias: sum.calorias + meal.calorias,
      proteina: sum.proteina + meal.proteina,
      carbos: sum.carbos + meal.carbos,
      grasas: sum.grasas + meal.grasas,
    }),
    { calorias: 0, proteina: 0, carbos: 0, grasas: 0 },
  );
  const goal = Number(profile.metaCalorias) || 0;

  const applyBase = (item: AlimentoItem, grams: number) => {
    const factor = grams / 100;
    setForm((current) => ({
      ...current,
      nombre: item.nombre,
      calorias: String(round(item.calorias * factor)),
      proteina: String(round(item.proteina * factor)),
      carbos: String(round(item.carbos * factor)),
      grasas: String(round(item.grasas * factor)),
    }));
  };

  const handleSelect = (name: string) => {
    const item = catalog.find((food) => food.nombre === name) ?? null;
    setBase(item);
    if (item) applyBase(item, Number(form.gramos) || 0);
  };

  const handleGrams = (value: string) => {
    setForm((current) => ({ ...current, gramos: value }));
    if (base) applyBase(base, Number(value) || 0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const nombre = form.nombre.trim();
    const calorias = Number(form.calorias);
    if (!nombre || form.calorias === "" || !(calorias >= 0)) {
      setError("Indica el alimento y sus calorías.");
      return;
    }

    const saved = setMeals((current) => [
      ...current,
      {
        id: newId(),
        fecha: date,
        comida: form.comida,
        nombre,
        gramos: Number(form.gramos) || 0,
        calorias,
        proteina: Number(form.proteina) || 0,
        carbos: Number(form.carbos) || 0,
        grasas: Number(form.grasas) || 0,
      },
    ]);
    if (!saved) {
      setError("No se pudo guardar: el almacenamiento del navegador está lleno.");
      return;
    }
    setForm({ ...blankForm, comida: form.comida });
    setBase(null);
  };

  const removeMeal = (id: string) =>
    setMeals((current) => current.filter((meal) => meal.id !== id));

  return (
    <div className={style.grid}>
      <section className={style.card}>
        <h2>Registrar comida</h2>
        <form className={style.form} onSubmit={handleSubmit}>
          <label>
            Fecha
            <input
              type="date"
              value={date}
              max={today()}
              onChange={(e) => setDate(e.target.value || today())}
            />
          </label>
          <label>
            Comida
            <select
              value={form.comida}
              onChange={(e) => setForm({ ...form, comida: e.target.value })}
            >
              {COMIDAS.map((comida) => (
                <option key={comida}>{comida}</option>
              ))}
            </select>
          </label>
          <label>
            Buscar en el catálogo (por 100 g)
            <input
              list="catalog-foods"
              placeholder="Ej: Pollo"
              onChange={(e) => handleSelect(e.target.value)}
            />
            <datalist id="catalog-foods">
              {catalog.map((food) => (
                <option key={food.nombre} value={food.nombre} />
              ))}
            </datalist>
          </label>
          <label>
            Alimento
            <input
              value={form.nombre}
              onChange={(e) => {
                setBase(null);
                setForm({ ...form, nombre: e.target.value });
              }}
              placeholder="Nombre del alimento"
              required
            />
          </label>
          <div className={style.row}>
            <label>
              Gramos
              <input
                type="number"
                min="0"
                value={form.gramos}
                onChange={(e) => handleGrams(e.target.value)}
              />
            </label>
            <label>
              Calorías
              <input
                type="number"
                min="0"
                step="any"
                value={form.calorias}
                onChange={(e) => setForm({ ...form, calorias: e.target.value })}
                required
              />
            </label>
          </div>
          <div className={style.row}>
            <label>
              Proteína (g)
              <input
                type="number"
                min="0"
                step="any"
                value={form.proteina}
                onChange={(e) => setForm({ ...form, proteina: e.target.value })}
              />
            </label>
            <label>
              Carbohidratos (g)
              <input
                type="number"
                min="0"
                step="any"
                value={form.carbos}
                onChange={(e) => setForm({ ...form, carbos: e.target.value })}
              />
            </label>
            <label>
              Grasas (g)
              <input
                type="number"
                min="0"
                step="any"
                value={form.grasas}
                onChange={(e) => setForm({ ...form, grasas: e.target.value })}
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
        <h2>Total del día</h2>
        <p className={style.big}>
          {round(totals.calorias)} <span>kcal</span>
          {goal > 0 && (
            <span> · te quedan {Math.max(0, round(goal - totals.calorias))}</span>
          )}
        </p>
        <p className={style.muted}>
          Proteína {round(totals.proteina)} g · Carbohidratos{" "}
          {round(totals.carbos)} g · Grasas {round(totals.grasas)} g
        </p>

        {COMIDAS.map((comida) => {
          const items = dayMeals.filter((meal) => meal.comida === comida);
          if (items.length === 0) return null;
          return (
            <div key={comida} className={style.group}>
              <h3>{comida}</h3>
              <ul className={style.list}>
                {items.map((meal) => (
                  <li key={meal.id}>
                    <span>
                      {meal.nombre} · {meal.gramos} g
                      <small>
                        {round(meal.calorias)} kcal · P {round(meal.proteina)} ·
                        C {round(meal.carbos)} · G {round(meal.grasas)}
                      </small>
                    </span>
                    <button
                      type="button"
                      className={style.linkBtn}
                      onClick={() => removeMeal(meal.id)}
                      aria-label={`Eliminar ${meal.nombre}`}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {dayMeals.length === 0 && (
          <p className={style.muted}>Aún no registraste comidas este día.</p>
        )}
      </section>
    </div>
  );
};

export default FoodLog;
