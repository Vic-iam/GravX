export interface WorkoutsItem {
  nombre: string;
  duracion: number;
  meta: string;
  imagen: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  niveles: string[];
  types: WorkoutsItem[];
}

export const workouts: Categoria[] = [
  {
    id: 1,
    nombre: "Pecho",
    niveles: ["Principiante", "Intermedio", "Profesional"],
    types: [
      {
        nombre: "Press Banca",
        duracion: 45,
        imagen: "/workouts/pressBanca.png",
        meta: "Fuerza",
      },
      {
        nombre: "Press Banca",
        duracion: 45,
        imagen: "/workouts/pressBanca.png",
        meta: "Fuerza",
      },
      {
        nombre: "Press Banca",
        duracion: 45,
        imagen: "/workouts/pressBanca.png",
        meta: "Fuerza",
      },
      {
        nombre: "Press Banca",
        duracion: 45,
        imagen: "/workouts/pressBanca.png",
        meta: "Fuerza",
      },
      {
        nombre: "Press Banca",
        duracion: 45,
        imagen: "/workouts/pressBanca.png",
        meta: "Fuerza",
      },
    ],
  },
  {
    id: 2,
    nombre: "Espalda",
    niveles: ["Principiante", "Intermedio", "Profesional"],
    types: [
      {
        nombre: "Dominadas",
        duracion: 45,
        imagen: "",
        meta: "Resistencia",
      },
    ],
  },
  {
    id: 1,
    nombre: "Pecho",
    niveles: ["Principiante", "Intermedio", "Profesional"],
    types: [
      {
        nombre: "Press Banca",
        duracion: 45,
        imagen: "/workouts/pressBanca.png",
        meta: "Fuerza",
      },
    ],
  },
  {
    id: 2,
    nombre: "Espalda",
    niveles: ["Principiante", "Intermedio", "Profesional"],
    types: [
      {
        nombre: "Dominadas",
        duracion: 45,
        imagen: "",
        meta: "Resistencia",
      },
    ],
  },
];

let error = false;

export const getProducts = (): Promise<Categoria[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject("Hubo un error");
      } else {
        resolve(workouts);
      }
    }, 500);
  });
};

export const getOneProduct = (nombre: string): Promise<WorkoutsItem> => {
  return new Promise((resolve, reject) => {
    const found = workouts
      .flatMap((c) => c.types)
      .find((i) => i.nombre.toLowerCase() === nombre.toLowerCase());

    if (found) resolve(found);
    else reject("No existe");
  });
};

export const getProductsByCategory = (
  type: string,
): Promise<WorkoutsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allItems = workouts.flatMap((c) => c.types);

      if (type.toLowerCase() === "todo") {
        resolve(allItems);
      } else {
        const filtered = allItems.filter(
          (i) => i.nombre.toLowerCase() === type.toLowerCase(),
        );
        resolve(filtered);
      }
    }, 500);
  });
};
