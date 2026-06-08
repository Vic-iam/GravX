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
    </div>
  );
};

export default Calculator;
