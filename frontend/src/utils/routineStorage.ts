export type Exercise = {
  dia: string;
  rutina: string;
  ejercicio: string;
  series: string;
  reps: string;
};

const LEGACY_KEY = "myRoutine";
export const ROUTINE_EVENT = "routine-updated";

const keyFor = (userId?: string) =>
  userId ? `gravx:${userId}:routine` : LEGACY_KEY;

export const DIAS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const todayName = () => DIAS[(new Date().getDay() + 6) % 7];

export const emptyRow = (): Exercise => ({
  dia: "",
  rutina: "",
  ejercicio: "",
  series: "",
  reps: "",
});

export const isComplete = (row: Exercise) =>
  Boolean(row.dia && row.rutina && row.ejercicio && row.series && row.reps);

const isExercise = (value: unknown): value is Exercise => {
  if (typeof value !== "object" || value === null) return false;
  const row = value as Record<string, unknown>;
  return ["dia", "rutina", "ejercicio", "series", "reps"].every(
    (key) => typeof row[key] === "string",
  );
};

const parseRoutine = (raw: string | null): Exercise[] | null => {
  try {
    const parsed: unknown = JSON.parse(raw ?? "null");
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(isExercise)) {
      return parsed;
    }
  } catch {
    // Datos corruptos: se empieza con una rutina vacía.
  }
  return null;
};

/**
 * Con sesión iniciada se usa la rutina del usuario; si todavía no tiene una,
 * se parte de la que existía en este navegador.
 */
export const loadRoutine = (userId?: string): Exercise[] =>
  parseRoutine(localStorage.getItem(keyFor(userId))) ??
  (userId ? parseRoutine(localStorage.getItem(LEGACY_KEY)) : null) ?? [
    emptyRow(),
  ];

export const saveRoutine = (rows: Exercise[], userId?: string) => {
  localStorage.setItem(keyFor(userId), JSON.stringify(rows));
};

const GRUPOS: Record<string, string> = {
  Biceds: "Biceps",
  Triceds: "Triceps",
};

/** Agrega un ejercicio a la rutina guardada. Devuelve false si ya existía. */
export const addExerciseToRoutine = (
  grupo: string,
  ejercicio: string,
  userId?: string,
): boolean => {
  const rutina = GRUPOS[grupo] ?? grupo;
  const rows = loadRoutine(userId).filter(
    (row) => row.dia || row.rutina || row.ejercicio,
  );

  if (rows.some((row) => row.rutina === rutina && row.ejercicio === ejercicio)) {
    return false;
  }

  saveRoutine(
    [...rows, { dia: "", rutina, ejercicio, series: "3", reps: "12" }],
    userId,
  );
  window.dispatchEvent(new Event(ROUTINE_EVENT));
  return true;
};
