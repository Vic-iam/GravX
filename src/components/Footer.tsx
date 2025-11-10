import style from "./Style/Footer.module.css"
import Logo from "../assets/marcaGravX.png";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer>

            <div className={style.footerContainer}>
                <div className={style.imageLogo}>
                    <Link to="/">
                        <img src={Logo} alt="Logo GravX" />
                    </Link>
                </div>
                <div className={style.linkFooter}>
                    <Link to="/">Inicio</Link>
                    <Link to="/">Alimentacion</Link>
                    <Link to="/">Rutinas</Link>
                    <Link to="/">Calculadora</Link>
                </div>
                <div>
                    <h1> © 2025 GravX. Todos los derechos reservados. </h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer