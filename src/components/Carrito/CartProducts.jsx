import { useContext } from "react";

import { cartContext } from "../../Context/CartContext";
import CartItemCounter from "./CartItemCounter";
import { toast } from 'react-toastify';

function CartProducts() {
  const { cart, deleteProduct } = useContext(cartContext);

  return (
    <div className="pt-28 pb-10">
      {cart.map((product) => (
        <div
          key={product.id}
          className="flex flex-wrap items-center border-2 border-slate-200 justify-evenly flex-col sm:flex-row h-auto mx-14 mt-2 bg-white rounded-md md:h-[100px]">
          <img
            src={product.imagen}
            className="w-[100px] h-[100px] pb-1 mb-2  sm:mb-0"
            alt={product.nombre}
          />
          <h2 className="mb-2 mx-4 sm:mx-0 sm:mb-0 font-semibold">
            {product.nombre}
          </h2>
          <p className="mb-2 sm:mb-0">{product.modelo}</p>
          <CartItemCounter product={product} className="mb-2 sm:mb-0" />
          <span className="mb-2 sm:mb-0">
            ${product.precio * product.quantity}
          </span>
          <button
            className="text-xl font-bold text-red-600 mb-4 sm:mb-0"
            onClick={() =>{ deleteProduct(product);
              toast.error('Producto eliminado del carrito!', {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartProducts;
