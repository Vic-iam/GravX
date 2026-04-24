import style from "./Error.module.css";
import errorImage from "../../../assets/error.png";

const Error = () => {
  return (
    <div className={style.containerError}>
      <div className={style.auroraBg}></div>

      <div className={style.errorInformation}>
        <h1>Búsqueda no encontrada</h1>
        <p>No pudimos encontrar resultados para tu búsqueda.</p>
        <img src={errorImage} alt="Error" />
      </div>
    </div>
  );
};

export default Error;
