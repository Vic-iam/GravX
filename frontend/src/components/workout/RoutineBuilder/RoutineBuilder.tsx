import { useEffect, useMemo, useState } from "react";
import style from "./RoutineBuilder.module.css";
import { IoIosClose } from "react-icons/io";
import jsPDF from "jspdf";
import Select from "react-select";
import type { StylesConfig } from "react-select";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import {
  DIAS,
  ROUTINE_EVENT,
  emptyRow,
  isComplete,
  loadRoutine,
  saveRoutine,
} from "../../../utils/routineStorage";
import type { Exercise } from "../../../utils/routineStorage";

type Option = { value: string; label: string };

const customSelectStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--bg)",
    borderColor: state.isFocused ? "#E11D48" : "var(--border-color)",
    minHeight: "44px",
    height: "44px",
    borderRadius: "5px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--surface)",
    borderRadius: "12px",
    overflow: "hidden",
    zIndex: 20,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#E11D48" : "var(--surface)",
    color: "var(--text)",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({ ...provided, color: "var(--text)" }),
  placeholder: (provided) => ({ ...provided, color: "var(--text)" }),
  dropdownIndicator: (provided) => ({ ...provided, color: "#E11D48" }),
  indicatorSeparator: () => ({ display: "none" }),
};

const toOptions = (values: string[]): Option[] =>
  values.map((value) => ({ value, label: value }));

const diasOptions = toOptions(DIAS);
const seriesOptions = toOptions(["2", "3", "4", "5", "6"]);
const repsOptions = toOptions(["6", "8", "10", "12", "15", "20"]);

const ejerciciosPorRutina: Record<string, string[]> = {
  Pecho: [
    "Press banca",
    "Press inclinado",
    "Aperturas",
    "Fondos",
    "Press banca máquina",
  ],
  Espalda: ["Dominadas", "Jalon al pecho", "Remo con barra", "Remo polea"],
  Biceps: ["Curl barra", "Curl martillo", "Curl concentrado"],
  Triceps: ["Fondos", "Press frances", "Extension polea"],
  Hombro: ["Press militar", "Elevaciones laterales", "Face Pull"],
  Pierna: [
    "Sentadilla",
    "Prensa",
    "Peso muerto rumano",
    "Zancadas",
    "Elevación de talones",
  ],
};

const grupoOptions = toOptions(Object.keys(ejerciciosPorRutina));

const row = (
  dia: string,
  rutina: string,
  ejercicio: string,
  series = "3",
  reps = "12",
): Exercise => ({ dia, rutina, ejercicio, series, reps });

const plantillas: { nombre: string; descripcion: string; rows: Exercise[] }[] =
  [
    {
      nombre: "Cuerpo completo",
      descripcion: "3 días · ideal para empezar",
      rows: [
        row("Lunes", "Pecho", "Press banca"),
        row("Lunes", "Espalda", "Jalon al pecho"),
        row("Lunes", "Pierna", "Sentadilla"),
        row("Miércoles", "Hombro", "Press militar"),
        row("Miércoles", "Espalda", "Remo polea"),
        row("Miércoles", "Pierna", "Prensa"),
        row("Viernes", "Pecho", "Press inclinado"),
        row("Viernes", "Biceps", "Curl barra"),
        row("Viernes", "Triceps", "Press frances"),
      ],
    },
    {
      nombre: "Empuje / Tirón / Pierna",
      descripcion: "3 días · nivel intermedio",
      rows: [
        row("Lunes", "Pecho", "Press banca", "4", "8"),
        row("Lunes", "Hombro", "Press militar", "3", "10"),
        row("Lunes", "Triceps", "Extension polea"),
        row("Martes", "Espalda", "Dominadas", "4", "8"),
        row("Martes", "Espalda", "Remo con barra", "4", "10"),
        row("Martes", "Biceps", "Curl martillo"),
        row("Jueves", "Pierna", "Sentadilla", "4", "8"),
        row("Jueves", "Pierna", "Peso muerto rumano", "4", "10"),
        row("Jueves", "Pierna", "Prensa"),
      ],
    },
  ];

