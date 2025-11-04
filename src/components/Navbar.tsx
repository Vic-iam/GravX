import { useEffect, useState } from "react";
import { Link } from "react-router"
import Logo from "../assets/marcaGravX.png";
import style from "./Style/Navbar.module.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <header className={style.header}>
            <div className={style.navbar}>
                <div className={style.imageLogo}>
                    <Link to="/">
                        <img src={Logo} alt="Logo GravX" />
                    </Link>
                </div>

                {/* Links principales */}
                <div
                    className={`${style.menuLinks} ${isOpen ? style.open : ""}`}
                    onClick={() => setIsOpen(false)}
                >
                    <ul className={style.Links}>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/Nutrition">Alimentos</Link></li>
                        <li><Link to="/Workouts">Rutinas</Link></li>
                        <li><Link to="/Calculator">Calculadora</Link></li>
                    </ul>
                </div>
                <ul className={style.LinksDate}>
                    <li><Link to="/Login">Iniciar Sesión</Link></li>
                    <li><Link to="/Register">Regístrate</Link></li>
                </ul>


                {/* Botón hamburguesa */}
                <div
                    className={`${style.itemToggle} ${isOpen ? style.open : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
