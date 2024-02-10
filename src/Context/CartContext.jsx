import { createContext, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
 

  const addProducts = (product) => {
    const productRepeat = cart.find((item) => item.id === product.id); //recorro el carrito con el metodo find y buscamos si hay un item
    //que tenga el mismo id que el producto que el usuario quiere agregar y lo almaceno en la constante, que va a contener ese producto en forma de objeto o no encuentra y contiene undefined

    if (productRepeat) {
      //si es true, y hay un producto en el carrito igual al que ya se quiere agregar, le sumo uno y lo actualizo en setCart.
      if(productRepeat.quantity < product.stock){
      setCart(cart.map((item) =>  //itero el carrito con map y nuevamente verifico si hay un item id que coincida con el id producto que se quiere agregar.
              item.id === product.id ? { ...product, quantity: productRepeat.quantity + 1 }
              : //mantengo las propiedades anteriores con el spread operator y modifico quantity aumentandola en 1.(productRepeat contiene a ese producto igual que se quiere aumentar)
              item ));}
      ////sino encontro, entonces deja el item asi y no cambies nada.
    } else {
      //sino se cumplio la condicion del if, simplemente mantenemos el cart como estaba y se agrega el producto que todavia no estaba en el carrito.
      setCart([...cart, product]); //spread para que permanezcan los productos que ya estaban en el cart.
    }
  };
  

  const total = cart.reduce(
    (acc, element) => acc + element.precio * element.quantity, 0 );

    const cartQuantity = cart.reduce((acc, element) => acc + element.quantity, 0);


    const deleteProduct = (product) => {
      const results = cart.filter((item) => item.id !== product.id); //todos los id (products) diferentes del clickeado se quedan en el array resultante.
      setCart(results); //results es el nuevo array que obtengo luego del filtrado.
    };

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        total,
        addProducts,
        cartQuantity,
        deleteProduct,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
