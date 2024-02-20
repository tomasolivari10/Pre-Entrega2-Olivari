import { useState } from "react";

function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; //si item es true, es decir hay algo almacenado, lo parseo, sino retorno el valor inicial
    } catch (error) {
      console.error(error);
      return initialValue; //si hay un error al parsearlo, se devuelve el valor inicial.
    }
});

  const setValue = value => {  //funcion para actualizar el valor de storedValue y tambien guardarlo en el localStorage.
        try{
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        }catch(error){
            console.error(error)
        }
    }
  return [storedValue, setValue];
}

export default useLocalStorage;
