import React from 'react'

function CartWidget() {
  
  const notificationCount = 3;
  
    return (
      <div>
        <i className="fas fa-shopping-cart"></i>
        <span className="pl-1">{notificationCount}</span>
      </div>
  )
}

export default CartWidget