import type { Categoria } from "../data/workout";

type Props = {
  categoria: Categoria;
};

const ItemRutine = ({ categoria }: Props) => {
  return (
    <div>
      {categoria.types.map((item, i) => (
        <div key={i}>
          <h2>{item.nombre}</h2>
          <p>{item.duracion} min</p>
          <p>{item.meta}</p>
          <img src={item.imagen} alt={item.nombre} width="200" />
        </div>
      ))}
    </div>
  );
};

export default ItemRutine;