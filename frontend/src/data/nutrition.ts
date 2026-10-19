// tipos
export interface AlimentoItem {
  nombre: string;
  calorias: number;
  proteina: number;
  carbos: number;
  grasas: number;
  genero: string[];
  categoria: string;
  imagen: string;
  emoji?: string;
  detalle: string;
  td: string;
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
        carbos: 0,
        grasas: 14,
        genero: ["mayor-proteina", "mayor-calorias"],
        detalle:
          "El pollo es una excelente fuente de proteínas de alto valor biológico, bajo en grasas (especialmente la pechuga sin piel) y rico en vitaminas del complejo B (B3, B6, B12) y minerales esenciales como fósforo, zinc, selenio y hierro, contribuyendo al metabolismo energético, el sistema inmunológico y la salud ósea, con bajo contenido calórico y carbohidratos nulos, haciéndolo ideal para dietas equilibradas. ",
        calorias: 239,
        proteina: 27,
        categoria: "proteina",
        td: "todo",
        imagen: "/nutrition/chicken.png",
      },
      {
        nombre: "Carne",
        carbos: 0,
        grasas: 3.5,
        calorias: 143,
        genero: ["mayor-proteina", "menor-calorias"],
        proteina: 26,
        imagen: "/nutrition/steak.png",
        categoria: "proteina",
        td: "todo",
        detalle:
          "La carne de res es un alimento rico en nutrientes, destacando por su alto contenido de proteínas de alto valor biológico (aprox. 20-35g por cada 100g) y hierro hemo de fácil absorción. Proporciona vitaminas esenciales (especialmente B12) y minerales como zinc y selenio. En promedio, 100g de carne magra cocida aportan entre 170-250 calorías y de 2 a 10g de grasa, dependiendo del corte. ",
      },
      {
        nombre: "Atun",
        carbos: 0,
        grasas: 1,
        calorias: 130,
        categoria: "proteina",
        genero: ["mayor-proteina", "menor-calorias"],
        proteina: 29,
        td: "todo",
        imagen: "/nutrition/atun.png",
        detalle:
          "El atún es muy nutritivo, rico en proteínas (alrededor de 23-29g por 100g) y bajo en calorías y carbohidratos, siendo una excelente fuente de Omega-3, vitaminas del grupo B (B3, B6, B12) y minerales como potasio, fósforo, selenio y yodo, beneficiando la salud cardiovascular, cerebral e inmunológica.",
      },
      {
        nombre: "Huevos",
        carbos: 1.1,
        grasas: 11,
        calorias: 155,
        categoria: "proteina",
        proteina: 13,
        td: "todo",
        genero: ["mayor-proteina", "menor-calorias"],
        imagen: "/nutrition/egg.png",
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
        carbos: 28,
        grasas: 0.3,
        calorias: 130,
        categoria: "granos",
        td: "todo",
        genero: ["menor-proteina", "mayor-calorias"],
        proteina: 2.7,
        imagen: "/nutrition/arroz.png",
        detalle:
          "El arroz es un alimento básico rico en carbohidratos complejos, ideal para obtener energía. Por cada 100 gramos de arroz blanco cocido, aporta aproximadamente 130-150 kcal, 2.5-3g de proteínas y menos de 1g de grasa. Es una excelente fuente de energía, bajo en grasas, y el tipo integral aporta más fibra y minerales. ",
      },
      {
        nombre: "Avena",
        carbos: 67,
        grasas: 7,
        calorias: 380,
        categoria: "granos",
        td: "todo",
        proteina: 13,
        genero: ["mayor-proteina", "menor-calorias"],
        imagen: "/nutrition/avena.png",
        detalle:
          "La avena es un cereal integral altamente nutritivo, rico en carbohidratos complejos, fibra (destacando el betaglucano) y proteínas vegetales. Por cada \(100\text{\ g}\), aporta aproximadamente \(360\text{-}390\text{\ kcal}\), \(\sim 12\text{-}13\text{\ g}\) de proteína, \(\sim 60\text{-}67\text{\ g}\) de carbohidratos y grasas saludables. Es una fuente excelente de energía sostenida, minerales como magnesio, fósforo y hierro, y vitaminas del grupo B. ",
      },
      {
        nombre: "Quinoa",
        carbos: 64,
        grasas: 6,
        calorias: 370,
        categoria: "granos",
        td: "todo",
        proteina: 14,
        genero: ["mayor-proteina", "menor-calorias"],
        imagen: "/nutrition/quinoa.png",
        detalle:
          "La quinoa es un pseudocereal de alto valor nutricional, rico en proteínas completas (14-15%), fibra, y minerales como hierro, magnesio y zinc. Una taza (185g) de quinoa cocida aporta aproximadamente 222 calorías, 8g de proteínas, 5g de fibra y 39g de carbohidratos, siendo apta para celíacos al no contener gluten. ",
      },
      {
        nombre: "Cebada",
        carbos: 73,
        grasas: 1.2,
        calorias: 350,
        proteina: 11,
        categoria: "granos",
        td: "todo",
        genero: ["menor-proteina", "mayor-calorias"],
        imagen: "/nutrition/cebada.png",
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
        carbos: 8,
        grasas: 0.3,
        calorias: 33,
        categoria: "frutas",
        td: "todo",
        proteina: 0.7,
        genero: ["menor-proteina", "menor-calorias"],
        imagen: "/nutrition/fresas.png",
        detalle:
          "La fresa es una fruta de bajo aporte calórico (aprox. 32-35 kcal cada 100g) compuesta principalmente por agua. Es destacada por su alto contenido de Vitamina C (superior a la naranja), fibra, potasio y antioxidantes (antocianinas). Una porción de 100g aporta unos 7g de carbohidratos y menos de 1g de proteínas y grasas. ",
      },
      {
        nombre: "Sandia",
        carbos: 8,
        grasas: 0.2,
        calorias: 35,
        categoria: "frutas",
        td: "todo",
        proteina: 1,
        genero: ["menor-proteina", "menor-calorias"],
        imagen: "/nutrition/sandia.png",
        detalle:
          "La sandía es una fruta altamente hidratante, compuesta por más del 90% de agua, lo que la convierte en un alimento de muy bajo valor calórico (aprox. \(20-30\) kcal por \(100\) g). Es rica en licopeno (antioxidante), vitamina C, vitamina A y potasio, ideal para la salud cardiovascular y la hidratación. ",
      },
      {
        nombre: "Melon",
        carbos: 8,
        grasas: 0.2,
        calorias: 33,
        categoria: "frutas",
        td: "todo",
        proteina: 0.6,
        genero: ["menor-proteina", "menor-calorias"],
        imagen: "/nutrition/melon.png",
        detalle:
          "El melón es una fruta altamente refrescante, compuesta por más del 90% de agua y muy baja en calorías (aprox. 34-53 kcal por taza). Destaca por ser una excelente fuente de vitaminas A y C, además de potasio, folato y fibra, siendo beneficioso para la hidratación, la presión arterial y la salud ocular. ",
      },
      {
        nombre: "Banana",
        carbos: 23,
        grasas: 0.3,
        calorias: 95,
        categoria: "frutas",
        td: "todo",
        genero: ["menor-proteina", "menor-calorias"],
        proteina: 1.3,
        imagen: "/nutrition/banana.png",
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
        carbos: 3,
        grasas: 0.2,
        calorias: 15,
        proteina: 1,
        categoria: "verduras",
        td: "todo",
        genero: ["menor-proteina", "menor-calorias"],
        imagen: "/nutrition/apio.png",
        detalle:
          "El apio es una hortaliza extremadamente baja en calorías (aprox. 16-17 kcal por 100 g) y rica en agua, lo que lo hace muy hidratante. Aporta fibra, vitaminas A, B, C y K, ácido fólico, y minerales como potasio y magnesio. Es ideal para dietas de control de peso por su saciedad y acción depurativa. ",
      },
      {
        nombre: "Lechuga",
        carbos: 3,
        grasas: 0.2,
        calorias: 15,
        categoria: "verduras",
        proteina: 1,
        td: "todo",
        genero: ["menor-proteina", "menor-calorias"],
        imagen: "/nutrition/lechuga.png",
        detalle:
          "La lechuga es una hortaliza de muy bajo valor calórico (aprox. \(15\) kcal/100g) y alto contenido en agua (más del 95%), ideal para dietas de control de peso. Aporta fibra, vitamina K, vitamina C, folatos y potasio, siendo las hojas más verdes y externas las más densas nutricionalmente. Es baja en grasa y sodio, rica en antioxidantes y ayuda a la hidratación. ",
      },
      {
        nombre: "Pepino",
        carbos: 4,
        grasas: 0.1,
        calorias: 20,
        proteina: 1,
        categoria: "verduras",
        genero: ["menor-proteina", "menor-calorias"],
        imagen: "/nutrition/pepino.png",
        td: "todo",
        detalle:
          "El pepino es una hortaliza extremadamente hidratante (95-97% agua) y baja en calorías, ideal para dietas de control de peso y salud digestiva. Por cada 100g aporta aproximadamente 12-15 kcal, 0.6g de proteínas, 2g de hidratos de carbono y fibra. Es fuente de potasio, magnesio, vitamina C y K, además de compuestos antioxidantes como flavonoides. ",
      },
      {
        nombre: "Brocoli",
        carbos: 7,
        grasas: 0.4,
        categoria: "verduras",
        calorias: 34,
        td: "todo",
        proteina: 2.8,
        genero: ["menor-proteina", "menor-calorias"],
        imagen: "/nutrition/brocoli.png",
        detalle:
          "El brócoli es un vegetal altamente nutritivo, bajo en calorías (\(34\) kcal por \(100\) g) y rico en fibra, vitamina C (\(89\)-\(91\) mg), vitamina K (\(77\)-\(102\) mcg) y folato. Contiene un \(90\%\) de agua, con bajos niveles de grasas y carbohidratos, siendo ideal para dietas saludables. Destaca por sus compuestos antioxidantes y anticancerígenos, como el sulforafano, que fortalecen el sistema inmunológico y la salud ósea. ",
      },
    ],
  },
];

