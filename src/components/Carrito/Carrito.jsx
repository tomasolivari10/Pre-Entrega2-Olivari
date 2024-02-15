import { useContext  } from "react";

import { cartContext } from "../../Context/CartContext";
import CartProducts from "./CartProducts";
import CartTotal from "./CartTotal";
import { Link } from "react-router-dom";

function Carrito() {
  const { cart } = useContext(cartContext);


  return (
    <div className="min-h-screen">
      <CartProducts />
      {cart.length ? (
        <>
          <CartTotal />
        </>
      ) : (
        <div className="text-center flex flex-col pt-36">
          <h1 className=" text-3xl">El carrito esta vacio</h1>
          <Link to="/">
            <button className="mt-8 bg-cyan-600 rounded-md px-10 py-3 text-white font-semibold hover:bg-cyan-500 duration-200">Descubrir Productos</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Carrito;
