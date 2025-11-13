import style from "./Style/Footer.module.css"
import Logo from "../assets/marcaGravX.png";
import { Link } from "react-router";

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
                            <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Inicio</Link></li>
                            <li><Link to="/Nutrition" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Alimentacion</Link></li>
                            <li><Link to="/Workouts" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Rutinas</Link></li>
                            <li><Link to="/Calculator" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Calculadora</Link></li>
                        </ul>
                    </div>

                    <div className={style.sobreGravx}>
                     <h3>"GravX es una plataforma educativa para mejorar tus hábitos alimenticios y rutinas de entrenamiento."</h3>
                     <p>Version "v1.0.0" </p> 
                     <p>Hecho con React</p>
                    </div>

                    <div className={style.contact}>
                     <h4>Contactos</h4>
                     <p>¿Tienes sugerencias o quieres reportar algún error?</p>
                     <h5>Contactame</h5>
                     <div className={style.linkGmail}>
                     <a href="mailto:josevicentevitriago12@gmail.com">Escribeme por correo</a>
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