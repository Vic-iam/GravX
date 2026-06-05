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
  Biceps: ["Curl barra", "Curl martillo", "Curl concentrado"],
  Triceps: ["Fondos", "Press frances", "Extension polea"],
  Hombro: ["Press militar", "Elevaciones laterales", "Face Pull"],
  Pierna: ["Sentadilla", "Prensa", "Peso muerto rumano"],
};

const emptyRow: Exercise = {
  dia: "",
  rutina: "",
  ejercicio: "",
  series: "",
  reps: "",
};

const RoutineBuilder = () => {
  const [rows, setRows] = useState<Exercise[]>([emptyRow]);

  useEffect(() => {
    const savedRoutine = localStorage.getItem("myRoutine");

    if (savedRoutine) {
      setRows(JSON.parse(savedRoutine));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myRoutine", JSON.stringify(rows));
  }, [rows]);

  const handleChange = (
    index: number,
    field: keyof Exercise,
    value: string,
  ) => {
    setRows((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addRow = () => {
    if (rows.length === 0) {
      setRows([{ ...emptyRow }]);
      return;
    }

    const lastRow = rows[rows.length - 1];

    if (
      !lastRow.dia ||
      !lastRow.rutina ||
      !lastRow.ejercicio ||
      !lastRow.series ||
      !lastRow.reps
    ) {
      return;
    }

    setRows([...rows, { ...emptyRow }]);
  };

  const removeRow = (index: number) => {
    if (rows.length === 1) {
      return;
    }

    setRows(rows.filter((_, i) => i !== index));
  };

  const clearRoutine = () => {
    localStorage.removeItem("myRoutine");
    setRows([{ ...emptyRow }]);
  };

  const totalSeries = rows.reduce(
    (acc, row) => acc + Number(row.series || 0),
    0,
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Mi Rutina Personalizada", 20, 20);

    let y = 40;

    rows.forEach((row, index) => {
      doc.setFontSize(12);

      doc.text(`${index + 1}. ${row.ejercicio}`, 20, y);
      y += 7;

      doc.text(`Dia: ${row.dia}`, 20, y);
      y += 7;

      doc.text(`Grupo muscular: ${row.rutina}`, 20, y);
      y += 7;

      doc.text(`Series: ${row.series}`, 20, y);
      y += 7;

      doc.text(`Repeticiones: ${row.reps}`, 20, y);
      y += 12;
    });

    doc.save("mi-rutina.pdf");
  };

  return (
    <div className={style.container}>
      <h2>Mi Rutina Personalizada</h2>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Grupo</th>
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
                    <option value="">Seleccionar</option>
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
                    <option value="">Seleccionar</option>
                    <option value="Pecho">Pecho</option>
                    <option value="Espalda">Espalda</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Hombro">Hombro</option>
                    <option value="Pierna">Pierna</option>
                  </select>
                </td>

                <td>
                  <select
                    value={row.ejercicio}
                    disabled={
                      !ejerciciosPorRutina[
                        row.rutina as keyof typeof ejerciciosPorRutina
                      ]
                    }
                    onChange={(e) =>
                      handleChange(index, "ejercicio", e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>

                    {(
                      ejerciciosPorRutina[
                        row.rutina as keyof typeof ejerciciosPorRutina
                      ] || []
                    ).map((ejercicio) => (
                      <option key={ejercicio} value={ejercicio}>
                        {ejercicio}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <select
                    value={row.series}
                    onChange={(e) =>
                      handleChange(index, "series", e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>

                <td>
                  <select
                    value={row.reps}
                    onChange={(e) =>
                      handleChange(index, "reps", e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="15">15</option>
                    <option value="12">12</option>
                    <option value="10">10</option>
                    <option value="8">8</option>
                  </select>
                </td>

                <td>
                  <button
                    className={style.deleteButton}
                    disabled={rows.length === 1}
                    onClick={() => removeRow(index)}
                  >
                    <IoIosClose />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.stats}>
        <div>
          <h4>Ejercicios</h4>
          <p>{rows.length}</p>
        </div>

        <div>
          <h4>Total Series</h4>
          <p>{totalSeries}</p>
        </div>
      </div>

      <div className={style.actions}>
        <button className={style.addButton} onClick={addRow}>
          Agregar Ejercicio
        </button>

        <button className={style.addButton} onClick={downloadPDF}>
          Descargar PDF
        </button>

        <button className={style.clearButton} onClick={clearRoutine}>
          Limpiar Rutina
        </button>
      </div>
    </div>
  );
};

export default RoutineBuilder;
