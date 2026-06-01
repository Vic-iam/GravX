import { useState,useEffect } from "react";
import style from "./RoutineBuilder.module.css";

type Exercise = {
  ejercicio: string;
  series: string;
  reps: string;
};

const saveRoutine = () => {
  localStorage.setItem("myRoutine", JSON.stringify(rows));

  alert("Rutina guardada");
};

useEffect(() => {
  const savedRoutine =
    localStorage.getItem("myRoutine");

  if (savedRoutine) {
    setRows(JSON.parse(savedRoutine));
  }
}, []);

const RoutineBuilder = () => {
  const [rows, setRows] = useState<Exercise[]>([
    {
      ejercicio: "",
      series: "",
      reps: "",
    },
  ]);

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

  const addRow = () => {
    setRows([
      ...rows,
      {
        ejercicio: "",
        series: "",
        reps: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
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
                <input
                  value={row.ejercicio}
                  onChange={(e) =>
                    handleChange(index, "ejercicio", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={row.series}
                  onChange={(e) =>
                    handleChange(index, "series", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={row.reps}
                  onChange={(e) => handleChange(index, "reps", e.target.value)}
                />
              </td>

              <td>
                <button onClick={() => removeRow(index)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow}>+ Agregar ejercicio</button>
      <button onClick={saveRoutine}>Guardar rutina</button>
    </div>
  );
};

export default RoutineBuilder;
