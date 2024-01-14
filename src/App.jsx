import React from "react";
import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    //todos los componentes que quiera utilizar router-dom deben estar dentro del Browser
    <BrowserRouter>
      <Navbar /> {/* navbar y footer quedan afuera de routes para que se visualicen siempre */}

      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Bienvenidos a RaquetSports" />} />
        {/* route define cada ruta que tengamos,el atributo path=referencia a la ruta, element={va el componente que queremos renderizar en la ruta del path} */}
        <Route path="/categories/:category" element={<ItemListContainer greeting="Bienvenidos a RaquetSports" />}/>
        <Route path="/details/:id" element={<ItemDetailContainer />} />
        {/* :category es un parametro dinamico que va a cambiar, segun en que categoria se haga click. */}
        <Route path="*" element={<ItemListContainer greeting="Bienvenidos a RaquetSports" />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