const food = (
  categoria: string,
  nombre: string,
  emoji: string,
  calorias: number,
  proteina: number,
  carbos: number,
  grasas: number,
  detalle: string,
): AlimentoItem => ({
  nombre,
  emoji,
  calorias,
  proteina,
  carbos,
  grasas,
  categoria,
  imagen: "",
  td: "todo",
  detalle,
  genero: [
    proteina >= 10 ? "mayor-proteina" : "menor-proteina",
    calorias >= 150 ? "mayor-calorias" : "menor-calorias",
  ],
});

// Valores aproximados por 100 g de alimento.
const extras: Record<string, AlimentoItem[]> = {
  Proteinas: [
    food("proteina", "Salmon", "🐟", 208, 20, 0, 13, "Rico en proteínas y en grasas omega-3, que favorecen la salud del corazón y la recuperación muscular. También aporta vitamina D y B12."),
    food("proteina", "Pechuga de pavo", "🦃", 135, 30, 0, 1.5, "Una de las fuentes de proteína más magras: muy alta en proteína y casi sin grasa. Ideal para definir o ganar músculo."),
    food("proteina", "Claras de huevo", "🥚", 52, 11, 0.7, 0.2, "Proteína de alta calidad con muy pocas calorías y prácticamente sin grasa."),
    food("proteina", "Yogur griego", "🥛", 59, 10, 3.6, 0.4, "Natural y sin azúcar, aporta mucha proteína, calcio y probióticos. Funciona bien en desayunos y meriendas."),
    food("proteina", "Queso cottage", "🧀", 98, 11, 3.4, 4.3, "Queso fresco rico en caseína, de digestión lenta, útil antes de dormir o entre comidas."),
    food("proteina", "Tofu", "🍢", 76, 8, 1.9, 4.8, "Fuente vegetal de proteína, con calcio y hierro. Se adapta a muchas preparaciones."),
    food("proteina", "Lentejas", "🫘", 116, 9, 20, 0.4, "Cocidas aportan proteína vegetal, fibra y hierro. Dan saciedad y energía sostenida."),
    food("proteina", "Garbanzos", "🫘", 164, 8.9, 27, 2.6, "Legumbre cocida con proteína, fibra y carbohidratos de absorción lenta."),
  ],
  Granos: [
    food("granos", "Arroz integral", "🍚", 112, 2.3, 24, 0.8, "Cocido conserva el salvado, por lo que aporta más fibra y minerales que el arroz blanco."),
    food("granos", "Pasta integral", "🍝", 124, 5.3, 25, 0.5, "Cocida, ofrece carbohidratos complejos y fibra para entrenar con energía."),
    food("granos", "Pan integral", "🍞", 247, 13, 41, 3.4, "Aporta fibra y carbohidratos de absorción más lenta que el pan blanco."),
    food("granos", "Batata", "🍠", 90, 2, 21, 0.2, "Cocida es una excelente fuente de carbohidratos complejos, fibra y vitamina A."),
    food("granos", "Maiz", "🌽", 96, 3.4, 21, 1.5, "Cereal con carbohidratos, fibra y antioxidantes como la luteína."),
  ],
  Frutas: [
    food("frutas", "Manzana", "🍎", 52, 0.3, 14, 0.2, "Rica en fibra y agua, ideal como colación entre comidas."),
    food("frutas", "Naranja", "🍊", 47, 0.9, 12, 0.1, "Excelente fuente de vitamina C, que apoya el sistema inmunológico."),
    food("frutas", "Kiwi", "🥝", 61, 1.1, 15, 0.5, "Más vitamina C que una naranja, además de fibra y potasio."),
    food("frutas", "Arandanos", "🫐", 57, 0.7, 14, 0.3, "Concentran antioxidantes que ayudan a combatir el estrés oxidativo."),
    food("frutas", "Piña", "🍍", 50, 0.5, 13, 0.1, "Contiene bromelina, una enzima que favorece la digestión."),
    food("frutas", "Uvas", "🍇", 69, 0.7, 18, 0.2, "Aportan energía rápida y antioxidantes como el resveratrol."),
    food("frutas", "Mango", "🥭", 60, 0.8, 15, 0.4, "Rico en vitaminas A y C, con carbohidratos de rápida energía."),
    food("frutas", "Aguacate", "🥑", 160, 2, 9, 15, "Fuente de grasas monoinsaturadas saludables, fibra y potasio."),
  ],
  Verduras: [
    food("verduras", "Espinaca", "🥬", 23, 2.9, 3.6, 0.4, "Muy baja en calorías y rica en hierro, folato y vitaminas A y K."),
    food("verduras", "Zanahoria", "🥕", 41, 0.9, 10, 0.2, "Rica en betacaroteno, que el cuerpo convierte en vitamina A."),
    food("verduras", "Tomate", "🍅", 18, 0.9, 3.9, 0.2, "Aporta licopeno, vitamina C y mucha agua con muy pocas calorías."),
    food("verduras", "Coliflor", "🥦", 25, 1.9, 5, 0.3, "Baja en calorías, con fibra y vitamina C. Sustituye al arroz o la papa."),
    food("verduras", "Pimiento", "🫑", 31, 1, 6, 0.3, "Gran fuente de vitamina C y antioxidantes con muy pocas calorías."),
    food("verduras", "Zucchini", "🥒", 17, 1.2, 3.1, 0.3, "Verdura ligera y versátil, rica en agua y potasio."),
    food("verduras", "Champiñones", "🍄", 22, 3.1, 3.3, 0.3, "Bajos en calorías y con vitaminas del grupo B y selenio."),
    food("verduras", "Cebolla", "🧅", 40, 1.1, 9, 0.1, "Aporta sabor, fibra prebiótica y compuestos antioxidantes."),
  ],
};

alimentos.forEach((categoria) => {
  categoria.types.push(...(extras[categoria.nombre] ?? []));
});

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

export const getProductsByCategory = (
  type: string
): Promise<AlimentoItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allItems = alimentos.flatMap(c => c.types);

      if (type.toLowerCase() === "todo") {
        resolve(allItems);
      } else {
        const filtered = allItems.filter(
          i => i.categoria.toLowerCase() === type.toLowerCase()
        );
        resolve(filtered);
      }
    }, 500);
  });
};