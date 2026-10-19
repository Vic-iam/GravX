import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  emptyProfile,
  formatDate,
  newId,
  resizeImage,
  today,
  useUserData,
  type Measurement,
  type ProgressPhoto,
  type Profile,
} from "../../utils/userData";
import style from "../../routes/Style/Dashboard.module.css";

const OBJETIVOS = ["Perder grasa", "Mantener", "Ganar músculo"];
const MAX_PHOTOS = 8;

const blankMeasure = { peso: "", cintura: "", pecho: "", brazo: "", cadera: "" };

const ProfilePanel = ({ userId }: { userId: string }) => {
  const { user, logout } = useAuth0();
  const [stored, setProfile] = useUserData<Profile>(userId, "profile", emptyProfile);
  const [measures, setMeasures] = useUserData<Measurement[]>(userId, "measures", []);
  const [photos, setPhotos] = useUserData<ProgressPhoto[]>(userId, "photos", []);

  const [form, setForm] = useState<Profile>({
    ...stored,
    nombre: stored.nombre || user?.name || "",
  });
  const [measure, setMeasure] = useState(blankMeasure);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const avatar = form.foto || user?.picture || "";
  const sortedMeasures = [...measures].sort((a, b) => b.fecha.localeCompare(a.fecha));

  const notify = (text: string) => {
    setError("");
    setMessage(text);
  };
  const fail = (text: string) => {
    setMessage("");
    setError(text);
  };

  const saveProfile = (next: Profile) => {
    if (!setProfile(next)) {
      fail("No se pudo guardar: el almacenamiento del navegador está lleno.");
      return false;
    }
    return true;
  };

  const handleAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const foto = await resizeImage(file, 256);
      const next = { ...form, foto };
      if (saveProfile(next)) {
        setForm(next);
        notify("Foto de perfil actualizada.");
      }
    } catch (err) {
      fail(err instanceof Error ? err.message : "No se pudo cargar la foto.");
    }
  };

  const handleProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saveProfile({ ...form, nombre: form.nombre.trim() })) {
      notify("Perfil guardado.");
    }
  };

  const handleMeasure = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entry = {
      peso: Number(measure.peso) || 0,
      cintura: Number(measure.cintura) || 0,
      pecho: Number(measure.pecho) || 0,
      brazo: Number(measure.brazo) || 0,
      cadera: Number(measure.cadera) || 0,
    };
    if (Object.values(entry).every((value) => value === 0)) {
      fail("Completa al menos una medida.");
      return;
    }

    const saved = setMeasures((current) => [
      ...current,
      { id: newId(), fecha: today(), ...entry },
    ]);
    if (!saved) {
      fail("No se pudo guardar: el almacenamiento del navegador está lleno.");
      return;
    }
    setMeasure(blankMeasure);
    notify("Medidas registradas.");
  };

  const handlePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (photos.length >= MAX_PHOTOS) {
      fail(`Puedes guardar hasta ${MAX_PHOTOS} fotos de progreso. Elimina alguna.`);
      return;
    }

    try {
      const src = await resizeImage(file, 640, 0.7);
      const saved = setPhotos((current) => [
        ...current,
        { id: newId(), fecha: today(), src },
      ]);
      if (saved) notify("Foto de progreso agregada.");
      else fail("No hay espacio suficiente para guardar la foto.");
    } catch (err) {
      fail(err instanceof Error ? err.message : "No se pudo cargar la foto.");
    }
  };

  const field =
    (key: keyof Profile) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });

  return (
    <div className={style.grid}>
      <section className={style.card}>
        <h2>Mi perfil</h2>
        <div className={style.avatarRow}>
          {avatar ? (
            <img className={style.avatarLarge} src={avatar} alt="Foto de perfil" />
          ) : (
            <div className={style.avatarLarge} aria-hidden="true" />
          )}
          <label className={style.secondaryBtn}>
            Cambiar foto
            <input type="file" accept="image/*" hidden onChange={handleAvatar} />
          </label>
        </div>

        <form className={style.form} onSubmit={handleProfile}>
          <label>
            Nombre
            <input value={form.nombre} onChange={field("nombre")} />
          </label>
          <div className={style.row}>
            <label>
              Altura (cm)
              <input type="number" min="0" value={form.altura} onChange={field("altura")} />
            </label>
            <label>
              Objetivo
              <select value={form.objetivo} onChange={field("objetivo")}>
                {OBJETIVOS.map((objetivo) => (
                  <option key={objetivo}>{objetivo}</option>
                ))}
              </select>
            </label>
          </div>
          <h3>Metas diarias</h3>
          <div className={style.row}>
            <label>
              Calorías
              <input type="number" min="0" value={form.metaCalorias} onChange={field("metaCalorias")} />
            </label>
            <label>
              Proteína (g)
              <input type="number" min="0" value={form.metaProteina} onChange={field("metaProteina")} />
            </label>
          </div>
          <div className={style.row}>
            <label>
              Carbohidratos (g)
              <input type="number" min="0" value={form.metaCarbos} onChange={field("metaCarbos")} />
            </label>
            <label>
              Grasas (g)
              <input type="number" min="0" value={form.metaGrasas} onChange={field("metaGrasas")} />
            </label>
          </div>
          <button className={style.primaryBtn} type="submit">
            Guardar perfil
          </button>
        </form>
        {message && <p className={style.success} role="status">{message}</p>}
        {error && <p className={style.error} role="alert">{error}</p>}

        <button
          type="button"
          className={style.secondaryBtn}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Cerrar sesión
        </button>
      </section>

      <section className={style.card}>
        <h2>Medidas y peso</h2>
        <form className={style.form} onSubmit={handleMeasure}>
          <div className={style.row}>
            <label>
              Peso (kg)
              <input type="number" min="0" step="any" value={measure.peso} onChange={(e) => setMeasure({ ...measure, peso: e.target.value })} />
            </label>
            <label>
              Cintura (cm)
              <input type="number" min="0" step="any" value={measure.cintura} onChange={(e) => setMeasure({ ...measure, cintura: e.target.value })} />
            </label>
          </div>
          <div className={style.row}>
            <label>
              Pecho (cm)
              <input type="number" min="0" step="any" value={measure.pecho} onChange={(e) => setMeasure({ ...measure, pecho: e.target.value })} />
            </label>
            <label>
              Brazo (cm)
              <input type="number" min="0" step="any" value={measure.brazo} onChange={(e) => setMeasure({ ...measure, brazo: e.target.value })} />
            </label>
            <label>
              Cadera (cm)
              <input type="number" min="0" step="any" value={measure.cadera} onChange={(e) => setMeasure({ ...measure, cadera: e.target.value })} />
            </label>
          </div>
          <button className={style.primaryBtn} type="submit">
            Registrar medidas
          </button>
        </form>

        {sortedMeasures.length > 0 && (
          <div className={style.tableWrap}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Peso</th>
                  <th>Cintura</th>
                  <th>Pecho</th>
                  <th>Brazo</th>
                  <th>Cadera</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {sortedMeasures.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.fecha)}</td>
                    <td>{item.peso || "-"}</td>
                    <td>{item.cintura || "-"}</td>
                    <td>{item.pecho || "-"}</td>
                    <td>{item.brazo || "-"}</td>
                    <td>{item.cadera || "-"}</td>
                    <td>
                      <button
                        type="button"
                        className={style.linkBtn}
                        onClick={() =>
                          setMeasures((current) => current.filter((m) => m.id !== item.id))
                        }
                        aria-label="Eliminar medida"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2>Fotos de progreso</h2>
        <label className={style.secondaryBtn}>
          Subir foto
          <input type="file" accept="image/*" hidden onChange={handlePhoto} />
        </label>
        <div className={style.photos}>
          {photos.map((photo) => (
            <figure key={photo.id}>
              <img src={photo.src} alt={`Progreso ${formatDate(photo.fecha)}`} />
              <figcaption>
                {formatDate(photo.fecha)}
                <button
                  type="button"
                  className={style.linkBtn}
                  onClick={() =>
                    setPhotos((current) => current.filter((p) => p.id !== photo.id))
                  }
                >
                  Eliminar
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePanel;
