import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Carrito from "./components/Carrito/Carrito";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer"
import FormCheckOut from "./components/Form/FormCheckOut";
import { ToastContainer } from 'react-toastify'
import Login from "./components/Login/Login"
import {appFirebase} from "./database/database.js"
import {getAuth, onAuthStateChanged} from "firebase/auth"
const auth = getAuth(appFirebase)

import "./index.css";
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [usuario, setUsuario] = useState(null)
  

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase){//si usuarioFirebase es true, es decir, si hay algun usuario logueado
      setUsuario(usuarioFirebase)
    }else{
      setUsuario(null)
    }
  })

  return (
    //todos los componentes que quiera utilizar router-dom deben estar dentro del Browser
    <BrowserRouter>
      <ToastContainer />
        <div className="min-h-screen">
        <Navbar usuario={usuario}/>
        {/* navbar y footer quedan afuera de routes para que se visualicen siempre */}
        <Routes>
          {usuario ?  (
            <>
              <Route path="/" element={<ItemListContainer />} />
              {/* route define cada ruta que tengamos,el atributo path=referencia a la ruta, element={va el componente que queremos renderizar en la ruta del path} */}
              <Route path="/categories/:category" element={<ItemListContainer />} />
              <Route path="/details/:id" element={<ItemDetailContainer />} />
              {/* :category es un parametro dinamico que va a cambiar, segun en que categoria se haga click. */}
              <Route path="*" element={<ItemListContainer />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/formulario" element={<FormCheckOut usuario={usuario}/>} />
            </>
            ) : (
              <Route path="*" element={<Login />} />
          )}
        </Routes>
          </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
