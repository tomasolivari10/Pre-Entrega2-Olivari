import { useContext } from "react";

import ZoomImage from "../ZoomImg/ZoomImage";
import { BeatLoader } from "react-spinners";
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import { cartContext } from "../../Context/CartContext";


function ItemDetails({ product, loading, stock}) {
  const { addProducts } = useContext(cartContext);
  
  return (
    <div className="pb-16 pt-28">
      {loading ? (
        <div className="flex justify-center items-center mt-52">
          <p className="ml-2">Cargando...</p>
          <BeatLoader className="text-xl text-black" />
        </div>
      ) : (
        <div className="flex flex-wrap mx-8 md:flex-nowrap md:mx-16 m-4 rounded-md bg-white">
          <div className="flex">
            <ZoomImage src={product.imagen} alt={product.nombre} />
          </div>
          <div className="self-center mx-2 px-10 py-5">
            <h2 className="text-2xl font-normal lg:text-3xl">
              {product.nombre}
            </h2>
            <p className="text-xl mt-4 mb-6">{product.modelo}</p>
            <p className="mb-6">{product.descripcion}</p>
            <span className="text-3xl font-semibold">${product.precio}</span>
            <div className="h-auto">
              <div className="mt-5 flex">
                <p className="text-md font-bold">Stock disponible:</p>
                <p className=" ml-2">{`${stock} unidades`}</p>
              </div>
              <button
                 onClick={() => {
                    addProducts(product);
                }}
                className="bg-cyan-600 hover:bg-cyan-500 p-2 text-white mt-6 mr-3 font-semibold rounded-md duration-200">
                Añadir al Carrito
              </button>
              
              <Link to="/carrito"> 
                <button  className="bg-cyan-600 hover:bg-cyan-500 p-2 text-white mt-6 font-semibold rounded-md duration-200">
                   Ir al carrito
                   </button>
                </Link>

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
