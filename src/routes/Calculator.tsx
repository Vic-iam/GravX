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

    const resultado = pesoNum / (alturaNum * alturaNum);

    setImc(Number(resultado.toFixed(2)));

    if (resultado < 18.5) {
      setCategoria("Bajo peso");
    } else if (resultado < 25) {
      setCategoria("Peso normal");
    } else if (resultado < 30) {
      setCategoria("Sobrepeso");
    } else {
      setCategoria("Obesidad");
    }
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
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />

        <input
          type="number"
          placeholder="Altura (cm)"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
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

        <h3>Interpretación de resultados</h3>

        <div className={style.table}>
          <div className={style.thead}>
              <th>IMC</th>
              <th>Clasificación</th>
          </div>
          <tbody>
              <td>Menor a 18.5</td>
              <td>Bajo peso</td>
              <td>18.5 - 24.9</td>
              <td>Peso normal</td>
              <td>25 - 29.9</td>
              <td>Sobrepeso</td>
              <td>30 o más</td>
              <td>Obesidad</td>
          </tbody>
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
