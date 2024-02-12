import Item from "../Item/Item"
import Ordenamiento from "../Ordenamiento/Ordenamiento"
import logo from "../../assets/logoraquetsports.png"

function ItemList({ products, setProducts, originalProducts, priceGreaterThan, priceLessThan} ) {

  return (
    <>
    <div className="flex justify-center items-center flex-wrap mt-3 md:mt-4 md:mb-4">
      <img className="w-[80px] h-[80px] md:w-[100px] h-[100px]" src={logo} alt="" />
      <p className="font-semibold text-3xl md:text-[45px]">aquetSports</p>
    </div>
     <div className="flex justify-center md:justify-end md:mr-24 mt-10 md:mt-0" >
      <p>Ordenar por: </p>
      <Ordenamiento originalProducts={originalProducts} setProducts={setProducts} priceGreaterThan={priceGreaterThan} priceLessThan={priceLessThan}/>
      </div>
    <div className={`grid-container mx-12 md:mx-24 pt-6 pb-24`}  >
      {products.map((product) => (
        <Item product={product} key={product.id}/>
      ))}
    </div>
    </>
  );
}

export default ItemList;
