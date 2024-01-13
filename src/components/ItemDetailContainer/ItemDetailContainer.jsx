import { useEffect, useState } from "react";
import ItemDetails from "../ItemDetail/ItemDetails";
import  obtenerProductos  from "../utilidades/data.js";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  

  const [producto, setProducto] = useState({})
  const { id } = useParams() //el hook useParams devuelve los valores extraidos como strings por defecto, por eso el id debe ser un string.

  useEffect(()=>{
    obtenerProductos
      .then((response)=> {
        const productoEncontrado = response.find(producto=> producto.id === id)
        setProducto(productoEncontrado)
      })
      .catch((error)=>{
        console.log(error)
      })

  }, [])

  return (
    <div>
      <ItemDetails product={producto} />
    </div>
  );
};
export default ItemDetailContainer;
