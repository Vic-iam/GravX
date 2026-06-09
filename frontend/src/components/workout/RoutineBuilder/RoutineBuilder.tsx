import { useState, useEffect } from "react";
import style from "./RoutineBuilder.module.css";
import { IoIosClose } from "react-icons/io";
import jsPDF from "jspdf";
import Select from "react-select";

type Exercise = {
  dia: string;
  rutina: string;
  ejercicio: string;
  series: string;
  reps: string;
};

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "var(--bg)",
    borderColor: state.isFocused ? "#E11D48" : "var(--border-color)",
    minHeight: "44px",
    height: "44px",
    borderRadius: "5px",
  }),

  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--surface)",
    borderRadius: "12px",
    overflow: "hidden",
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#E11D48" : "var(--surface)",
    color: "var(--text)",
    cursor: "pointer",
  }),

  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--text)",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    color: "var(--text)",
  }),

  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#E11D48",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

const diasOptions = [
  { value: "Lunes", label: "Lunes" },
  { value: "Martes", label: "Martes" },
  { value: "Miércoles", label: "Miércoles" },
  { value: "Jueves", label: "Jueves" },
  { value: "Viernes", label: "Viernes" },
  { value: "Sábado", label: "Sábado" },
  { value: "Domingo", label: "Domingo" },
];

const grupoOptions = [
  { value: "Pecho", label: "Pecho" },
  { value: "Espalda", label: "Espalda" },
  { value: "Biceps", label: "Biceps" },
  { value: "Triceps", label: "Triceps" },
  { value: "Hombro", label: "Hombro" },
  { value: "Pierna", label: "Pierna" },
];

const seriesOptions = [
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const repsOptions = [
  { value: "15", label: "15" },
  { value: "12", label: "12" },
  { value: "10", label: "10" },
  { value: "8", label: "8" },
];

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
  const [error, setError] = useState("");
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
    setError("");

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

  useEffect(() => {
  if (!error) return;

  const timer = setTimeout(() => {
    setError("");
  }, 3000);

  return () => clearTimeout(timer);
}, [error]);

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
      setError("Completa todos los campos antes de agregar otro ejercicio.");
      return;
    }

    const existeDuplicado = rows.some(
      (row, index) =>
        index !== rows.length - 1 &&
        row.dia === lastRow.dia &&
        row.rutina === lastRow.rutina &&
        row.ejercicio === lastRow.ejercicio,
    );

    if (existeDuplicado) {
      setError("Ese ejercicio ya fue agregado para ese día.");
      return;
    }

    setError("");
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
    const filasInvalidas = rows.some(
      (row) =>
        !row.dia || !row.rutina || !row.ejercicio || !row.series || !row.reps,
    );

    if (filasInvalidas) {
      setError("Completa todos los ejercicios antes de descargar el PDF.");
      return;
    }

    setError("");

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Mi Rutina Personalizada", 20, 20);

    doc.setFontSize(11);
    doc.text(`Ejercicios totales: ${rows.length}`, 20, 30);

    doc.text(`Series totales: ${totalSeries}`, 20, 37);

    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 20, 44);

    let y = 60;

    const groupedByDay = rows.reduce(
      (acc, row) => {
        if (!row.dia) return acc;

        if (!acc[row.dia]) {
          acc[row.dia] = {};
        }

        if (!acc[row.dia][row.rutina]) {
          acc[row.dia][row.rutina] = [];
        }

        acc[row.dia][row.rutina].push(row);

        return acc;
      },
      {} as Record<string, Record<string, Exercise[]>>,
    );

    Object.entries(groupedByDay).forEach(([dia, grupos]) => {
      doc.setFontSize(16);
      doc.text(dia.toUpperCase(), 20, y);
      y += 10;

      Object.entries(grupos).forEach(([grupo, ejercicios]) => {
        doc.setFontSize(13);
        doc.text(grupo.toUpperCase(), 25, y);

        y += 8;

        ejercicios.forEach((ejercicio) => {
          doc.setFontSize(11);

          doc.text(`• ${ejercicio.ejercicio}`, 30, y);

          doc.text(`${ejercicio.series} x ${ejercicio.reps}`, 140, y);

          y += 7;
        });

        y += 5;
      });

      y += 10;
    });

    doc.save("mi-rutina.pdf");
  };

  return (
    <div className={style.container}>
      <h2>Mi Rutina Personalizada</h2>

      <p className={style.description}>
        Diseña tu rutina de entrenamiento seleccionando el día, grupo muscular,
        ejercicio, series y repeticiones. Agrega tantos ejercicios como
        necesites y descarga tu planificación en PDF para llevar el control de
        tus entrenamientos.
      </p>
      <div className={style.tableWrapper}>
        <table>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <span className={style.mobileLabel}>Día</span>
                  <div className={style.selectWrapper}>
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      options={diasOptions}
                      placeholder="Seleccionar"
                      value={
                        diasOptions.find(
                          (option) => option.value === row.dia,
                        ) || null
                      }
                      onChange={(selected) =>
                        handleChange(index, "dia", selected?.value || "")
                      }
                    />
                  </div>
                </td>

                <td>
                  <span className={style.mobileLabel}>Rutina</span>
                  <div className={style.selectWrapper}>
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      options={grupoOptions}
                      placeholder="Seleccionar"
                      value={
                        grupoOptions.find(
                          (option) => option.value === row.rutina,
                        ) || null
                      }
                      onChange={(selected) => {
                        handleChange(index, "rutina", selected?.value || "");

                        handleChange(index, "ejercicio", "");
                      }}
                    />
                  </div>
                </td>

                <td>
                  <span className={style.mobileLabel}>Ejercicio</span>
                  <div className={style.selectWrapper}>
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Seleccionar"
                      isDisabled={!row.rutina}
                      options={(
                        ejerciciosPorRutina[
                          row.rutina as keyof typeof ejerciciosPorRutina
                        ] || []
                      ).map((ejercicio) => ({
                        value: ejercicio,
                        label: ejercicio,
                      }))}
                      value={
                        row.ejercicio
                          ? {
                              value: row.ejercicio,
                              label: row.ejercicio,
                            }
                          : null
                      }
                      onChange={(selected) =>
                        handleChange(index, "ejercicio", selected?.value || "")
                      }
                    />
                  </div>
                </td>

                <td>
                  <span className={style.mobileLabel}>Series</span>
                  <div className={style.selectWrapper}>
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      options={seriesOptions}
                      placeholder="Seleccionar"
                      value={
                        seriesOptions.find(
                          (option) => option.value === row.series,
                        ) || null
                      }
                      onChange={(selected) =>
                        handleChange(index, "series", selected?.value || "")
                      }
                    />
                  </div>
                </td>

                <td>
                  <span className={style.mobileLabel}>Repeticiones</span>
                  <div className={style.selectWrapper}>
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      options={repsOptions}
                      placeholder="Seleccionar"
                      value={
                        repsOptions.find(
                          (option) => option.value === row.reps,
                        ) || null
                      }
                      onChange={(selected) =>
                        handleChange(index, "reps", selected?.value || "")
                      }
                    />
                  </div>
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
        <div className={style.stats1}>
          <h4>Ejercicios</h4>
          <p>{rows.length}</p>
        </div>

        <div className={style.stats2}>
          <h4>Total Series</h4>
          <p>{totalSeries}</p>
        </div>
      </div>

      {error && <div className={style.errorMessage}>{error}</div>}


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
