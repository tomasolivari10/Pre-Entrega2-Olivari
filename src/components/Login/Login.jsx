import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import ImagenProfile from "../../assets/loginavatar.png";
import { appFirebase } from "../../database/database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm(); //formState{errors} identifica que input esta fallando
  const [registrando, setRegistrando] = useState(false);
  const [errorAutenticacion, setErrorAutenticacion] = useState("")

  const authentication = async (data) => {
    const { email, password } = data; //email y password son los id que contienen los valores del correo electrónico y la contraseña introducidos por el usuario en el formulario.
    
    try {
      if (registrando) { //si registrando es true, es decir, la cuenta no esta registrada, la crea.
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);//si ya esta registrada, la ingresa.
      }
    } catch (error) {
        setErrorAutenticacion("Los datos ingresados son incorrectos o la cuenta no está registrada.");
      console.error("Error en la autenticación:", error.message);

      setTimeout(()=> {
        setErrorAutenticacion("")
      },5000)
    }
  };
  
  return (
    <div className="pt-8 pb-10">
      <div className="w-72 sm:w-96 m-auto border-2 border-slate-200 form px-10 pb-7 pt-5 rounded-lg">
        <form onSubmit={handleSubmit(authentication)} className="flex flex-col">
            {/*paso la función authentication como argumento de handleSubmit. Para que cuando se envíe el formulario, 
                handleSubmit ejecute la función authentication, pasando los datos del formulario como parámetro */}
          <div>
            <img src={ImagenProfile} className="w-[55%] m-auto mb-4" alt="Avatar" />
          </div>
        {/* utiliza el controlador Controller para registrar campos de formulario, el objeto data que se pasa a la función
        (handleSubmit) contendrá las propiedades correspondientes a los nombres de los campos del formulario. Por eso cuando 
        desestructuramos el objeto data, email y password referencian a los nombres de los campos del formulario con los id*/}
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El correo electrónico es requerido"},
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "El correo electrónico debe tener un formato válido",
              },
            }}
            render={({ field }) => (
              <>
                <label htmlFor="email">Email:</label>
                <input
                  {...field}
                  placeholder="Correo electrónico"
                  id="email"
                  className="w-full p-2 rounded-xl bg-slate-200 shadow-lg outline-cyan-600"
                />
              </>
            )}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>} {/* si error.email, es true, es decir hay un error, renderiza el mensaje. */}
          <Controller
            name="password"
            control={control}
            rules={{
                required: {
                    value: true,
                    message: "La contraseña es requerida"},
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
              maxLength:{
                value: 20,
                message: "La contraseña no puede ser mayor a 20 caracteres"
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                message: "La contraseña debe contener al menos una mayúscula, un número y un carácter especial",
              },
            }}
            render={({ field }) => (
              <>
                <label htmlFor="password" className="mt-4">Contraseña:</label>
                <input
                  type="password"
                  {...field}
                  placeholder="Contraseña"
                  id="password"
                  className="w-full p-2 rounded-xl shadow-lg bg-slate-200 outline-cyan-600"
                />
              </>
            )}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          {errorAutenticacion && <p className="text-md error-message">{errorAutenticacion}</p>}
          <button type="submit" className="p-2 bg-cyan-600 hover:bg-cyan-500 mt-7 rounded-lg duration-300">{registrando ? "Registrarse" : "Iniciar sesión"}</button>
        </form>
        <h4 className="mt-2 text-center text-slate-500">{registrando ? "Si ya tienes cuenta" : "No tienes cuenta?"}
          <button onClick={() => setRegistrando(!registrando)} className="ml-2 px-2 py-1 mt-1 text-black rounded-xl bg-blue-700 hover:bg-blue-600 duration-300">{registrando ? "Inicia sesión" : "Regístrate"}</button>
        </h4>
      </div>
    </div>
  );
};
export default Login;
