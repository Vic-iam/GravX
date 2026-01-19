'use client';

// --------------------
// Imports
// --------------------
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { GoChevronDown } from 'react-icons/go';

import Aurora from '../components/Aurora';
import nutricion from '../data/nutrition.json';
import style from './Style/Nutrition.module.css';

// --------------------
// Component
// --------------------
const Nutrition = () => {
  const searchRef = useRef(null);
  const [search, setSearch] = useState('');

  // Filtro por nombre de alimento
  const nutricionFiltrada = nutricion.filter((grupo) =>
    grupo.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={style.nutritionBody}>
      {/* ==================== */}
      {/* Presentation Section */}
      {/* ==================== */}
      <section className={style.presentationNutrition}>
        <div className={style.auroraBg}>
          <Aurora
            colorStops={['#9C1107', '#0C0A09', '#9C1107']}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        <div className={style.nutritionContainer}>
          <h1>La Alimentación</h1>
          <p>Es una de las cosas más importantes de la vida</p>
          <p>
            Descubre y organiza tu alimentación contando calorías, proteínas y
            carbohidratos.
          </p>
        </div>

        <div className={style.titleStyle}>
          <div className={style.listTitle}>
            <h2>Lista de alimentos</h2>
          </div>

          <button
            className={style.iconStyle}
            onClick={() =>
              searchRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
            aria-label="Ir a la lista de alimentos"
          >
            <GoChevronDown />
          </button>
        </div>
      </section>

      {/* ==================== */}
      {/* List Section */}
      {/* ==================== */}
      <section ref={searchRef} className={style.listContainer}>
        <div className={style.alimentosContainer}>
          <div className={style.alimentoIndex}>
            <label htmlFor="search">Busca el alimento</label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Escribe el alimento"
            />
          </div>

          {nutricionFiltrada.map((grupo) => (
            <div key={grupo.id}>
              <div className={style.titleAlimentacion}>
                <h3>{grupo.nombre}</h3>
              </div>

              <div className={style.styleNutricion}>
                {grupo.types.map((item) => (
                  <div
                    key={item.nombre}
                    className={style.alimentacionDescripcion}
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
          ))}
        </div>
      </section>

      {/* ==================== */}
      {/* Footer Section */}
      {/* ==================== */}
      <section className={style.footerNutrition}>
        <h5>¿Para qué te servirá esto?</h5>
        <p>
          Para conocer mejor lo que comes y tomar decisiones más saludables en
          tu día a día.
        </p>
      </section>
    </div>
  );
};

export default Nutrition;
