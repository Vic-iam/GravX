import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import type { AlimentoItem } from "../../../data/nutrition";
import { COMIDAS, addMeal, today } from "../../../utils/userData";
import style from "./AddToDiary.module.css";

const round = (value: number) => Math.round(value * 10) / 10;

const AddToDiary = ({ item }: { item: AlimentoItem }) => {
  const { isAuthenticated, user } = useAuth0();
  const [open, setOpen] = useState(false);
  const [comida, setComida] = useState(COMIDAS[0]);
  const [gramos, setGramos] = useState("100");

  const userId = user?.sub;
  if (!isAuthenticated || !userId) {
    return (
      <Link className={style.loginLink} to="/Login">
        Inicia sesión para registrar
      </Link>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const grams = Number(gramos);
    if (!(grams > 0)) {
      toast.error("Indica una cantidad en gramos mayor a 0.");
      return;
    }

    const factor = grams / 100;
    const saved = addMeal(userId, {
      fecha: today(),
      comida,
      nombre: item.nombre,
      gramos: grams,
      calorias: round(item.calorias * factor),
      proteina: round(item.proteina * factor),
      carbos: round(item.carbos * factor),
      grasas: round(item.grasas * factor),
    });

    if (saved) {
      toast.success(`${item.nombre} agregado a tu diario (${comida})`);
      setOpen(false);
    } else {
      toast.error("No se pudo guardar: el almacenamiento está lleno.");
    }
  };

  if (!open) {
    return (
      <button type="button" className={style.addBtn} onClick={() => setOpen(true)}>
        + Agregar al diario
      </button>
    );
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <select
        aria-label="Comida"
        value={comida}
        onChange={(e) => setComida(e.target.value)}
      >
        {COMIDAS.map((nombre) => (
          <option key={nombre}>{nombre}</option>
        ))}
      </select>
      <input
        aria-label="Gramos"
        type="number"
        min="1"
        value={gramos}
        onChange={(e) => setGramos(e.target.value)}
      />
      <span>g</span>
      <button type="submit" className={style.addBtn}>
        Agregar
      </button>
      <button type="button" className={style.cancelBtn} onClick={() => setOpen(false)}>
        Cancelar
      </button>
    </form>
  );
};

export default AddToDiary;
