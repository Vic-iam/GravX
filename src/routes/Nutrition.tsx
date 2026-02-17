"use client";

// --------------------
// Imports
// --------------------
import { Link } from "react-router";
import { GoChevronDown } from "react-icons/go";

import Aurora from "../components/Aurora";
import style from "./Style/Nutrition.module.css";

import { BsEggFried } from "react-icons/bs";
import { FaBowlRice, FaCarrot } from "react-icons/fa6";
import { GiCoconuts } from "react-icons/gi";
import ItemListContainer from "../components/ItemListContainer";

// --------------------
// Component
// --------------------
const Nutrition = () => {

  return (
    <div className={style.nutritionBody}>
      {/* ==================== */}
      {/* Presentation Section */}
      {/* ==================== */}
      <section className={style.presentationNutrition}>
        <div className={style.auroraBg}>
          <Aurora
            colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        <div className={style.nutritionContainer}>
          <h1>Alimentación</h1>
          <p>
            Descubre y organiza tu alimentación contando las calorías,
            carbohidratos y proteínas
          </p>
        </div>

      
      </section>

      {/* ==================== */}
      {/* List Section */}
      {/* ==================== */}

      <ItemListContainer />


      <section className={style.footerNutrition}>

        <div className={style.auroraBgInverse}>
          <Aurora
            colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        <div className={style.footerIndex}>
          <h5>¿Para qué te serviría?</h5>
          <p>Alimentarse son unas de las cosas mas importante de la vida.
            Y sobre todo alimentarse correctamente. Asi que con eso esto te ayudara a organizar y poder conocer tus macros de alimentancion
          </p>
          <p>Que seria los macros?</p>
        </div>

        <div className={style.macrosContainer}>

          <div className={style.titleMacros}>
            <h6>Los macros (macrosnutrientes)</h6>
            <p>son los nutrientes que el cuerpo necesita en grandes cantidades para obtener energía, crecer y regular procesos metabólicos</p>
          </div>

          <div className={style.macrosInformation}>
            <h6>Como indentificar los macrosnutrientes</h6>
          </div>

          <div className={style.information}>
            <div className={style.titleInformation}>
              <h6>Proteinas</h6>
              <BsEggFried />
              <div className={style.liProteina}>
                <li>Tofu</li>
                <li>Pollo</li>
                <li>Pavo</li>
                <li>Cerdo</li>
                <li>Frijoles</li>
                <li>Huevos</li>
                <li>Pescado</li>
                <li>Yogurt griego</li>
                <li>Carnes de res</li>
                <li>Batido de proteinas</li>
              </div>
            </div>
            <div className={style.titleInformation}>
              <h6>Carbohidratos</h6>
              <FaBowlRice />
              <div className={style.liCarbohidratos}>
                <li>Trigo</li>
                <li>Arroz</li>
                <li>Pasta</li>
                <li>Cuscus</li>
                <li>Avena</li>
                <li>Papas</li>
                <li>Frutas</li>
                <li>Quinoa</li>
                <li>Frijoles</li>
                <li>Fideos de arroz</li>
              </div>
            </div>
            <div className={style.titleInformation}>
              <h6>Grasas</h6>
              <GiCoconuts />
              <div className={style.liGrasas}>
                <li>Merey</li>
                <li>Pistacho</li>
                <li>Almendra</li>
                <li>Aceite de coco</li>
                <li>Aceite de oliva</li>
                <li>Semilla de chia</li>
                <li>Semilla de lino</li>
                <li>Aguacate(palta)</li>
                <li>Aceite de pescado</li>
                <li>Mantequilla de mani</li>
              </div>
            </div>
            <div className={style.titleInformation}>
              <h6>Vegetales</h6>
              <FaCarrot />
              <div className={style.liVegetales}>
                <li>Brocoli</li>
                <li>Repollo</li>
                <li>Pepino</li>
                <li>Colifrlor</li>
                <li>Espinaca</li>
                <li>Pimenton</li>
                <li>Calabacin</li>
                <li>Zanahorias</li>
                <li>Berenjenas</li>
                <li>Esparragos</li>
              </div>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Nutrition;