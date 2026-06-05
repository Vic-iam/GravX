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
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                
                <td>
                  <button
                    className={style.deleteButton}
                    disabled={rows.length === 1}
                    onClick={() => removeRow(index)}
                  >
                    <IoIosClose />
                  </button>
                </td>

                <td>
                  <span className={style.mobileLabel}>Día</span>
                  <div className={style.selectWrapper}>
                    <Select
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
