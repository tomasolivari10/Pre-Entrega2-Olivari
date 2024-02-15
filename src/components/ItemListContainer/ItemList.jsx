import Item from "../Item/Item"
import Ordenamiento from "../Ordenamiento/Ordenamiento"


function ItemList({ products, setProducts, originalProducts, priceGreaterThan, priceLessThan, loading} ) {

  return (
    <>
    {loading ? null : <div className="flex justify-center md:justify-end md:mr-24 mt-10 md:mt-0" >
      <p>Ordenar por: </p>
      <Ordenamiento originalProducts={originalProducts} setProducts={setProducts} priceGreaterThan={priceGreaterThan} priceLessThan={priceLessThan}/>
      </div>}
    <div className={`grid-container mx-12 md:mx-24 pt-6 pb-24`}  >
      {products.map((product) => (
        <Item product={product} key={product.id}/>
      ))}
    </div>
    </>
  );
}

export default ItemList;
