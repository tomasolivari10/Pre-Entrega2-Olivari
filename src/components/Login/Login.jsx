import { useState } from "react";

import LoginForm from "./LoginForm.jsx";
import { auth } from "../../database/database.js";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const [errorAutenticacion, setErrorAutenticacion] = useState("");
  const [errorRegistro, setErrorRegistro] = useState("");

  const authentication = async (data) => {
    const { email, password } = data; //email y password son los id que contienen los valores del correo electrónico y la contraseña introducidos por el usuario en el formulario.

    try {
      if (registrando) {
        //si registrando es true, es decir, la cuenta no esta registrada, la crea.
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password); //si ya esta registrada, la ingresa.
      }
    } catch (error) {
      if (registrando && error.code === "auth/email-already-in-use") {
        //si registrando es true, es decir se esta en el proceso de registro y no de inicio y la cuenta ya esta en uso, renderiza ese error.
        setErrorRegistro("La cuenta ingresada ya existe");
      } else {
        setErrorAutenticacion(
          "Los datos ingresados son incorrectos o la cuenta no está registrada."
        );
      }
      console.error("Error en la autenticación:", error.message);

      setTimeout(() => {
        setErrorAutenticacion("");
        setErrorRegistro("");
      }, 5000);
    }
  };

  return (
    <div className="pt-8 pb-10">
      <LoginForm
        registrando={registrando}
        setRegistrando={setRegistrando}
        authentication={authentication}
        errorAutenticacion={errorAutenticacion}
        errorRegistro={errorRegistro}
      />
    </div>
  );
};
export default Login;
