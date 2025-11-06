import Aurora from "../components/Aurora";
import style from "./Style/Home.module.css"


const Home = () => {



    return (

        <div className={style.homeBody}>

            <div style={{ width: "100%", height: "800px", position: "relative" }}>
                <Aurora
                    colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            <div className={style.titleHome}>
                <h1>Bienvenido a GravX</h1>
                <p>Esta pagina te proporciona rutinas,alimentacion y mejores alimentos para mejorar tu fisico</p>
            </div>


            <div className={style.calHome}>
                <h2>Usa la calculadora IMC</h2>
            </div>

            <div>
                <div>
                    <h3>Hola</h3>
                </div>
            </div>

        </div>




    );
}

export default Home;