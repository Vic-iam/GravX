import Aurora from "../components/Aurora";
import style from "./Style/Home.module.css"


const Home = () => {


    return (

        <div className={style.homeBody}>

            <div style={{width: "100%", height: "800px"}}>
                <Aurora
                    colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>
              
        </div>
    );
}

export default Home;