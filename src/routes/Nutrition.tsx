"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { GoChevronDown } from "react-icons/go";
import { BsEggFried } from "react-icons/bs";
import { FaBowlRice, FaCarrot } from "react-icons/fa6";
import { GiCoconuts } from "react-icons/gi";

import style from "./Style/Nutrition.module.css";

import ItemListContainer from "../components/nutrition/ContainerNutrition/ContainerNutrition";
import Loading from "../components/ui/Loading/Loading";

const Nutrition = () => {
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading text="...Cargando datos" />;

  return (
    <div className={style.nutritionBody}>
      {/* PRESENTATION */}
      <section className={style.presentationNutrition}>
        <div className={style.nutritionContainer}>
          <h1>Alimentación</h1>
          <p>
            Descubre y organiza tu alimentación contando las calorías,
            carbohidratos y proteínas
          </p>
        </div>

        <div className={style.titleStyle}>
          <div className={style.listTitle}>
            <h2>Lista de alimentos</h2>
          </div>

          <Link
            to="/Nutrition"
            className={style.iconStyle}
            onClick={(e) => {
              e.preventDefault();
              searchRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <GoChevronDown />
          </Link>
        </div>
        <div className={style.sectionDivider}></div>
      </section>

      {/* FOOD LIST */}
      <div ref={searchRef}>
        <ItemListContainer />
      </div>

      {/* FOOTER INFO */}
      <section className={style.footerNutrition}>
        <div className={style.sectionDivider}></div>
        <div className={style.footerIndex}>
          <h3>¿Para qué te serviría?</h3>
          <p>
            Alimentarse es una de las cosas más importantes de la vida. Esto te
            ayudará a organizar y conocer tus macros de alimentación.
          </p>
          <p>¿Qué serían los macros?</p>
        </div>

        <div className={style.macrosContainer}>
          <div className={style.titleMacros}>
            <h4>Los macros (macronutrientes)</h4>
            <p>
              Son los nutrientes que el cuerpo necesita en grandes cantidades
              para obtener energía, crecer y regular procesos metabólicos.
            </p>
          </div>

          <div className={style.macrosInformation}>
            <p>Cómo identificar los macronutrientes:</p>
          </div>

          <div className={style.information}>
            <div className={style.titleInformation}>
              <h6>Proteínas</h6>
              <BsEggFried />
              <ul className={style.liProteina}>
                <li>Tofu</li>
                <li>Pollo</li>
                <li>Pavo</li>
                <li>Cerdo</li>
                <li>Frijoles</li>
                <li>Huevos</li>
                <li>Pescado</li>
                <li>Yogurt griego</li>
                <li>Carnes de res</li>
                <li>Batido de proteínas</li>
              </ul>
            </div>

            <div className={style.titleInformation}>
              <h6>Carbohidratos</h6>
              <FaBowlRice />
              <ul className={style.liCarbohidratos}>
                <li>Trigo</li>
                <li>Arroz</li>
                <li>Pasta</li>
                <li>Cuscús</li>
                <li>Avena</li>
                <li>Papas</li>
                <li>Frutas</li>
                <li>Quinoa</li>
                <li>Frijoles</li>
                <li>Fideos de arroz</li>
              </ul>
            </div>

            <div className={style.titleInformation}>
              <h6>Grasas</h6>
              <GiCoconuts />
              <ul className={style.liGrasas}>
                <li>Merey</li>
                <li>Pistacho</li>
                <li>Almendra</li>
                <li>Aceite de coco</li>
                <li>Aceite de oliva</li>
                <li>Semilla de chía</li>
                <li>Semilla de lino</li>
                <li>Aguacate</li>
                <li>Aceite de pescado</li>
                <li>Mantequilla de maní</li>
              </ul>
            </div>

            <div className={style.titleInformation}>
              <h6>Vegetales</h6>
              <FaCarrot />
              <ul className={style.liVegetales}>
                <li>Brócoli</li>
                <li>Repollo</li>
                <li>Pepino</li>
                <li>Coliflor</li>
                <li>Espinaca</li>
                <li>Pimentón</li>
                <li>Calabacín</li>
                <li>Zanahorias</li>
                <li>Berenjenas</li>
                <li>Espárragos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nutrition;
