import Loading from "../components/ui/Loading/Loading";
import style from "./Style/Calculator.module.css";
import { useState, useEffect } from "react";

const Calculator = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading text="...Cargando datos" />
      ) : (
        <div className={style.calculatorBody}>
          <section className={style.presentationCalculator}>
            <div className={style.calculatorContainer}>
              <h1>Calculadora de peso</h1>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Calculator;
