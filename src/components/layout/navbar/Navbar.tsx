import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

import Logo from "../../../assets/marcaGravX.png";
import DarkMode from "../../ui/DarkMode/DarkMode";
import style from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? style.activeLink : "";

  return (
    <header className={`${style.header} ${!showNavbar ? style.hide : ""}`}>
      <nav className={style.navbar}>
        <Link to="/" className={style.imageLogo}>
          <img src={Logo} alt="Logo GravX" />
        </Link>

        {isOpen && <div className={style.backdrop}></div>}

        <div
          ref={menuRef}
          className={`${style.menuLinks} ${isOpen ? style.open : ""}`}
        >
          <ul className={style.links}>
            <li><NavLink to="/" className={activeClass} onClick={closeMenu}>Inicio</NavLink></li>
            <li><NavLink to="/Nutrition" className={activeClass} onClick={closeMenu}>Alimentación</NavLink></li>
            <li><NavLink to="/Workouts" className={activeClass} onClick={closeMenu}>Rutinas</NavLink></li>
            <li><NavLink to="/Calculator" className={activeClass} onClick={closeMenu}>Calculadora</NavLink></li>
          </ul>

          <div className={style.actions}>
            <NavLink to="/Login" className={style.loginBtn} onClick={closeMenu}>
              <FaUser />
              Login
            </NavLink>
            <DarkMode />
          </div>
        </div>

        <button className={style.itemToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
