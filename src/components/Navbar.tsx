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
                    <li><Link to="/">Inicio</Link></li> 
                    <li><Link to="/Nutrition">Alimentos</Link></li>
                    <li><Link to="/Workouts">Rutinas</Link></li>
                    <li><Link to="/Calculator">Calculadora</Link></li>
                </div>

                <div className={style.LinksDate}>
                    <li><Link to="/Login">Iniciar Sesion </Link></li>
                    <li><Link to="/Register">Registrate</Link></li>
                </div>

            </nav>
        </header>

    );
}

export default Navbar;