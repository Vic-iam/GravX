import style from "./Style/Home.module.css";

import { Link } from "react-router";
import { IoMdFitness } from "react-icons/io";
import { IoFitness } from "react-icons/io5";
import {
  FaCalculator,
  FaCheckCircle,
  FaChevronRight,
  FaMobileAlt,
  FaUserPlus,
} from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { GiSteak } from "react-icons/gi";
import { LuBicepsFlexed, LuSalad } from "react-icons/lu";

import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading/Loading";

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const quickAccess = [
  { to: "/Workouts", label: "Rutinas", icon: <IoMdFitness /> },
  { to: "/Workouts", label: "Ejercicios", icon: <IoFitness /> },
  { to: "/Calculator", label: "Calculadora", icon: <FaCalculator /> },
  { to: "/Nutrition", label: "Nutrición", icon: <GiSteak /> },
];

const features = [
  {
    icon: <LuBicepsFlexed />,
    title: "Rutinas organizadas",
    text: "Ejercicios clasificados por grupo muscular para que encuentres todo en segundos.",
  },
  {
    icon: <FaRepeat />,
    title: "Técnica correcta",
    text: "Aprendé la ejecución adecuada de cada ejercicio y entrená con más seguridad.",
  },
  {
    icon: <LuSalad />,
    title: "Nutrición útil",
    text: "Consultá alimentos y calculá tu metabolismo basal para complementar tu entrenamiento.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Desde cualquier lugar",
    text: "Una experiencia cómoda en celular, tablet o computadora, sin instalar nada.",
  },
];

const steps = [
  {
    title: "Conocé tu punto de partida",
    text: "Calculá tu IMC con tu peso y altura.",
  },
  {
    title: "Elegí tu rutina",
    text: "Explorá ejercicios por músculo o armá tu propia rutina.",
  },
  {
    title: "Cuidá tu alimentación",
    text: "Revisá la información nutricional y ajustá tus hábitos.",
  },
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading text="...Cargando datos" />;

  return (
    <div className={style.homeBody}>
      {/* HERO */}
      <section className={style.hero}>
        <div className={style.heroGlow} aria-hidden="true" />

        <div className={style.heroContent}>
          <span className={style.badge}>Gratis · Sin tarjeta de crédito</span>

          <h1>
            Transformá tu físico con <em>GravX</em>
          </h1>

          <p>
            Rutinas, ejercicios, nutrición y herramientas en un solo lugar para
            que entrenes con un plan claro y progreses sin complicarte.
          </p>

          <div className={style.heroButtons}>
            <Link to="/Workouts" onClick={scrollTop} className={style.primaryBtn}>
              Empezar ahora <FaChevronRight />
            </Link>

            <Link
              to="/Calculator"
              onClick={scrollTop}
              className={style.secondaryBtn}
            >
              Calcular mi IMC
            </Link>
          </div>

          <ul className={style.trustList}>
            <li>
              <FaCheckCircle aria-hidden="true" /> Sin registro para explorar
            </li>
            <li>
              <FaCheckCircle aria-hidden="true" /> 100% gratis
            </li>
            <li>
              <FaCheckCircle aria-hidden="true" /> Ejercicios por músculo
            </li>
          </ul>

          <div className={style.heroStats}>
            <div>
              <strong>+30</strong>
              <span>Ejercicios</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Grupos musculares</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Gratis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ACCESOS RÁPIDOS */}
      <nav className={style.quickAccess} aria-label="Accesos rápidos">
        {quickAccess.map(({ to, label, icon }) => (
          <Link key={label} to={to} onClick={scrollTop} className={style.quickCard}>
            <span className={style.quickIcon} aria-hidden="true">
              {icon}
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* BENEFICIOS */}
      <section className={style.section}>
        <header className={style.sectionHeader}>
          <h2>Todo lo que necesitás para progresar</h2>
          <p>Herramientas pensadas para que entrenar sea simple y cómodo.</p>
        </header>

        <div className={style.featureGrid}>
          {features.map(({ icon, title, text }) => (
            <article key={title} className={style.featureCard}>
              <span className={style.featureIcon} aria-hidden="true">
                {icon}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className={`${style.section} ${style.altSection}`}>
        <header className={style.sectionHeader}>
          <h2>Empezá en tres pasos</h2>
          <p>Sin vueltas: en pocos minutos ya tenés tu punto de partida.</p>
        </header>

        <ol className={style.steps}>
          {steps.map(({ title, text }, index) => (
            <li key={title} className={style.step}>
              <span className={style.stepNumber}>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CALCULADORA */}
      <section className={style.section}>
        <div className={`${style.promo} ${style.promoSplit}`}>
          <div className={style.promoText}>
            <h2>Conocé tu punto de partida</h2>
            <p>
              Calculá tu IMC y obtené una referencia rápida para comenzar tu
              transformación física.
            </p>

            <div className={style.pills}>
              <span>Resultado en segundos</span>
              <span>Solo peso y altura</span>
              <span>Conocé tu estado actual</span>
            </div>

            <Link
              to="/Calculator"
              onClick={scrollTop}
              className={style.primaryBtn}
            >
              Usar calculadora <FaChevronRight />
            </Link>
          </div>

          <div className={style.promoVisual} aria-hidden="true">
            <FaCalculator />
          </div>
        </div>
      </section>

      {/* RUTINAS */}
      <section className={`${style.section} ${style.altSection}`}>
        <header className={style.sectionHeader}>
          <h2>Entrená cada músculo correctamente</h2>
          <p>
            Explorá ejercicios para pecho, espalda, piernas, hombros y brazos con
            explicaciones claras.
          </p>
        </header>

        <div className={style.featureGrid}>
          <article className={style.featureCard}>
            <h3>Rutinas de espalda</h3>
            <p>Aumentá fuerza y volumen.</p>
          </article>
          <article className={style.featureCard}>
            <h3>Rutinas de pierna</h3>
            <p>Construí potencia y resistencia.</p>
          </article>
          <article className={style.featureCard}>
            <h3>Rutinas de bíceps</h3>
            <p>Definí y desarrollá tus brazos.</p>
          </article>
        </div>

        <Link to="/Workouts" onClick={scrollTop} className={style.linkBtn}>
          Ver todas las rutinas <FaChevronRight />
        </Link>
      </section>

      {/* NUTRICIÓN */}
      <section className={style.section}>
        <div className={`${style.promo} ${style.promoSplit}`}>
          <div className={style.promoVisual} aria-hidden="true">
            <GiSteak />
          </div>

          <div className={style.promoText}>
            <h2>La alimentación también importa</h2>
            <p>
              Calculá tu metabolismo basal y obtené información útil para
              complementar tus entrenamientos.
            </p>

            <Link
              to="/Nutrition"
              onClick={scrollTop}
              className={style.secondaryBtn}
            >
              Ver alimentación <FaChevronRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={style.section}>
        <div className={style.finalCta}>
          <FaUserPlus aria-hidden="true" className={style.finalIcon} />
          <h2>Empezá hoy, es gratis</h2>
          <p>
            Creá tu cuenta para guardar tus rutinas y seguir tu progreso desde
            cualquier dispositivo.
          </p>

          <div className={style.heroButtons}>
            <Link to="/Register" onClick={scrollTop} className={style.ctaBtn}>
              Crear cuenta gratis
            </Link>
            <Link
              to="/Workouts"
              onClick={scrollTop}
              className={style.ctaGhostBtn}
            >
              Explorar sin registrarme
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
