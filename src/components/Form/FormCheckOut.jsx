import { useState, useContext } from "react";

import { cartContext } from "../../Context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import db from "../../database/database.js";
import CheckOut from "./CheckOut";
import { Link } from "react-router-dom";


function FormCheckOut({usuario}) {

  const { cart, setCart, total } = useContext(cartContext);
  const [idOrder, setIdOrder] = useState(null);


  const handleSubmit = (data) => {

    const currentDate = new Date()//variable para generar fecha actual de cada orden.

    const orden = {
      comprador: { ...data },
      productos: [...cart],
      total: total,
      estado: "No despachado",
      fecha: currentDate
    };

    //subida de orden a firebase

    const ordersRef = collection(db, "orders");
    addDoc(ordersRef, orden)
      .then((response) => {
        setIdOrder(response.id);
      })
      .catch((error) => console.log(error));

      setCart([])
  };

  return (
    <>
      {idOrder ? ( //si idOrder es true, es decir, contiene una orden, renderizo el id, si no renderizo el formulario.
        <div className="pt-48 text-center">
          <h2 className="text-xl pb-4">{`Muchas gracias, usuario: ${usuario.email}, su orden se genero con exito.`}</h2>
          <p className="pb-16">
            Guarde el id de la orden para retiro o seguimiento de la misma: 
            <span className="font-bold">{idOrder}</span>
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 hover:text-white rounded-md duration-300 font-semibold"
          >
            Regresar al inicio
          </Link>
        </div>
      ) : (
        <CheckOut
          handlesubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default FormCheckOut;
