import { useEffect, useState } from "react";
import { Link } from "react-router"
import Logo from "../assets/marcaGravX.png";
import style from "./Style/Navbar.module.css";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleLinkClick = () => {
        setIsOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <header className={style.header}>
            <div className={style.navbar}>
                <div className={style.imageLogo}>
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <img src={Logo} alt="Logo GravX" />
                    </Link>
                </div>

                <div
                    className={`${style.menuLinks} ${isOpen ? style.open : ""}`}
                    onClick={() => setIsOpen(false)}
                >
                    <ul className={style.Links}>
                        <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
                        <li><Link to="/Nutrition" onClick={handleLinkClick}>Alimentacion</Link></li>
                        <li><Link to="/Workouts" onClick={handleLinkClick}>Rutinas</Link></li>
                        <li><Link to="/Calculator" onClick={handleLinkClick}>Calculadora</Link></li>
                        <div className={style.linea}></div>
                        <div className={style.linksDateToggle}>
                            <div className={style.loginStyleToggle}>
                                <li><Link to="/Login" onClick={handleLinkClick}><FaUser />Iniciar Sesión</Link></li>
                                <li><Link to="/Register" onClick={handleLinkClick}>Registrate</Link></li>
                            </div>
                        </div>
                    </ul>
                </div>
                <ul className={style.LinksDate}>
                    <div className={style.loginStyle}>
                        <li><Link to="/Login" onClick={handleLinkClick}><FaUser />Iniciar Sesión</Link></li>
                        <li><Link to="/Register" onClick={handleLinkClick}>Registrate</Link></li>
                    </div>
                </ul>


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
