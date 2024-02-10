import React, { useState, useEffect,useRef} from "react";

import ItemList from "./ItemList.jsx";
import Carousel from "../Carousel/Carousel.jsx"
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where} from "firebase/firestore"
import db from "../../database/database.js"
import { BeatLoader } from "react-spinners";


function ItemListContainer() {

  const [products, setProducts] = useState([])
  const [originalProducts, setOriginalProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [noResults, setNoResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const elementoDestinoRef = useRef()

  const { category } = useParams() //category es el parametro dinamico que desestructuramos y cambia segun cual se elija.

  
  useEffect(() => {  
    let consulta
    let productsRef = collection(db, "products")
    
    if(category){
      consulta = query(productsRef , where("categoria", "==",  category))
    }else {
      consulta = productsRef
    }

  getDocs(consulta)
    .then((response) => {
      let productsDb = response.docs.map(product => {
        return {id: product.id, ...product.data()}
      })
      const filteredProducts = productsDb.filter((product) => {
        const matchesSearch = !searchTerm || matchesSearchTerm(product);
        //marchesSearch es true si searchTerm es falsy o si la funcion invocada (matchesSearchTerm) retorno una coincidencia segun lo ingresado en el input.
        return matchesSearch; 
        //si searchTerm es falsy, la variable es true por el operador !(negacion) y todos los productos
        //pasan la condicion de filtrado, es decir, se renderizan todos los productos.
      });
      setProducts(filteredProducts);
      setOriginalProducts(filteredProducts)
      setNoResults(filteredProducts.length === 0)
      setLoading(false)//establezco la variable en false una vez que los productos cargaron exitosamente
    })
  }, [category, searchTerm]);
 
  

  const priceLessThan = () => {
    const orderedProducts = [...products].sort((a, b) => a.precio - b.precio )
    setProducts(orderedProducts)
  }

  const priceGreaterThan = () => {
    const productsOrdered = [...products].sort((a, b) => b.precio - a.precio)
    setProducts(productsOrdered)
  }

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(()=> {
      window.addEventListener("resize", handleScreenWidth)

      return () => {
        window.removeEventListener("resize", handleScreenWidth)
      }
  }, [])
 
  //funcion para almacenar en el estado lo ingresado en el input
  const handleInput = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

   const matchesSearchTerm = (product) => {
    return (//verifico si lo ingresado en el input coincide con el nombre o modelo de los productos.
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      product.modelo.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }; 

  return (
    <>
    <Carousel elementoDestinoRef={elementoDestinoRef}/>
    <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-between" ref={elementoDestinoRef}>{/* contenedor referenciado */}
      {loading ? (
        <div className="flex justify-center items-center m-auto mt-52">
          <p>Cargando...</p>
          <BeatLoader/>
        </div>
      ) : (
      <>
      <div>
        {screenWidth > 768 && <h1 className="text-3xl md:text-center mt-12  md:ml-24 ">{category}</h1> }
        {noResults && <h2 className="mt-20 text-center md:ml-24 text-xl">No se encontraron coincidencias con la marca o producto ingresados.</h2>}
      </div>
      {/* INPUT ADICIONAL PARA FILTRAR POR MODELO O DEPORTE*/}
      <input className="w-56 text-md mt-4 p-2 text-black rounded-md md:mr-24 md:mt-[5px] md:fixed md:top-4 md:left-[18%] lg:left-[40%] md:z-10"
        type="text"
        placeholder="Busca por modelo o deporte..."
        value={searchTerm}
        onChange={handleInput}
      />
      </>
      )}
    </div>
      
      <ItemList 
      products={products} 
      setProducts={setProducts} 
      originalProducts={originalProducts} 
      priceGreaterThan={priceGreaterThan} 
      priceLessThan={priceLessThan}/>
    </>
  );
}

export default ItemListContainer;
