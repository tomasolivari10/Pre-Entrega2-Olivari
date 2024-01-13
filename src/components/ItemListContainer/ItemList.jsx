import React from "react";
import Item from "../Item/Item"

function ItemList({ products} ) {
  return (
    <div className="flex justify-between flex-wrap mx-16 mt-5 mb-24 ">
      {products.map((product) => (
        <Item product={product} key={product.id}/>
      ))}
    </div>
  );
}

export default ItemList;
