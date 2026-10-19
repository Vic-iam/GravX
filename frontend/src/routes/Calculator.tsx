import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import style from "./Style/Calculator.module.css";
import { Link } from "react-router";
import Loading from "../components/ui/Loading/Loading";
import {
  addMeasurement,
  emptyProfile,
  readUserData,
  writeUserData,
} from "../utils/userData";
import type { Measurement, Profile } from "../utils/userData";

const IMC_MIN = 10;
const IMC_MAX = 40;

const consejos: Record<string, string> = {
  "Bajo peso":
    "Un superávit calórico con proteína suficiente y entrenamiento de fuerza te ayudará a ganar masa de forma saludable.",
  "Peso normal":
    "Mantén tus hábitos y entrena de forma constante para conservar tu composición corporal.",
  Sobrepeso:
    "Combina actividad física regular con una alimentación equilibrada para avanzar hacia un rango saludable.",
  Obesidad:
    "Empieza de forma gradual y consulta a un profesional de la salud para armar un plan seguro.",
};

const Calculator = () => {
  const { user } = useAuth0();
  const userId = user?.sub;
  const [isLoading, setIsLoading] = useState(true);
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<{
    imc: number;
    categoria: string;
    pesoMin: number;
    pesoMax: number;
  } | null>(null);
  const [error, setError] = useState<{
    field: "peso" | "altura";
    message: string;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Si hay sesión, se precargan el peso y la altura guardados en el perfil.
  useEffect(() => {
    if (!userId) return;
    const profile = readUserData<Profile>(userId, "profile", emptyProfile);
    const measures = readUserData<Measurement[]>(userId, "measures", []);
    const lastWeight = [...measures].reverse().find((m) => m.peso > 0)?.peso;
    const heightCm = Number(profile.altura);
    if (lastWeight) setPeso(String(lastWeight));
    if (heightCm > 0) setAltura(String(heightCm / 100));
  }, [userId]);

  if (isLoading) return <Loading text="...Cargando calculadora" />;

  const guardarEnPerfil = () => {
    const pesoNum = Number(peso);
    const alturaM = Number(altura);
    if (!userId || !resultado) return;
    const profile = readUserData<Profile>(userId, "profile", emptyProfile);
    const ok =
      writeUserData<Profile>(userId, "profile", {
        ...profile,
        altura: String(Math.round(alturaM * 100)),
      }) && addMeasurement(userId, { peso: pesoNum });
    if (ok) toast.success("Peso y altura guardados en tu perfil");
    else toast.error("No se pudo guardar: el almacenamiento está lleno.");
  };

  const calcularIMC = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pesoNum = Number(peso);
    const alturaM = Number(altura);

    if (!peso || !Number.isFinite(pesoNum) || pesoNum < 20 || pesoNum > 300) {
      setError({
        field: "peso",
        message: "Ingresa un peso válido entre 20 y 300 kg.",
      });
      return;
    }

    if (!altura || !Number.isFinite(alturaM) || alturaM < 0.5 || alturaM > 2.5) {
      setError({
        field: "altura",
        message: "Ingresa una altura válida entre 0,5 y 2,5 m.",
      });
      return;
    }

    const imcCalculado = Number((pesoNum / (alturaM * alturaM)).toFixed(2));

    let categoria: string;

    if (imcCalculado < 18.5) {
      categoria = "Bajo peso";
    } else if (imcCalculado < 25) {
      categoria = "Peso normal";
    } else if (imcCalculado < 30) {
      categoria = "Sobrepeso";
    } else {
      categoria = "Obesidad";
    }

    setResultado({
      imc: imcCalculado,
      categoria,
      pesoMin: 18.5 * alturaM * alturaM,
      pesoMax: 24.9 * alturaM * alturaM,
    });
    setError(null);
  };

  const limpiarCalculadora = () => {
    setPeso("");
    setAltura("");
    setResultado(null);
    setError(null);
  };

  return (
    <div className={style.calculatorBody}>
      <form
        className={style.presentationCalculator}
        onSubmit={calcularIMC}
        noValidate
      >
        <h1>Calculadora IMC</h1>
        <p className={style.subtitle}>
          {userId
            ? "Tu peso y altura se toman de tu perfil y puedes guardar el resultado en él."
            : "Es gratis. Inicia sesión si quieres guardar tus datos en tu perfil."}
        </p>

        <label htmlFor="peso">Peso (kg)</label>
        <input
          id="peso"
          type="number"
          min="20"
          max="300"
          step="any"
          value={peso}
          onChange={(event) => {
            setPeso(event.target.value);
            setResultado(null);
            setError(null);
          }}
          aria-invalid={error?.field === "peso"}
          aria-describedby={error?.field === "peso" ? "peso-error" : undefined}
        />

        <label htmlFor="altura">Altura (m)</label>
        <input
          id="altura"
          type="number"
          min="0.5"
          max="2.5"
          step="any"
          value={altura}
          onChange={(event) => {
            setAltura(event.target.value);
            setResultado(null);
            setError(null);
          }}
          aria-invalid={error?.field === "altura"}
          aria-describedby={
            error?.field === "altura" ? "altura-error" : undefined
          }
        />

        {error && (
          <p
            className={style.error}
            id={`${error.field}-error`}
            role="alert"
          >
            {error.message}
          </p>
        )}

        <div className={style.btn}>
          <button type="submit">Calcular</button>

          <button type="button" onClick={limpiarCalculadora}>
            Limpiar
          </button>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {resultado !== null && (
            <div className={style.result}>
              <span className={style.resultLabel}>Tu IMC</span>
              <h2>{resultado.imc.toFixed(2)}</h2>
              <p className={style.resultCategory}>{resultado.categoria}</p>

              <div className={style.scale} aria-hidden="true">
                <div className={style.scaleBar}>
                  <span style={{ flex: 8.5 }} />
                  <span style={{ flex: 6.5 }} />
                  <span style={{ flex: 5 }} />
                  <span style={{ flex: 10 }} />
                </div>
                <div
                  className={style.marker}
                  style={{
                    left: `${
                      Math.min(
                        Math.max(
                          (resultado.imc - IMC_MIN) / (IMC_MAX - IMC_MIN),
                          0,
                        ),
                        1,
                      ) * 100
                    }%`,
                  }}
                />
              </div>

              <p className={style.range}>
                Para tu altura, el rango de peso saludable es de{" "}
                <strong>
                  {resultado.pesoMin.toFixed(1)} a {resultado.pesoMax.toFixed(1)}{" "}
                  kg
                </strong>
                .
              </p>
              <p className={style.tip}>{consejos[resultado.categoria]}</p>

              <div className={style.nextSteps}>
                {userId ? (
                  <button type="button" onClick={guardarEnPerfil}>
                    Guardar en mi perfil
                  </button>
                ) : (
                  <Link to="/Login">Inicia sesión para guardar</Link>
                )}
                <Link to="/Workouts">Ver rutinas</Link>
                <Link to="/Nutrition">Ver alimentación</Link>
              </div>
            </div>
          )}
        </div>
      </form>

      <section className={style.infoSection}>
        <h2>¿Qué es el IMC?</h2>

        <p>
          El Índice de Masa Corporal (IMC) es una medida que relaciona el peso y
          la altura de una persona para estimar si se encuentra dentro de un
          rango saludable.
        </p>

        <h3>¿Para qué sirve?</h3>

        <ul>
          <li>Evaluar si tu peso es adecuado para tu altura.</li>
          <li>Detectar posibles riesgos asociados al bajo peso o sobrepeso.</li>
          <li>Llevar un seguimiento de tu estado físico.</li>
          <li>Establecer objetivos de salud y entrenamiento.</li>
        </ul>

        <h3>Recomendaciones</h3>

        <ul>
          <li>Mantén una alimentación equilibrada.</li>
          <li>Realiza actividad física regularmente.</li>
          <li>Duerme entre 7 y 9 horas diarias.</li>
          <li>
            Consulta a un profesional de la salud para una evaluación completa.
          </li>
        </ul>
        <h3>Interpretación de resultados</h3>

        <div className={style.table}>
          <div className={style.thead}>
            <span>IMC</span>
            <span>Clasificación</span>
          </div>
          <div className={style.tbody}>
            <div className={style.tr}>
              <span>Menor a 18.5</span>
              <span>Bajo peso</span>
            </div>
            <div className={style.tr}>
              <span>18.5 - 24.9</span>
              <span>Peso normal</span>
            </div>
            <div className={style.tr}>
              <span>25 - 29.9</span>
              <span>Sobrepeso</span>
            </div>
            <div className={style.tr}>
              <span>30 o más</span>
              <span>Obesidad</span>
            </div>
          </div>
        </div>

        <p>
          <strong>Importante:</strong> El IMC es una referencia general y no
          distingue entre masa muscular y grasa corporal. Personas con gran
          cantidad de músculo, como atletas o fisicoculturistas, pueden tener un
          IMC elevado sin que esto implique un exceso de grasa.
        </p>
      </section>
    </div>
  );
};

export default Calculator;
