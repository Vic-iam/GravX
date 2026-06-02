import { useState, useEffect } from "react";
import style from "./RoutineBuilder.module.css";
import { IoIosClose } from "react-icons/io";
import jsPDF from "jspdf";

type Exercise = {
  dia: string;
  rutina: string;
  ejercicio: string;
  series: string;
  reps: string;
};

const ejerciciosPorRutina = {
  Pecho: ["Press banca", "Press inclinado", "Aperturas", "Fondos"],

  Espalda: ["Dominadas", "Jalon al pecho", "Remo con barra", "Remo polea"],

  Biceds: ["Curl barra", "Curl martillo", "Curl concentrado"],

  Triceps: ["Fondos", "Press frances", "Extension polea"],

  Hombro: ["Press militar", "Elevaciones laterales", "Face Pull"],

  Pierna: ["Sentadilla", "Prensa", "Peso muerto rumano"],
};

const RoutineBuilder = () => {
  const [rows, setRows] = useState<Exercise[]>([
    {
      dia: "",
      rutina: "",
      ejercicio: "",
      series: "",
      reps: "",
    },
  ]);

  const totalSeries = rows.reduce(
    (acc, row) => acc + Number(row.series || 0),
    0,
  );

  const handleChange = (
    index: number,
    field: keyof Exercise,
    value: string,
  ) => {
    const newRows = [...rows];

    newRows[index] = {
      ...newRows[index],
      [field]: value,
    };

    setRows(newRows);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Mi Rutina Personalizada", 20, 20);

    let y = 40;

    rows.forEach((row, index) => {
      doc.setFontSize(12);

      doc.text(`${index + 1}. ${row.ejercicio}`, 20, y);

      doc.text(`Duración: ${row.series}`, 80, y);

      doc.text(`Repeticiones: ${row.reps}`, 140, y);

      y += 15;
    });

    doc.save("mi-rutina.pdf");
  };

  useEffect(() => {
    const savedRoutine = localStorage.getItem("myRoutine");

    if (savedRoutine) {
      setRows(JSON.parse(savedRoutine));
    }
  }, []);

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        dia: "",
        rutina: "",
        ejercicio: "",
        series: "",
        reps: "",
      },
    ]);
  };

  return (
    <div className={style.container}>
      <h2>Mi Rutina Personalizada</h2>

      <table>
        <thead>
          <tr>
            <th>Ejercicio</th>
            <th>Series</th>
            <th>Reps</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  value={row.dia}
                  onChange={(e) => handleChange(index, "dia", e.target.value)}
                >
                  <option value="">Día</option>

                  <option>Lunes</option>
                  <option>Martes</option>
                  <option>Miércoles</option>
                  <option>Jueves</option>
                  <option>Viernes</option>
                  <option>Sábado</option>
                  <option>Domingo</option>
                </select>
              </td>

              <td>
                <select
                  value={row.rutina}
                  onChange={(e) => {
                    handleChange(index, "rutina", e.target.value);

                    handleChange(index, "ejercicio", "");
                  }}
                >
                  <option value="">Grupo muscular</option>

                  <option value="Pecho">Pecho</option>
                  <option value="Espalda">Espalda</option>
                  <option value="Biceds">Biceds</option>
                  <option value="Triceps">Triceps</option>
                  <option value="Hombro">Hombro</option>
                  <option value="Pierna">Pierna</option>
                </select>
              </td>

<td>
  <div>
    {JSON.stringify(
      ejerciciosPorRutina[
        row.rutina as keyof typeof ejerciciosPorRutina
      ]
    )}
  </div>
</td>

              <td>
                <select
                  value={row.series}
                  onChange={(e) =>
                    handleChange(index, "series", e.target.value)
                  }
                >
                  <option value="">Seleccionar</option>
                  <option value="30">30 min</option>
                  <option value="40">40 min</option>
                  <option value="50">50 min</option>
                </select>
              </td>

              <td>
                <select
                  value={row.reps}
                  onChange={(e) => handleChange(index, "reps", e.target.value)}
                >
                  <option>3x15</option>
                  <option>4x10</option>
                  <option>4x8</option>
                </select>
              </td>

              <td>
                <button onClick={() => removeRow(index)}>
                  <IoIosClose />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

              <div className={style.stats}>
                <div>
                  <h4>Ejercicios</h4>
                  <p>{rows.length}</p>
                </div>

                <div>
                  <h4>Total</h4>
                  <p>{totalSeries} min</p>
                </div>
              </div>
      <button className={style.addButton} onClick={addRow}>
        Agregar ejercicio
      </button>

      <button className={style.addButton} onClick={downloadPDF}>
        Descargar PDF
      </button>
    </div>
  );
};

export default RoutineBuilder;
