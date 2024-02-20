import { useEffect, useState } from "react";

import ItemDetails from "../ItemDetail/ItemDetails";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../database/database";

const ItemDetailContainer = () => {
  
  const [producto, setProducto] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams() //el hook useParams devuelve los valores extraidos como strings por defecto, por eso el id debe ser un string.

  useEffect(() => {

    const productRef = doc(db, "products", id);
    getDoc(productRef)
      .then((response) => {
        const productDb = { id: response.id, ...response.data() };
        setProducto(productDb);
      })
      .catch((error) => console.log(error))
      .finally(()=> setLoading(false))
  }, [id]);


  return (
    <div >
      <ItemDetails product={producto} stock={producto.stock} loading={loading} />
    </div>
  );
};
export default ItemDetailContainer;
