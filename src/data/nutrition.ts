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
      {
        nombre: "Pollo",
        detalle:
          "El pollo es una excelente fuente de proteínas de alto valor biológico, bajo en grasas (especialmente la pechuga sin piel) y rico en vitaminas del complejo B (B3, B6, B12) y minerales esenciales como fósforo, zinc, selenio y hierro, contribuyendo al metabolismo energético, el sistema inmunológico y la salud ósea, con bajo contenido calórico y carbohidratos nulos, haciéndolo ideal para dietas equilibradas. ",
        calorias: 239,
        proteina: 27,
        imagen: "/image/chicken.png",
      },
      {
        nombre: "Carne",
        calorias: 143,
        proteina: 26,
        imagen: "/image/steak.png",
        detalle:
          "La carne de res es un alimento rico en nutrientes, destacando por su alto contenido de proteínas de alto valor biológico (aprox. 20-35g por cada 100g) y hierro hemo de fácil absorción. Proporciona vitaminas esenciales (especialmente B12) y minerales como zinc y selenio. En promedio, 100g de carne magra cocida aportan entre 170-250 calorías y de 2 a 10g de grasa, dependiendo del corte. ",
      },
      {
        nombre: "Atun",
        calorias: 130,
        proteina: 29,
        imagen: "/image/atun.png",
        detalle:
          "El atún es muy nutritivo, rico en proteínas (alrededor de 23-29g por 100g) y bajo en calorías y carbohidratos, siendo una excelente fuente de Omega-3, vitaminas del grupo B (B3, B6, B12) y minerales como potasio, fósforo, selenio y yodo, beneficiando la salud cardiovascular, cerebral e inmunológica.",
      },
      {
        nombre: "Huevos",
        calorias: 155,
        proteina: 13,
        imagen: "/image/egg.png",
        detalle:
          "Un huevo mediano (50g) es un alimento de alto valor nutricional, con aproximadamente 70-75 kcal, 6-7g de proteínas de alto valor biológico y 5g de grasas saludables (mayormente insaturadas). Aporta vitaminas A, D, E, B12, así como colina, selenio y zinc, siendo un alimento básico versátil para la salud cardiovascular y cognitiva. ",
      },
    ],
  },
  {
    id: 2,
    nombre: "Granos",
    types: [
      {
        nombre: "Arroz",
        calorias: 130,
        proteina: 2.7,
        imagen: "/image/arroz.png",
        detalle:
          "El arroz es un alimento básico rico en carbohidratos complejos, ideal para obtener energía. Por cada 100 gramos de arroz blanco cocido, aporta aproximadamente 130-150 kcal, 2.5-3g de proteínas y menos de 1g de grasa. Es una excelente fuente de energía, bajo en grasas, y el tipo integral aporta más fibra y minerales. ",
      },
      {
        nombre: "Avena",
        calorias: 380,
        proteina: 13,
        imagen: "/image/avena.png",
        detalle:
          "La avena es un cereal integral altamente nutritivo, rico en carbohidratos complejos, fibra (destacando el betaglucano) y proteínas vegetales. Por cada \(100\text{\ g}\), aporta aproximadamente \(360\text{-}390\text{\ kcal}\), \(\sim 12\text{-}13\text{\ g}\) de proteína, \(\sim 60\text{-}67\text{\ g}\) de carbohidratos y grasas saludables. Es una fuente excelente de energía sostenida, minerales como magnesio, fósforo y hierro, y vitaminas del grupo B. ",
      },
      {
        nombre: "Quinoa",
        calorias: 370,
        proteina: 14,
        imagen: "/image/quinoa.png",
        detalle:
          "La quinoa es un pseudocereal de alto valor nutricional, rico en proteínas completas (14-15%), fibra, y minerales como hierro, magnesio y zinc. Una taza (185g) de quinoa cocida aporta aproximadamente 222 calorías, 8g de proteínas, 5g de fibra y 39g de carbohidratos, siendo apta para celíacos al no contener gluten. ",
      },
      {
        nombre: "Cebada",
        calorias: 350,
        proteina: 11,
        imagen: "/image/cebada.png",
        detalle:
          "La cebada es un cereal altamente nutritivo, rico en fibra (especialmente beta-glucanos) y minerales como potasio, magnesio y hierro. Una taza (157-184g) de cebada perlada cocida aporta aproximadamente 193-198 calorías, 3.5g de proteínas y alta fibra, ideal para la salud intestinal y la reducción del colesterol. Es baja en grasas y una excelente fuente de energía duradera. ",
      },
    ],
  },
  {
    id: 3,
    nombre: "Frutas",
    types: [
      {
        nombre: "Fresa",
        calorias: 33,
        proteina: 0.7,
        imagen: "/image/fresas.png",
        detalle:
          "La fresa es una fruta de bajo aporte calórico (aprox. 32-35 kcal cada 100g) compuesta principalmente por agua. Es destacada por su alto contenido de Vitamina C (superior a la naranja), fibra, potasio y antioxidantes (antocianinas). Una porción de 100g aporta unos 7g de carbohidratos y menos de 1g de proteínas y grasas. ",
      },
      {
        nombre: "Sandia",
        calorias: 35,
        proteina: 1,
        imagen: "/image/sandia.png",
        detalle:
          "La sandía es una fruta altamente hidratante, compuesta por más del 90% de agua, lo que la convierte en un alimento de muy bajo valor calórico (aprox. \(20-30\) kcal por \(100\) g). Es rica en licopeno (antioxidante), vitamina C, vitamina A y potasio, ideal para la salud cardiovascular y la hidratación. ",
      },
      {
        nombre: "Melon",
        calorias: 33,
        proteina: 0.6,
        imagen: "/image/melon.png",
        detalle:
          "El melón es una fruta altamente refrescante, compuesta por más del 90% de agua y muy baja en calorías (aprox. 34-53 kcal por taza). Destaca por ser una excelente fuente de vitaminas A y C, además de potasio, folato y fibra, siendo beneficioso para la hidratación, la presión arterial y la salud ocular. ",
      },
      {
        nombre: "Banana",
        calorias: 95,
        proteina: 1.3,
        imagen: "/image/banana.png",
        detalle:
          "Una banana (plátano) de tamaño mediano (aprox. 100-120g) aporta alrededor de 90-110 calorías, 0g de grasa, 1g de proteína y 25-28g de carbohidratos, siendo una excelente fuente de energía. Es famosa por su alto contenido de potasio (aprox. 400-450mg), necesario para la salud muscular y nerviosa, además de proporcionar fibra (2.5-3g), vitamina B6 y vitamina C. ",
      },
    ],
  },
  {
    id: 4,
    nombre: "Verduras",
    types: [
      {
        nombre: "Apio",
        calorias: 15,
        proteina: 1,
        imagen: "/image/apio.png",
        detalle:
          "El apio es una hortaliza extremadamente baja en calorías (aprox. 16-17 kcal por 100 g) y rica en agua, lo que lo hace muy hidratante. Aporta fibra, vitaminas A, B, C y K, ácido fólico, y minerales como potasio y magnesio. Es ideal para dietas de control de peso por su saciedad y acción depurativa. ",
      },
      {
        nombre: "Lechuga",
        calorias: 15,
        proteina: 1,
        imagen: "/image/lechuga.png",
        detalle:
          "La lechuga es una hortaliza de muy bajo valor calórico (aprox. \(15\) kcal/100g) y alto contenido en agua (más del 95%), ideal para dietas de control de peso. Aporta fibra, vitamina K, vitamina C, folatos y potasio, siendo las hojas más verdes y externas las más densas nutricionalmente. Es baja en grasa y sodio, rica en antioxidantes y ayuda a la hidratación. ",
      },
      {
        nombre: "Pepino",
        calorias: 20,
        proteina: 1,
        imagen: "/image/pepino.png",
        detalle:
          "El pepino es una hortaliza extremadamente hidratante (95-97% agua) y baja en calorías, ideal para dietas de control de peso y salud digestiva. Por cada 100g aporta aproximadamente 12-15 kcal, 0.6g de proteínas, 2g de hidratos de carbono y fibra. Es fuente de potasio, magnesio, vitamina C y K, además de compuestos antioxidantes como flavonoides. ",
      },
      {
        nombre: "Brocoli",
        calorias: 34,
        proteina: 2.8,
        imagen: "/image/brocoli.png",
        detalle:
          "El brócoli es un vegetal altamente nutritivo, bajo en calorías (\(34\) kcal por \(100\) g) y rico en fibra, vitamina C (\(89\)-\(91\) mg), vitamina K (\(77\)-\(102\) mcg) y folato. Contiene un \(90\%\) de agua, con bajos niveles de grasas y carbohidratos, siendo ideal para dietas saludables. Destaca por sus compuestos antioxidantes y anticancerígenos, como el sulforafano, que fortalecen el sistema inmunológico y la salud ósea. ",
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
        resolve(alimentos);
      }
    }, 500);
  });
};

export const getOneProduct = (nombre: string): Promise<AlimentoItem> => {
  return new Promise((resolve, reject) => {
    const found = alimentos
      .flatMap(c => c.types)
      .find(i => i.nombre.toLowerCase() === nombre.toLowerCase());

    if (found) resolve(found);
    else reject("No existe");
  });
};

