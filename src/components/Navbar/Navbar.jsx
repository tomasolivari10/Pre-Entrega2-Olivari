import React from "react";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";//Link= componente de react router dom

function Navbar() {
  return (
    <nav className="flex justify-between bg-cyan-600 fixed w-full top-0 z-10">
      <div className="px-5 py-4">
        <Link to="/" className="text-xl">
          RaquetSports
        </Link>
      </div>
      <div>
        <ul className="flex">
          {/* to="ruta a la que nos queremos redirigir al clickear" */}
          <Link to="/categories/raquetas"> {/* el nombre de la categoria debe ser exactamente igual al que haya en data. */}
            <li className="p-5 hover:text-white hover:bg-cyan-500">Raquetas</li>
          </Link>
          <Link to="/categories/paletas">
            <li className="p-5 hover:text-white hover:bg-cyan-500">Paletas</li>
          </Link>
          <Link to="/categories/pelotas">
            <li className="p-5 hover:text-white hover:bg-cyan-500">Pelotas</li>
          </Link>
        </ul>
      </div>
      <div>
        <ul className="flex">
          <Link>
            <li className="p-5 cursor-pointer hover:text-white hover:bg-cyan-500">Contacto</li>
          </Link>
          <Link>
            <li className="p-5 cursor-pointer hover:text-white"><CartWidget /></li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
