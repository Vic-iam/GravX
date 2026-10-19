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
          meta: "resistencia",
          imagen: "/workouts/apMachine.png",
        },
        {
          id: 19,
          nombre: "Press banca máquina",
          duracion: 30,
          areas: "Pecho medio",
          meta: "resistencia",
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
          meta: "Fuerza",
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
          nombre: "press Militar",
          duracion: 30,
          areas: "hombro",
          meta: "Resistencia",
          imagen: "/workouts/pressMilitar.gif",
        },
      ],
      intermedio: [
        {
          id: 13,
          nombre: "Elevaciones laterals",
          duracion: 32,
          areas: "hombro",
          meta: "Hipertrofia",
          imagen: "/workouts/elevacionesLaterales.gif",
        },
      ],
      profesional: [
        {
          id: 14,
          nombre: "press militar con barra",
          duracion: 32,
          areas: "hombro",
          meta: "Fuerza",
          imagen: "/workouts/pressMilitarBarra.gif",
        },
      ],
    },
  },
];

const ex = (
  id: number,
  nombre: string,
  duracion: number,
  areas: string,
  meta: string,
): WorkoutItem => ({ id, nombre, duracion, areas, meta, imagen: "" });

const extras: Record<string, WorkoutLevels> = {
  Pecho: {
    principiante: [
      ex(100, "Flexiones", 20, "Pecho y tríceps", "Resistencia"),
      ex(101, "Aperturas en máquina (peck deck)", 25, "Pecho medio", "Resistencia"),
    ],
    intermedio: [
      ex(102, "Press inclinado con mancuernas", 40, "Pecho superior", "Hipertrofia"),
      ex(103, "Aperturas con mancuernas", 30, "Pecho completo", "Hipertrofia"),
    ],
    profesional: [
      ex(104, "Fondos en paralelas", 45, "Pecho inferior", "Fuerza"),
      ex(105, "Cruce de poleas", 40, "Pecho completo", "Definición"),
    ],
  },
  Espalda: {
    principiante: [
      ex(106, "Remo en máquina", 25, "Espalda media", "Resistencia"),
      ex(107, "Jalón con agarre cerrado", 30, "Dorsales", "Resistencia"),
    ],
    intermedio: [
      ex(108, "Remo con mancuerna", 35, "Dorsales", "Hipertrofia"),
      ex(109, "Remo en polea baja", 35, "Espalda media", "Hipertrofia"),
    ],
    profesional: [
      ex(110, "Peso muerto", 50, "Espalda baja y piernas", "Fuerza"),
      ex(111, "Remo Pendlay", 45, "Espalda alta", "Fuerza"),
    ],
  },
  Biceds: {
    principiante: [ex(112, "Curl con mancuernas", 20, "Bíceps", "Resistencia")],
    intermedio: [
      ex(113, "Curl martillo", 30, "Bíceps y antebrazo", "Hipertrofia"),
      ex(114, "Curl concentrado", 25, "Bíceps", "Hipertrofia"),
    ],
    profesional: [ex(115, "Curl predicador", 40, "Bíceps", "Fuerza")],
  },
  Triceds: {
    principiante: [ex(116, "Fondos en banco", 20, "Tríceps", "Resistencia")],
    intermedio: [
      ex(117, "Press francés", 30, "Tríceps", "Hipertrofia"),
      ex(118, "Patada de tríceps", 25, "Tríceps", "Definición"),
    ],
    profesional: [ex(119, "Press cerrado", 40, "Tríceps y pecho", "Fuerza")],
  },
  Hombro: {
    principiante: [ex(120, "Press con mancuernas sentado", 25, "Hombro", "Resistencia")],
    intermedio: [
      ex(121, "Elevaciones frontales", 25, "Hombro anterior", "Hipertrofia"),
      ex(122, "Face pull", 25, "Hombro posterior", "Salud postural"),
    ],
    profesional: [ex(123, "Press Arnold", 40, "Hombro completo", "Fuerza")],
  },
  Pierna: {
    principiante: [
      ex(124, "Sentadilla goblet", 25, "Cuádriceps y glúteos", "Resistencia"),
      ex(125, "Prensa de piernas", 30, "Cuádriceps", "Resistencia"),
      ex(126, "Elevación de talones", 20, "Gemelos", "Resistencia"),
    ],
    intermedio: [
      ex(127, "Zancadas", 35, "Piernas y glúteos", "Hipertrofia"),
      ex(128, "Peso muerto rumano", 40, "Isquiotibiales", "Hipertrofia"),
      ex(129, "Puente de glúteos", 30, "Glúteos", "Hipertrofia"),
    ],
    profesional: [
      ex(130, "Sentadilla con barra", 50, "Piernas completas", "Fuerza"),
      ex(131, "Sentadilla búlgara", 45, "Cuádriceps y glúteos", "Fuerza"),
    ],
  },
};

workouts.forEach((categoria) => {
  const more = extras[categoria.nombre];
  if (!more) return;
  categoria.types.principiante.push(...more.principiante);
  categoria.types.intermedio.push(...more.intermedio);
  categoria.types.profesional.push(...more.profesional);
});

workouts.push({
  id: 6,
  nombre: "Pierna",
  types: extras.Pierna,
});

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
