import {useContext} from  "react"

import {cartContext} from "../../Context/CartContext"

function CartWidget() {
  
  const {cart, cartQuantity} = useContext(cartContext)
  
  
  return (
      <div>
        <i className="fas fa-shopping-cart"></i> 
        {cart.length > 0 && <span className="pl-1">{cartQuantity}</span>}
      </div>
  )
}

export default CartWidget