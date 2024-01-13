import React from "react";
import { Link } from "react-router-dom";

function Item({ product }) {
  return (
    <>
        <div className="w-1/5 rounded-md item my-5 mx-7 bg-white p-2">
          <img src={product.imagen} alt={product.nombre} />
          <h1 className="px-2 py-1 font-semibold">{product.nombre}</h1>
          <p className="px-2 py-1">{product.modelo}</p>
          <span className="px-2 py-1 text-xl font-bold">${product.precio}</span>
          <div className="text-center">
            <Link to={`/details/${product.id}`} className="w-full block bg-cyan-600 p-2 mt-1 hover:text-white hover:bg-cyan-500">Ver Producto</Link>
            {/* /details/ es la ruta del path que hay en app y renderiza el ItemDetailContainer */}
          </div>
        </div>
    </>
  );
}

export default Item;
