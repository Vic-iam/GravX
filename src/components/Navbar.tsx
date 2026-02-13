import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/marcaGravX.png";
import style from "./Style/Navbar.module.css";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeClass = ({ isActive }: any) =>
    isActive ? style.activeLink : "";

  return (
    <header className={style.header}>
      <div className={style.navbar}>
        <Link to="/" className={style.imageLogo}>
          <img src={Logo} alt="Logo GravX" />
        </Link>

        {isOpen && <div className={style.backdrop} />}

        <div
          ref={menuRef}
          className={`${style.menuLinks} ${isOpen ? style.open : ""}`} >
          <ul className={style.Links}>
            <li><NavLink to="/" className={activeClass} onClick={handleLinkClick}>Inicio</NavLink></li>
            <li><NavLink to="/Nutrition" className={activeClass} onClick={handleLinkClick}>Alimentación</NavLink></li>
            <li><NavLink to="/Workouts" className={activeClass} onClick={handleLinkClick}>Rutinas</NavLink></li>
            <li><NavLink to="/Calculator" className={activeClass} onClick={handleLinkClick}>Calculadora</NavLink></li>


          </ul>

          <div className={style.loginBlock}>
            <NavLink to="/Login" className={activeClass} onClick={handleLinkClick}>
              <FaUser /> Login
            </NavLink>
          </div>
        </div>

        <button
          className={style.itemToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
