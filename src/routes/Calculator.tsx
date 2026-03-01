
import Aurora from "../components/Aurora";
import Loading from "../components/Loading";
import style from "./Style/Calculator.module.css";
import { useState, useEffect } from "react";


const  Calculator = () => {

  const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

    return (
<>
       { isLoading ? <Loading text="...Cargando datos" /> :
        <div className={style.calculatorBody}>

          <section className={style.presentationCalculator}>
            <div className={style.auroraBg}>
              <Aurora
                colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
                />
            </div>

            <div className={style.calculatorContainer}>

                <h1>Calculadora de peso</h1>

            </div>

          </section>

        </div>}

                </>
    );
}

export default Calculator;