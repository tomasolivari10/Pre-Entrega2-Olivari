import { useContext} from "react";

import { cartContext } from "../../Context/CartContext";
import { toast } from 'react-toastify';


function CartItemCounter({ product }) {
  const { addProducts, cart, setCart } = useContext(cartContext);

  const decrease = (product) => {
    const productRepeat = cart.find((item) => item.id === product.id);
    product.quantity > 1 &&
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...product, quantity: productRepeat.quantity - 1 }
            : item
        )
      );
  };

  return (
    <div className="flex justify-between items-center border-2 rounded-md my-4 sm:my-0">
      <p
        className="text-lg font-bold px-2 cursor-pointer text-cyan-700"
        onClick={() => decrease(product)}
      >
        -
      </p>
      <p className="px-3  ">{product.quantity}</p>
      <p
        className="text-lg font-bold px-2 cursor-pointer text-cyan-700"
        onClick={() => {
          if(product.quantity < product.stock){
            addProducts(product);
          }else{
            toast.warning('Alcanzaste el limite de unidades disponibles!', {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          }
        }}
      >
        +
      </p>
    </div>
  );
}

export default CartItemCounter;
