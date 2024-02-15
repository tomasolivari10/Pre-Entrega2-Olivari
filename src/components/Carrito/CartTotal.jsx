import { useContext } from "react";

import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom"
import Swal from "sweetalert2";


function CartTotal() {
  const { cart, setCart, total} = useContext(cartContext);

  const emptyCart = () => {
    if (cart.length > 0) {
      Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Se eliminaran ${cart.reduce((total, element)=> total + element.quantity, 0)} producto/os del carrito `, 
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          setCart([]);
        }
      });
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-between mb-6 sm:flex-row">
      <button
        className="sm:ml-16 mt-2 mb-4 bg-cyan-600 hover:bg-cyan-500 hover:text-white duration-200 py-1 px-2 rounded-md font-semi-bold "
        onClick={emptyCart}
      >
        Vaciar Carrito
      </button>
      <div className="flex flex-col sm:flex-row text-center items-center">
      <h3 className="font-bold sm:mr-16 mt-2 mb-4">
        Total a pagar: <span>${total.toFixed(2)}</span>
      </h3>
      <Link to="/formulario/" className='bg-cyan-600 hover:bg-cyan-500 hover:text-white duration-200 py-1 px-2 rounded-md p-1 mt-2 mb-4 sm:mr-16'>
        Finalizar Compra
      </Link> 
      </div>
    </div>
  );
}

export default CartTotal;
