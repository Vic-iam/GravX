import { Link } from "react-router-dom";
import Logo from "../../../assets/marcaGravX.png";
import style from "./Footer.module.css";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        
        {/* LOGO */}
        <div className={style.imageLogo}>
          <Link to="/" onClick={scrollTop}>
            <img src={Logo} alt="Logo GravX" />
          </Link>
        </div>

        {/* LINKS */}
        <div className={style.linkFooter}>
          <h2>Enlaces</h2>
          <ul>
            <li><Link to="/" onClick={scrollTop}>Inicio</Link></li>
            <li><Link to="/Nutrition" onClick={scrollTop}>Alimentación</Link></li>
            <li><Link to="/Workouts" onClick={scrollTop}>Rutinas</Link></li>
            <li><Link to="/Calculator" onClick={scrollTop}>Calculadora</Link></li>
          </ul>
        </div>

        {/* ABOUT */}
        <div className={style.about}>
          <h3>
            GravX es una plataforma educativa para mejorar tus hábitos
            alimenticios y rutinas de entrenamiento.
          </h3>
          <p>Versión v1.0.0</p>
          <p>Hecho con React</p>
        </div>

        {/* CONTACT */}
        <div className={style.contact}>
          <h4>Contacto</h4>
          <p>¿Tienes sugerencias o quieres reportar algún error?</p>

          <a href="mailto:josevicentevitriago12@gmail.com" className={style.mailBtn}>
            Escríbeme por correo
          </a>
        </div>
      </div>

      <div className={style.copy}>
        <p>© 2025 GravX. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
