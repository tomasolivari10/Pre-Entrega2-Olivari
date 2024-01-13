import ZoomImage from "../ZoomImg/ZoomImage";

function ItemDetails({ product }) {

  return (
    <div className="flex bg-white mx-16 mb-16 mt-28 rounded-md">
        <div>
          <ZoomImage src={product.imagen} alt={product.nombre}/>
        </div>
      <div className="mt-20 mr-20 px-10 py-5">
        <h2 className="text-3xl">{product.nombre}</h2>
        <p className="text-xl mt-4 mb-6">{product.modelo}</p>
        <p className="mb-6 text-start">{product.descripcion}</p>
        <span className="text-3xl font-semibold">${product.precio}</span>
        <div className="h-auto">
          <button className="bg-black hover:bg-gray-900 p-2 border-r-4 text-white mt-6 font-semibold">
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
