import { Link } from "react-router-dom";

function Item({ product }) {

  return (
    <>
        <div className="w-full rounded-md my-5 bg-white p-2 border-2 border-slate-200 overflow-hidden item" >
          <img className="hover:scale-110 duration-500" src={product.imagen} />
          <h1 className="px-2 py-1 font-semibold">{product.nombre}</h1>
          <p className="px-2 py-1">{product.modelo}</p>
          <span className="px-2 py-1 text-xl font-bold">${product.precio}</span>
          <div className="text-center font-semibold">
            <Link to={`/details/${product.id}`} className="w-full block bg-cyan-600 p-2 mt-1 hover:text-white hover:bg-cyan-500">Ver Producto</Link>
            {/* /details/ es la ruta del path que hay en app y renderiza el ItemDetailContainer */}
          </div>
        </div>
    </>
  );
}

export default Item;
