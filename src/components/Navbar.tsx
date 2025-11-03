import Logo from "../assets/marcaGravX.png"
import style from "./Style/Navbar.module.css"
import { Link } from "react-router";

const Navbar = () => {
    return (

        <header>
            <nav>

                <div className={style.imageLogo}>
                   <Link to="/"><img src={Logo} alt="Logo" /></Link> 
                </div>

                <div className={style.Links}>
                    <Link to="/">Inicio</Link> 
                    <Link to="/Nutrition">Alimentos</Link>
                    <Link to="/Workouts">Rutinas</Link>
                    <Link to="/Calculator">Calculadora</Link>
                </div>

                <div className={style.LinksDate}>
                    <Link to="/Login">Iniciar Sesion </Link>
                    <Link to="/Register">Registrate</Link>
                </div>

            </nav>
        </header>

    );
}

export default Navbar;