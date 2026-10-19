import { useCallback, useState } from "react";

export type Profile = {
  nombre: string;
  foto: string;
  altura: string;
  objetivo: string;
  metaCalorias: string;
  metaProteina: string;
  metaCarbos: string;
  metaGrasas: string;
};

export type Meal = {
  id: string;
  fecha: string;
  comida: string;
  nombre: string;
  gramos: number;
  calorias: number;
  proteina: number;
  carbos: number;
  grasas: number;
};

export type WorkoutLog = {
  id: string;
  fecha: string;
  ejercicio: string;
  series: number;
  reps: number;
  peso: number;
  completado: boolean;
};

export type Measurement = {
  id: string;
  fecha: string;
  peso: number;
  cintura: number;
  pecho: number;
  brazo: number;
  cadera: number;
};

export type ProgressPhoto = {
  id: string;
  fecha: string;
  src: string;
};

export type WaterLog = Record<string, number>;

export const COMIDAS = ["Desayuno", "Almuerzo", "Merienda", "Cena"];

export const emptyProfile: Profile = {
  nombre: "",
  foto: "",
  altura: "",
  objetivo: "Mantener",
  metaCalorias: "2200",
  metaProteina: "140",
  metaCarbos: "250",
  metaGrasas: "70",
};

const dateToKey = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

export const today = () => dateToKey(new Date());

export const lastDays = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (count - 1 - index));
    return dateToKey(date);
  });

export const formatDate = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const newId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/**
 * Persistencia por usuario. Hoy usa localStorage; para pasar a una base de
 * datos solo hay que reemplazar la lectura y escritura de estas dos funciones.
 */
export const readUserData = <T>(userId: string, key: string, initial: T): T => {
  try {
    const stored = localStorage.getItem(`gravx:${userId}:${key}`);
    if (stored !== null) return JSON.parse(stored) as T;
  } catch {
    // Datos corruptos: se parte desde el valor inicial.
  }
  return initial;
};

// Devuelve false si el navegador no pudo guardar (p. ej. almacenamiento lleno).
export const writeUserData = <T>(userId: string, key: string, value: T) => {
  try {
    localStorage.setItem(`gravx:${userId}:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const useUserData = <T>(userId: string, key: string, initial: T) => {
  const [value, setValue] = useState<T>(() => readUserData(userId, key, initial));

  // Se relee del almacenamiento para no pisar cambios hechos desde otra pantalla.
  const update = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (previous: T) => T)(readUserData(userId, key, initial))
          : next;
      if (!writeUserData(userId, key, resolved)) return false;
      setValue(resolved);
      return true;
    },
    // `initial` es solo el valor por defecto y no debe recrear la función.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, key],
  );

  return [value, update] as const;
};

export const addMeal = (userId: string, meal: Omit<Meal, "id">) =>
  writeUserData<Meal[]>(userId, "meals", [
    ...readUserData<Meal[]>(userId, "meals", []),
    { id: newId(), ...meal },
  ]);

export const addMeasurement = (
  userId: string,
  entry: Partial<Omit<Measurement, "id" | "fecha">>,
) =>
  writeUserData<Measurement[]>(userId, "measures", [
    ...readUserData<Measurement[]>(userId, "measures", []),
    {
      id: newId(),
      fecha: today(),
      peso: 0,
      cintura: 0,
      pecho: 0,
      brazo: 0,
      cadera: 0,
      ...entry,
    },
  ]);

export const addWorkoutLogs = (
  userId: string,
  entries: Omit<WorkoutLog, "id" | "fecha" | "completado">[],
) =>
  writeUserData<WorkoutLog[]>(userId, "workouts", [
    ...readUserData<WorkoutLog[]>(userId, "workouts", []),
    ...entries.map((entry) => ({
      id: newId(),
      fecha: today(),
      completado: false,
      ...entry,
    })),
  ]);

export const resizeImage = (
  file: File,
  maxSize: number,
  quality = 0.8,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("No se pudo procesar la imagen."));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("El archivo no es una imagen válida."));
    };
    image.src = url;
  });
