/* import React from "react";
import { useState, useEffect } from "react";
import obtenerProductos from "../utilidades/data.js";
import { productos } from "../utilidades/data.js";
import ItemList from "./ItemList.jsx";
import { useParams } from "react-router-dom"; //hook de react-router-dom

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [newProducts, setNewProducts] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    obtenerProductos
      .then((response) => {
        const filteredProducts = category
          ? response.filter((product) => product.categoria === category)
          : searchProducts
          ? newProducts //category es el parametro dinamico que desestructuramos y cambia cual se elija.
          : response; //sino existe ninguna categoria me devuelve todos los productos (response)

        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finalizo la promesa");
      });
  }, [category, newProducts]); //incluimos category en el array para que si categoria cambia se ejecuta todo de nuevo, por que si queda vacio, el useEffect solo se ejecuta al montar el componente.

  const handleInput = (e) => {
    const term = e.target.value;
    setSearchProducts(term);

    if (!term) {
      setProducts(productos);
    } else {
      filtrar(term);
    }
  };

  const filtrar = (terminoBusqueda) => {
    const results = products.filter((product) => {
      return (
        product.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        product.modelo.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    });
    setNewProducts(results);
  };

  return (
    <>
      <h1 className="text-3xl text-center mt-24">{greeting}</h1>;
      <input
        type="text"
        placeholder="Busca tu producto..."
        value={searchProducts}
        onChange={handleInput}
      />
      <ItemList products={products} />
    </>
  );
}

export default ItemListContainer;
 */

import React, { useState, useEffect } from "react";
import obtenerProductos from "../utilidades/data.js";
import ItemList from "./ItemList.jsx";
import { useParams } from "react-router-dom";

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { category } = useParams();

  

  useEffect(() => {
    obtenerProductos
      .then((response) => {
        const filteredProducts = response.filter((product) => {
          const matchesCategory = !category || product.categoria === category;
          const matchesSearch = !searchTerm || matchesSearchTerm(product);
          
          return matchesCategory && matchesSearch;
        });

        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finalizó la promesa");
      });
  }, [category, searchTerm]);

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
