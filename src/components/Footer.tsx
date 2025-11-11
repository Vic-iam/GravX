import style from "./Style/Footer.module.css"
import Logo from "../assets/marcaGravX.png";
import { Link } from "react-router";
import { FaReact } from "react-icons/fa";

const Footer = () => {
    return (

        <>
            <footer>

                <div className={style.footerContainer}>
                    <div className={style.imageLogo}>
                        <Link to="/">
                            <img src={Logo} alt="Logo GravX" />
                        </Link>
                    </div>
                    <div className={style.linkFooter}>
                        <h2>Enlances</h2>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/Nutrition">Alimentacion</Link></li>
                            <li><Link to="/Workouts">Rutinas</Link></li>
                            <li><Link to="/Calculator">Calculadora</Link></li>
                        </ul>
                    </div>
                    <div className={style.sobreGravx}>
                     <h3>"GravX es una plataforma educativa para mejorar tus hábitos alimenticios y rutinas de entrenamiento."</h3>
                     <p>Version "v1.0.0" </p> 
                     <p>Hecho con React - Vite <FaReact /></p>
                    </div>
                    <div className={style.contact}>
                     <h4>Contactos</h4>
                     <p>¿Tienes sugerencias o quieres reportar algún error?</p>
                     <h5>Contactame</h5>
                     <div className={style.linkGmail}>
                     <a href="mailto:josevicentevitriago12@gmail.com">josevicentevitriago12@gmail.com</a>
                     </div>
                    </div>
                </div>
            </footer>
            <div className={style.copy}>
                <h1> © 2025 GravX. Todos los derechos reservados. </h1>
            </div>
        </>
    )
}

export default Footer