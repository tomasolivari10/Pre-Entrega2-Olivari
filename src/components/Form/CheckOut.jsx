import { useForm } from "react-hook-form";


function CheckOut({ handlesubmit, handleChange, text }) {
  const { register, handleSubmit, formState: { errors }, watch,} = useForm();

  
  const onSubmit = handleSubmit((data) => {
    handlesubmit(data);
  });

 const handleClick = ()=> {
    localStorage.setItem("formulario", "") //funcion para resetear el formulario luego de ser enviado.
  }

  return (
    <>
      <h2 className="pt-32 pb-8 text-lg text-center">
        Ingresa tus datos para finalizar con la orden
      </h2>
      <div className="flex justify-center items-center pb-10 ">
        <form
          className="flex flex-col p-4 border-2 border-slate-300 shadow-xl rounded-xl md:w-[550px] "
          onSubmit={onSubmit}
        >
          <div className="row flex flex-col sm:flex-row sm:justify-between sm:gap-4">
            <label htmlFor="name" className="w-full md:w-[49%] mt-2">
              Nombre:
              <br />
              <input
              id="name"
                className="w-full mt-1 p-1 rounded-md outline-cyan-600 "
                type="text"
                {...register("nombre", {
                  required: "Nombre es requerido",
                })}
                name="nombre"
                onChange={handleChange}
                value={text.nombre}
                placeholder="Nombre completo" 
              />
              <br />
              {errors.nombre && (
                <span className="mb-2 text-red-500 text-sm">
                  {errors.nombre.message}
                </span>
              )}
            </label>
            <label htmlFor="email" className="w-full md:w-[49%] mt-2">
              Email:
              <br />
              <input
              id="email"
                type="email"
                className="w-full mt-1 p-1 rounded-md outline-cyan-600 "
                {...register("email", {
                  required: "El correo electronico es requerido",
                  pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:
                      "El correo electrónico debe tener un formato válido",
                    },
                })}
                name="email"
                onChange={handleChange}
                value={text.email}
                placeholder="Ingresar email"
              />
              <br />
              {errors.email && (
                <span className="text-red-500 text-sm mb-2">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          <div className="className='row flex flex-col sm:flex-row sm:justify-between sm:gap-4">
            <label htmlFor="confirmaremail" className="w-full md:w-[49%] mt-2">
              Confirmar email:
              <br />
              <input
              id="confirmaremail"
               className="w-full mt-1 p-1 rounded-md outline-cyan-600"
               placeholder="Confirmar email"
               {...register("confirmaremail", {
                   required: {
                       value: true,
                       message: "Confirmar el email es requerido",
                    },
                    validate: (value) => {
                        if (value === watch("email")) {
                            return true;
                        } else {
                            return "Los emails no coinciden";
                        }
                    },
                })}
                type="email"
                name="confirmaremail"
                onChange={handleChange}
                value={text.confirmaremail}
                />
              <br />
              {errors.confirmaremail && (
                <span className="text-red-500 mb-2 text-sm">
                  {errors.confirmaremail.message}
                </span>
              )}
            </label>
            <label htmlFor="direccion" className="w-full md:w-[49%] mt-2">
              Direccion:
              <br />
              <input
              id="direccion"
                type="text"
                className="w-full mt-1 p-1 rounded-md outline-cyan-600"
                {...register("direccion", {
                    required: "Direccion es requerido",
                })}
                name="direccion"
                placeholder="Ingresar direccion"
                onChange={handleChange}
                value={text.direccion}
                />
              <br />
              {errors.direccion && (
                <span className="mb-2 text-red-500 text-sm">
                  {errors.direccion.message}
                </span>
              )}
            </label>
          </div>
          <div className="className='row flex flex-col sm:flex-row sm:gap-4 sm:justify-between">
            <label htmlFor="telefono" className="w-full md:w-[49%] mt-2">
              Telefono:
              <br />
              <input
              id="telefono"
                type="number"
                className="w-full mt-1 p-1 rounded-md outline-cyan-600"
                {...register("telefono", {
                    required: "Telefono es requerido",
                })}
                name="telefono"
                placeholder="Ingresar telefono"
                onChange={handleChange}
                value={text.telefono}
                />
              <br />
              {errors.telefono && (
                <span className="mb-2 text-red-500 text-sm">
                  {errors.telefono.message}
                </span>
              )}
            </label>
            <label htmlFor="celular" className="w-full md:w-[49%] mt-2">
              Celular:
              <br />
              <input
              id="celular"
                type="number"
                className="w-full mt-1 p-1 rounded-md outline-cyan-600"
                {...register("celular", {
                    required: "Celular es requerido",
                })}
                name="celular"
                placeholder="Ingresar celular"
                onChange={handleChange}
                value={text.celular}
              />
              <br />
              {errors.celular && (
                <span className="mb-2 text-red-500 text-sm">
                  {errors.celular.message}
                </span>
              )}
            </label>
          </div>
          <label htmlFor="mensaje" className="w-full">
            Mensaje:
            <br />
            <textarea
              id="mensaje"
              rows="5"
              className="mt-1 p-1 rounded-md w-72 sm:w-full outline-cyan-600"
              {...register("mensaje", {
                  required: "Mensaje es requerido",
                })}
                name="mensaje"
                placeholder="Dejanos tu mensaje"
                onChange={handleChange}
                value={text.mensaje}
                ></textarea>
            <br />
            {errors.mensaje && (
              <span className="mb-2 text-red-500 text-sm">
                {errors.mensaje.message}
              </span>
            )}
          </label>
          <button
          onClick={handleClick}
            type="submit"
            className="bg-cyan-600 text-center rounded-md mt-4 p-2 hover:bg-cyan-500 duration-200"
          >
            Enviar Orden
          </button>
        </form>
      </div>
    </>
  );
}

export default CheckOut;
