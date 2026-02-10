// tipos
export interface AlimentoItem {
  nombre: string;
  calorias: number;
  proteina: number;
  imagen: string;
  detalle: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  types: AlimentoItem[];
}

// datos
export const alimentos: Categoria[] = [
  {
    id: 1,
    nombre: "Proteinas",
    types: [
      { nombre: "Pollo",detalle: "El pollo es una excelente fuente de proteínas de alto valor biológico, bajo en grasas (especialmente la pechuga sin piel) y rico en vitaminas del complejo B (B3, B6, B12) y minerales esenciales como fósforo, zinc, selenio y hierro, contribuyendo al metabolismo energético, el sistema inmunológico y la salud ósea, con bajo contenido calórico y carbohidratos nulos, haciéndolo ideal para dietas equilibradas. " , calorias: 239, proteina: 27, imagen: "/image/chicken.png" },
      { nombre: "Carne", calorias: 143, proteina: 26, imagen: "/image/steak.png" },
      { nombre: "Atun", calorias: 130, proteina: 29, imagen: "/image/atun.png" },
      { nombre: "Huevos", calorias: 155, proteina: 13, imagen: "/image/egg.png" }
    ]
  },
  {
    id: 2,
    nombre: "Granos",
    types: [
      { nombre: "Arroz", calorias: 130, proteina: 2.7, imagen: "/image/arroz.png" },
      { nombre: "Avena", calorias: 380, proteina: 13, imagen: "/image/avena.png" },
      { nombre: "Quinoa", calorias: 370, proteina: 14, imagen: "/image/quinoa.png" },
      { nombre: "Cebada", calorias: 350, proteina: 11, imagen: "/image/cebada.png" }
    ]
  },
  {
    id: 3,
    nombre: "Frutas",
    types: [
      { nombre: "Fresa", calorias: 33, proteina: 0.7, imagen: "/image/fresas.png" },
      { nombre: "Sandia", calorias: 35, proteina: 1, imagen: "/image/sandia.png" },
      { nombre: "Melon", calorias: 33, proteina: 0.6, imagen: "/image/melon.png" },
      { nombre: "Banana", calorias: 95, proteina: 1.3, imagen: "/image/banana.png" }
    ]
  },
  {
    id: 4,
    nombre: "Verduras",
    types: [
      { nombre: "Apio", calorias: 15, proteina: 1, imagen: "/image/apio.png" },
      { nombre: "Lechuga", calorias: 15, proteina: 1, imagen: "/image/lechuga.png" },
      { nombre: "Pepino", calorias: 20, proteina: 1, imagen: "/image/pepino.png" },
      { nombre: "Brocoli", calorias: 34, proteina: 2.8, imagen: "/image/brocoli.png" }
    ]
  }
];

export const getOneProduct = (nombre: string): Promise<AlimentoItem> => {
  return new Promise((resolve, reject) => {
    const found = alimentos
      .flatMap(c => c.types)
      .find(i => i.nombre === nombre)

    found ? resolve(found) : reject("No existe")
  })
}