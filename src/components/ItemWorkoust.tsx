import type { Categoria } from "../data/workout";

type Props = {
  categorias: Categoria[];
};

const ItemWorkouts = ({ categorias }: Props) => {
  return (
    <div>
      {categorias.map((categoria) => (
        <div key={categoria.id}>
          <h2>{categoria.nombre}</h2>
        </div>
      ))}
    </div>
  );
};

export default ItemWorkouts;