const RoutineBuilderInner = ({ userId }: { userId?: string }) => {
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Exercise[]>(() => loadRoutine(userId));

  useEffect(() => {
    saveRoutine(rows, userId);
  }, [rows, userId]);

  // Permite que el explorador de ejercicios agregue elementos a la rutina.
  useEffect(() => {
    const reload = () => setRows(loadRoutine(userId));
    window.addEventListener(ROUTINE_EVENT, reload);
    return () => window.removeEventListener(ROUTINE_EVENT, reload);
  }, [userId]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleChange = (
    index: number,
    changes: Partial<Exercise>,
  ) => {
    setError("");
    setRows((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    );
  };

  const hasContent = rows.some((r) => r.dia || r.rutina || r.ejercicio);

  const findDuplicate = (candidate: Exercise, ignoreIndex: number) =>
    rows.some(
      (r, i) =>
        i !== ignoreIndex &&
        r.dia === candidate.dia &&
        r.rutina === candidate.rutina &&
        r.ejercicio === candidate.ejercicio,
    );

  const addRow = () => {
    const lastIndex = rows.length - 1;
    const lastRow = rows[lastIndex];

    if (!isComplete(lastRow)) {
      setError("Completa todos los campos antes de agregar otro ejercicio.");
      return;
    }

    if (findDuplicate(lastRow, lastIndex)) {
      setError("Ese ejercicio ya fue agregado para ese día.");
      return;
    }

    setError("");
    // Se conserva el día y el grupo para agilizar la carga.
    setRows([
      ...rows,
      { ...emptyRow(), dia: lastRow.dia, rutina: lastRow.rutina },
    ]);
  };

  const duplicateRow = (index: number) => {
    setRows((prev) => [
      ...prev.slice(0, index + 1),
      { ...prev[index], ejercicio: "" },
      ...prev.slice(index + 1),
    ]);
  };

  const removeRow = (index: number) => {
    setRows((prev) =>
      prev.length === 1 ? [emptyRow()] : prev.filter((_, i) => i !== index),
    );
  };

  const applyTemplate = (template: (typeof plantillas)[number]) => {
    if (
      hasContent &&
      !window.confirm("Esto reemplazará tu rutina actual. ¿Continuar?")
    ) {
      return;
    }
    setRows(template.rows.map((r) => ({ ...r })));
    setError("");
    toast.success(`Plantilla "${template.nombre}" cargada`);
  };

  const clearRoutine = () => {
    if (hasContent && !window.confirm("¿Seguro que quieres borrar tu rutina?")) {
      return;
    }
    setRows([emptyRow()]);
    setError("");
  };

  const totalSeries = rows.reduce(
    (acc, r) => acc + Number(r.series || 0),
    0,
  );
  const diasActivos = new Set(rows.filter((r) => r.dia).map((r) => r.dia)).size;

  const resumenPorDia = useMemo(() => {
    const map = new Map<string, Exercise[]>();
    DIAS.forEach((dia) => {
      const items = rows.filter((r) => r.dia === dia && r.ejercicio);
      if (items.length) map.set(dia, items);
    });
    return [...map.entries()];
  }, [rows]);

  const downloadPDF = () => {
    if (!hasContent || !rows.every(isComplete)) {
      setError("Completa todos los ejercicios antes de descargar el PDF.");
      return;
    }

    setError("");

    const doc = new jsPDF();
    const pageBottom = 280;
    let y = 20;

    const ensureSpace = (needed: number) => {
      if (y + needed > pageBottom) {
        doc.addPage();
        y = 20;
      }
    };

    doc.setFontSize(22);
    doc.text("Mi Rutina Personalizada", 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.text(`Ejercicios totales: ${rows.length}`, 20, y);
    y += 7;
    doc.text(`Series totales: ${totalSeries}`, 20, y);
    y += 7;
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 20, y);
    y += 16;

    DIAS.forEach((dia) => {
      const delDia = rows.filter((r) => r.dia === dia);
      if (!delDia.length) return;

      ensureSpace(20);
      doc.setFontSize(16);
      doc.text(dia.toUpperCase(), 20, y);
      y += 10;

      const grupos = [...new Set(delDia.map((r) => r.rutina))];
      grupos.forEach((grupo) => {
        ensureSpace(16);
        doc.setFontSize(13);
        doc.text(grupo.toUpperCase(), 25, y);
        y += 8;

        delDia
          .filter((r) => r.rutina === grupo)
          .forEach((item) => {
            ensureSpace(8);
            doc.setFontSize(11);
            doc.text(`• ${item.ejercicio}`, 30, y);
            doc.text(`${item.series} x ${item.reps}`, 140, y);
            y += 7;
          });

        y += 5;
      });

      y += 8;
    });

    doc.save("mi-rutina.pdf");
  };

  return (
    <div className={style.container}>
      <h2>Mi Rutina Personalizada</h2>

      <p className={style.description}>
        Diseña tu rutina seleccionando el día, grupo muscular, ejercicio, series
        y repeticiones. Empieza desde una plantilla o agrega ejercicios desde el
        explorador, y descarga tu planificación en PDF. Tu rutina se guarda
        automáticamente en este dispositivo.
      </p>

      <div className={style.templates}>
        <h3>Empieza con una plantilla</h3>
        <div className={style.templateList}>
          {plantillas.map((template) => (
            <button
              key={template.nombre}
              type="button"
              className={style.templateCard}
              onClick={() => applyTemplate(template)}
            >
              <strong>{template.nombre}</strong>
              <span>{template.descripcion}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={style.tableWrapper}>
        <table>
          <tbody>
            {rows.map((item, index) => {
              const ejercicioOptions = toOptions(
                ejerciciosPorRutina[item.rutina] ?? [],
              );
              return (
                <tr key={index}>
                  <td>
                    <span className={style.mobileLabel}>Día</span>
                    <div className={style.selectWrapper}>
                      <Select
                        aria-label="Día"
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={diasOptions}
                        placeholder="Seleccionar"
                        value={
                          diasOptions.find((o) => o.value === item.dia) ?? null
                        }
                        onChange={(selected) =>
                          handleChange(index, { dia: selected?.value ?? "" })
                        }
                      />
                    </div>
                  </td>

                  <td>
                    <span className={style.mobileLabel}>Rutina</span>
                    <div className={style.selectWrapper}>
                      <Select
                        aria-label="Grupo muscular"
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={grupoOptions}
                        placeholder="Seleccionar"
                        value={
                          grupoOptions.find((o) => o.value === item.rutina) ??
                          null
                        }
                        onChange={(selected) =>
                          handleChange(index, {
                            rutina: selected?.value ?? "",
                            ejercicio: "",
                          })
                        }
                      />
                    </div>
                  </td>

                  <td>
                    <span className={style.mobileLabel}>Ejercicio</span>
                    <div className={style.selectWrapper}>
                      <Select
                        aria-label="Ejercicio"
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Seleccionar"
                        isDisabled={!item.rutina}
                        options={ejercicioOptions}
                        value={
                          item.ejercicio
                            ? { value: item.ejercicio, label: item.ejercicio }
                            : null
                        }
                        onChange={(selected) =>
                          handleChange(index, {
                            ejercicio: selected?.value ?? "",
                          })
                        }
                      />
                    </div>
                  </td>

                  <td>
                    <span className={style.mobileLabel}>Series</span>
                    <div className={style.selectWrapper}>
                      <Select
                        aria-label="Series"
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={seriesOptions}
                        placeholder="Seleccionar"
                        value={
                          seriesOptions.find((o) => o.value === item.series) ??
                          null
                        }
                        onChange={(selected) =>
                          handleChange(index, { series: selected?.value ?? "" })
                        }
                      />
                    </div>
                  </td>

                  <td>
                    <span className={style.mobileLabel}>Repeticiones</span>
                    <div className={style.selectWrapper}>
                      <Select
                        aria-label="Repeticiones"
                        isSearchable={false}
                        styles={customSelectStyles}
                        options={repsOptions}
                        placeholder="Seleccionar"
                        value={
                          repsOptions.find((o) => o.value === item.reps) ?? null
                        }
                        onChange={(selected) =>
                          handleChange(index, { reps: selected?.value ?? "" })
                        }
                      />
                    </div>
                  </td>

                  <td className={style.rowActions}>
                    <button
                      type="button"
                      className={style.duplicateButton}
                      aria-label="Duplicar fila"
                      title="Duplicar fila"
                      disabled={!item.rutina}
                      onClick={() => duplicateRow(index)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className={style.deleteButton}
                      aria-label="Eliminar ejercicio"
                      title="Eliminar ejercicio"
                      onClick={() => removeRow(index)}
                    >
                      <IoIosClose />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={style.stats}>
        <div className={style.stats1}>
          <h4>Ejercicios</h4>
          <p>{rows.filter((r) => r.ejercicio).length}</p>
        </div>

        <div className={style.stats1}>
          <h4>Días de entrenamiento</h4>
          <p>{diasActivos}</p>
        </div>

        <div className={style.stats2}>
          <h4>Total Series</h4>
          <p>{totalSeries}</p>
        </div>
      </div>

      {resumenPorDia.length > 0 && (
        <div className={style.summary}>
          <h3>Resumen semanal</h3>
          <div className={style.summaryGrid}>
            {resumenPorDia.map(([dia, items]) => (
              <div key={dia} className={style.summaryDay}>
                <h4>{dia}</h4>
                <ul>
                  {items.map((item, i) => (
                    <li key={`${item.ejercicio}-${i}`}>
                      {item.ejercicio}
                      {item.series && item.reps
                        ? ` · ${item.series}x${item.reps}`
                        : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className={style.errorMessage} role="alert">
          {error}
        </div>
      )}

      <div className={style.actions}>
        <button type="button" className={style.addButton} onClick={addRow}>
          Agregar Ejercicio
        </button>

        <button type="button" className={style.addButton} onClick={downloadPDF}>
          Descargar PDF
        </button>

        <button type="button" className={style.clearButton} onClick={clearRoutine}>
          Limpiar Rutina
        </button>
      </div>
    </div>
  );
};

const RoutineBuilder = () => {
  const { isLoading, user } = useAuth0();
  if (isLoading) return null;
  return <RoutineBuilderInner key={user?.sub ?? "guest"} userId={user?.sub} />;
};

export default RoutineBuilder;
