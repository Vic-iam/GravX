export interface WorkoutItem {
  id: number;
  nombre: string;
  duracion: number;
  areas: string;
  meta: string;
  imagen: string;
}

export interface WorkoutLevels {
  principiante: WorkoutItem[];
  intermedio: WorkoutItem[];
  profesional: WorkoutItem[];
}

export interface Categoria {
  id: number;
  nombre: string;
  types: WorkoutLevels;
}
export const workouts: Categoria[] = [
  {
    id: 1,
    nombre: "Pecho",
    types: {
      principiante: [
        {
          id: 1,
          nombre: "Press banca máquina",
          duracion: 30,
          areas: "Pecho medio",
          meta: "Fuerza",
          imagen: "/workouts/apMachine.png",
        },
      ],
      intermedio: [
        {
          id: 2,
          nombre: "Press banca libre",
          duracion: 40,
          areas: "Pecho completo",
          meta: "Hipertrofia",
          imagen: "/workouts/pressBanca.png",
        },
      ],
      profesional: [
        {
          id: 3,
          nombre: "Press inclinado con barra",
          duracion: 50,
          areas: "Pecho superior",
          meta: "Fuerza máxima",
          imagen: "/workouts/pressInclinadoBarra.png",
        },
      ],
    },
  },

  {
    id: 2,
    nombre: "Espalda",
    types: {
      principiante: [
        {
          id: 4,
          nombre: "Jalón al pecho",
          duracion: 30,
          areas: "Dorsales",
          meta: "Resistencia",
          imagen: "/workouts/jalonAlPecho.png",
        },
      ],
      intermedio: [
        {
          id: 5,
          nombre: "Remo con barra",
          duracion: 40,
          areas: "Espalda media",
          meta: "Hipertrofia",
          imagen: "/workouts/remoConBarra.png",
        },
      ],
      profesional: [
        {
          id: 6,
          nombre: "Dominadas lastradas",
          duracion: 50,
          areas: "Dorsales",
          meta: "Fuerza",
          imagen: "/workouts/dominadaLastrada.png",
        },
      ],
    },
  },
  {
    id: 3,
    nombre: "Biceds",
    types: {
      principiante: [
        {
          id: 7,
          nombre: "curl de biceds de pie",
          duracion: 30,
          areas: "Biced",
          meta: "Resistencia",
          imagen: "/workouts/curlBiceds.png",
        },
      ],
      intermedio: [
        {
          id: 8,
          nombre: "curl barra de pie",
          duracion: 40,
          areas: "biced",
          meta: "hipertrofia",
          imagen: "/workouts/curlBarra.png",
        },
      ],

      profesional: [
        {
          id: 9,
          nombre: "curl araña",
          duracion: 50,
          areas: "biced",
          meta: "Fuerza",
          imagen: "/workouts/curlAraña.png",
        },
      ],
    },
  },
  {
    id: 4,
    nombre: "Triceds",
    types: {
      principiante: [
        {
          id: 11,
          nombre: "Extensiones de triceps en polea",
          duracion: 30,
          areas: "triced",
          meta: "Resistencia",
          imagen: "/workouts/extenTricedPolea.png",
        },
      ],
      intermedio: [
        {
          id: 10,
          nombre: "Extensiones de triceps en polea alta",
          duracion: 40,
          areas: "triced",
          meta: "Hipertofia",
          imagen: "/workouts/extenTricedPoleaAlta.png",
        },
      ],
      profesional: [
        {
          id: 11,
          nombre: "Extensiones horizontal con barra Z",
          duracion: 50,
          areas: "triced",
          meta: "Fuerza",
          imagen: "/workouts/extenTricepBarraZ.png",
        },
      ],
    },
  },
  {
    id: 5,
    nombre: "Hombro",
    types: {
      principiante: [
        {
          id: 12,
          nombre: "Press Militar",
          duracion: 30,
          areas: "hombro",
          meta: "Resistencia",
          imagen: "/workout/pressMilitar.png",
        },
      ],
      intermedio: [
        {
          id: 13,
          nombre: "gsaas",
          duracion: 32,
          areas: "hombor",
          meta: "Hipertrofia",
          imagen: "/",
        },
      ],
      profesional: [
        {
          id: 14,
          nombre: "gsaas",
          duracion: 32,
          areas: "hombor",
          meta: "Hipertrofia",
          imagen: "/",
        },
      ],
    },
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

export const getProductsByCategory = (
  categoryName: string,
): Promise<WorkoutItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryName.toLowerCase() === "todo") {
        const allItems = workouts.flatMap((c) => Object.values(c.types).flat());

        resolve(allItems);
      } else {
        const category = workouts.find(
          (c) => c.nombre.toLowerCase() === categoryName.toLowerCase(),
        );

        if (category) {
          const items = Object.values(category.types).flat();
          resolve(items);
        } else {
          resolve([]);
        }
      }
    }, 500);
  });
};
