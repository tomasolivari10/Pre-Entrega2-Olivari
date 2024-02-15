import { useState, useEffect, useRef} from "react";

import CartWidget from "./CartWidget";
import logoNav from "../../assets/logoraquetsports.png"
import { Link } from "react-router-dom";
import { appFirebase } from "../../database/database.js";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(appFirebase);

function Navbar({usuario}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null)
  

  useEffect(()=> { 
    const handleOutsideClick = (event) => {//Esta función se ejecuta cada vez que se hace clic en cualquier parte del documento fuera del menu.
      if(menuRef.current && !menuRef.current.contains(event.target)){
        // Si el menú está abierto y el clic fue fuera del menú, se cierra el menú estableciendo isOpen en false.
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  },[])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    {usuario ?  (
      <nav className="md:flex justify-between items-center bg-cyan-600 fixed w-full h-auto top-0 z-10">
    <div>
      <Link to="/" className="text-xl">
        <img className="h-[80px] w-[80px] md:w-[95px] " src={logoNav} alt="" />
      </Link>
    </div>
    <div ref={menuRef}>{/* contenedor referenciado */}
      <div className="text-4xl absolute mt-[7px] top-4 right-4 md:right-6 cursor-pointer md:hidden">
        <ion-icon
          name={isOpen ? "close" : "menu"}
          onClick={toggleMenu}
        ></ion-icon>
      </div>
      <ul
        className={`absolute bg-cyan-600 w-full z-[-1] pl-5 pr-7 md:z-auto md:pl-0 md:flex md:justify-center md:items-center md:space-x-4 md:w-auto md:static transition ease-in-out duration-1000  ${
          isOpen ? "top-14" : "left-[-800px]"
        }`}
      >
        <Link to="/categories/Raquetas" onClick={toggleMenu}>
          {" "}
          <li className="md:pl-1 md:pr-1 lg:px-3 py-6 hover:text-white duration-200">
            Raquetas
          </li>
        </Link>
        <hr />
        <Link to="/categories/Paletas" onClick={toggleMenu}>
          <li className="md:pl-1 md:pr-1 py-6 lg:px-3  hover:text-white duration-200">
            Paletas
          </li>
        </Link>
        <hr />
        <Link to="/categories/Pelotas" onClick={toggleMenu}>
          <li className="md:pl-1 md:pr-1 py-6 lg:px-3  hover:text-white duration-200">
            Pelotas
          </li>
        </Link>
        <hr />
        <Link to="/carrito" onClick={toggleMenu}>
          <li className="md:pl-1 md:pr-1 py-6 lg:px-3 cursor-pointer hover:text-white duration-200">
            <CartWidget />
          </li>
        </Link>
        <hr />
        <li
          onClick={() => signOut(auth)}
          className="md:pl-1 md:pr-1 py-6  cursor-pointer duration-200 hover:text-white"
        >
          Logout
        </li>
        
      </ul>
    </div>
  </nav> ) : (
        <>
      <div className="flex justify-center mr-10">
        <div className="flex justify-center items-center flex-wrap mt-3 md:mt-2 md:mb-2">
          <img className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]" src={logoNav} alt="" />
          <p className="font-semibold text-3xl text-gray-700 md:text-[45px]">aquetSports</p>
        </div>
      </div>
        <p className="text-center">Ingresa o registrate para descubrir nuestra amplia variedad de productos</p>
        </>
        )}
        </>

    
 
  );
}

export default Navbar;
