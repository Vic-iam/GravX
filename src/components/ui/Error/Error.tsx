import style from "./Error.module.css"
import errorImage from "../../../assets/error.png"


const Error = () => {
    return (
        <div className={style.containerError}>


            <div className={style.errorInformation}>
                <h1>Busqueda no encontrada</h1>

                <img src={errorImage} alt="Error" />

            </div>


        </div>
    )
}

export default Error