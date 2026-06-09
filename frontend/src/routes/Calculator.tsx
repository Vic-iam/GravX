import { useState, useEffect } from "react";
import style from "./Style/Calculator.module.css";
import Loading from "../components/ui/Loading/Loading";

const Calculator = () => {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState<number | null>(null);
  const [categoria, setCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading text="...Cargando datos" />;

const calcularIMC = () => {
  const pesoNum = Number(peso);
  const alturaNum = Number(altura) / 100;

  if (!pesoNum || !alturaNum) return;

  if (
    pesoNum < 20 ||
    pesoNum > 300 ||
    alturaNum < 0.5 ||
    alturaNum > 2.5
  ) {
    return;
  }

  const resultado = pesoNum / (alturaNum * alturaNum);

  setImc(Number(resultado.toFixed(2)));
};

  const limpiarCalculadora = () => {
    setPeso("");
    setAltura("");
    setImc(null);
    setCategoria("");
  };

  return (
    <div className={style.calculatorBody}>
      <div className={style.presentationCalculator}>
        <h1>Calculadora IMC</h1>

        <input
          type="text"
          inputMode="numeric"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");

            if (value === "" || Number(value) <= 300) {
              setPeso(value);
            }
          }}
        />
        <input
          type="text"
          inputMode="decimal"
          placeholder="Altura (m)"
          value={altura}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.]/g, "");

            if (
              value === "" ||
              (Number(value) >= 0.5 && Number(value) <= 2.5)
            ) {
              setAltura(value);
            }
          }}
        />

        <div className={style.btn}>
          <button onClick={calcularIMC}>Calcular</button>

          <button onClick={limpiarCalculadora}>Limpiar</button>
        </div>

        {imc !== null && (
          <div>
            <h2>IMC: {imc}</h2>
            <p>{categoria}</p>
          </div>
        )}
      </div>

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
