import { useEffect, useState } from "react";
import type { Categoria } from "../data/workout";
import { getProducts } from "../data/workout";

export const ItemWorkoustContainer = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => setCategorias(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

    </div>
  );
};
