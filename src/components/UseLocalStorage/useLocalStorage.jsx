import { useState } from "react";

function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; //parseo item si es que tiene algo, sino retorno el valor inicial
    } catch (error) {
      console.error(error);
      return initialValue;
    }
});

  const setValue = value => {
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
