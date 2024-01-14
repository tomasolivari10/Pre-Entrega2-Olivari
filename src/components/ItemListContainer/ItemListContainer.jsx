import React, { useState, useEffect } from "react";
import obtenerProductos from "../utilidades/data.js";
import ItemList from "./ItemList.jsx";
import { useParams } from "react-router-dom";

function ItemListContainer({ greeting }) {

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const { category } = useParams() //category es el parametro dinamico que desestructuramos y cambia segun cual se elija.

  
  useEffect(() => {
    obtenerProductos
      .then((response) => {
        const filteredProducts = response.filter((product) => {
          const matchesCategory = !category || product.categoria === category;
          //matchesCategory es true si category es falsy o si la categoria coincide con la seleccionada.
          const matchesSearch = !searchTerm || matchesSearchTerm(product);
          //marchesSearch es true si searchTerm es falsy o si la funcion invocada (matchesSearchTerm) retorno una coincidencia segun lo ingresado en el input.
          return matchesCategory && matchesSearch; 
        });
        //si category y searchTerm son falsy ambas variables son true por el operador !(negacion) y todos los productos
        //pasan la condicion de filtrado, es decir, se renderizan todos los productos.
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finalizó la promesa");
      });
  }, [category, searchTerm]);

  //funcion para almacenar en el estado lo ingresado en el input
  const handleInput = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const matchesSearchTerm = (product) => {
    return (
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      product.modelo.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  };

  return (
    <>
    <div className="flex justify-between mt-24 mb-20">
    <h1 className="text-3xl text-center ml-24">{greeting}</h1>

      {/* INPUT ADICIONAL PARA FILTRAR POR MODELO O DEPORTE*/}
      <input className="w-60 mr-24 rounded-md p-1"
        type="text"
        placeholder="Busca por modelo o deporte..."
        value={searchTerm}
        onChange={handleInput}
      />
    </div>
      
      <ItemList products={products} />
    </>
  );
}

export default ItemListContainer;
