
function Ordenamiento({ priceGreaterThan, priceLessThan, originalProducts, setProducts}) {

  const handleChange = (event) => {
    const selectedOrden = event.target.value; //extrae el valor seleccionado del desplegable cuando cambia y se almacena en selectedOrden.
    if (selectedOrden === 'precioAsc') {
        priceLessThan();
      } else if (selectedOrden === 'precioDesc') {
        priceGreaterThan();
      }else if(selectedOrden === 'masRelevantes'){
        setProducts(originalProducts)
      }
  };

  return (
    <div>
      <select className="ml-2 bg-slate-100" onChange={handleChange}>
        <option value="masRelevantes">Más relevantes</option>
        <option value="precioAsc">Precio (menor a mayor)</option>
        <option value="precioDesc">Precio (mayor a menor)</option>
      </select>
    </div>
  );
}

export default Ordenamiento;
