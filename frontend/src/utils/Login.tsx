import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaAppleAlt, FaChartLine, FaDumbbell } from "react-icons/fa";
import Loading from "../components/ui/Loading/Loading";
import Logo from "../assets/marcaGravX.png";
import style from "./Style/Login.module.css";

const BENEFITS = [
  { icon: <FaAppleAlt />, text: "Registra tus comidas y controla tus macros" },
  { icon: <FaDumbbell />, text: "Anota tus entrenamientos y rutinas" },
  { icon: <FaChartLine />, text: "Sigue tu peso, medidas y fotos de progreso" },
];

const Login = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();

  if (isLoading) return <Loading text="...Cargando datos" />;
  if (isAuthenticated) return <Navigate to="/Dashboard" replace />;

  const login = (signup = false) =>
    loginWithRedirect({
      appState: { returnTo: "/Dashboard" },
      ...(signup && { authorizationParams: { screen_hint: "signup" } }),
    });

  return (
    <section className={style.loginContainer}>
      <div className={style.loginCard}>
        <img className={style.logo} src={Logo} alt="GravX" />

        <div className={style.heading}>
          <h1>Bienvenido</h1>
          <p>Inicia sesión para continuar con tu progreso.</p>
        </div>

        <ul className={style.benefits}>
          {BENEFITS.map(({ icon, text }) => (
            <li key={text}>
              <span className={style.benefitIcon}>{icon}</span>
              {text}
            </li>
          ))}
        </ul>

        {error && (
          <p className={style.formMessage} role="alert">
            No se pudo iniciar sesión. Inténtalo de nuevo.
          </p>
        )}

        <div className={style.actions}>
          <button
            type="button"
            className={style.btnPrimary}
            onClick={() => login()}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={style.btnSecondary}
            onClick={() => login(true)}
          >
            Crear cuenta
          </button>
        </div>

        <p className={style.note}>
          ¿Olvidaste tu contraseña? Podrás recuperarla en la pantalla de acceso.
        </p>
      </div>
    </section>
  );
};

export default Login;
