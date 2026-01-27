"use client";

// --------------------
// Imports
// --------------------
import { useRef, useState } from "react";
import { Link } from "react-router";
import { GoChevronDown } from "react-icons/go";

import Aurora from "../components/Aurora";
import nutricion from "../data/nutrition.json";
import style from "./Style/Nutrition.module.css";

import { BsEggFried } from "react-icons/bs";
import { FaBowlRice, FaCarrot } from "react-icons/fa6";
import { GiCoconuts } from "react-icons/gi";

// --------------------
// Component
// --------------------
const Nutrition = () => {
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  
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

      </section>

      {/* ==================== */}
      {/* List Section */}
      {/* ==================== */}
      <section ref={searchRef} className={style.listContainer}>
        <div className={style.alimentosContainer}>
          <div className={style.alimentoIndex}>
            <label>Busca el alimento</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Escribe el alimento"
            />
          </div>

          

          {nutricion.map((nutricio) => {
            const filteredTypes = nutricio.types.filter((item) =>
              item.nombre.toLowerCase().includes(search.toLowerCase())
            );

            if (filteredTypes.length === 0) return null;
  

            return (
              <div key={nutricio.id}>
                <div className={style.titleAlimentancion}>
                  <h3>{nutricio.nombre}</h3>
                </div>

                <div className={style.styleNutricion}>
                  {filteredTypes.map((item) => (
                    <div
                      key={item.nombre}
                      className={style.alimentaciónDescripcion}
                    >
                      <div className={style.desAlimentacion}>
                        <h4>{item.nombre}</h4>
                        <p>Calorías: {item.calorias} kcal x 100g</p>
                        <p>Proteínas: {item.proteina} g x 100g</p>

                        <div className={style.verMasAlimentacion}>
                          <Link to="/">Ver más</Link>
                        </div>
                      </div>

                      <img src={item.imagen} alt={item.nombre} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

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