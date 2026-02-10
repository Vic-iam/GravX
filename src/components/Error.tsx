import Aurora from "./Aurora"
import style from "./Style/Error.module.css"
import errorImage from "../assets/error.png"


const Error = () => {
    return (
        <div className={style.containerError}>

            <div className={style.auroraBg}>
                <Aurora
                    colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            <div className={style.errorInformation}>
                <h1>Busqueda no encontrada</h1>

                <img src={errorImage} alt="Error" />

            </div>


        </div>
    )
}

export default Error