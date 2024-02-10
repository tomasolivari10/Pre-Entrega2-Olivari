import { useForm } from "react-hook-form"

function CheckOut({ handlesubmit } ) {

    const {register, handleSubmit , formState: {errors}, watch} = useForm()

    const onSubmit = handleSubmit((data) => {
        handlesubmit(data)
    })


  return (
    <>
    <h2 className="pt-32 pb-8 text-lg text-center">Ingresa tus datos para finalizar con el pedido</h2>
    <div className='flex justify-center items-center pb-10 '>
        <form className='flex flex-col p-4 border-2 border-slate-300 shadow-xl rounded-xl md:w-[500px] ' onSubmit={onSubmit}>
            <div className="row flex flex-col sm:flex-row sm:justify-evenly sm:gap-4">
            <label htmlFor="" className="label">Nombre:
            <br />
            <input className='w-full mt-1 p-1 rounded-md outline-cyan-600 md:pr-10 ' type="text" placeholder="Nombre completo"
            {...register("nombre",{
                required: "Nombre es requerido",
            })}
            />
            <br />
            {errors.nombre && <span className="mb-2 text-red-500 text-sm">{errors.nombre.message}</span>}
            </label>
            <label htmlFor="" className="label">Email:
            <br />
            <input type="email" className='w-full mt-1 p-1 rounded-md outline-cyan-600 md:pr-10 ' placeholder="Ingresar email"
            {...register("email",{
                required: "El correo electronico es requerido",
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "El correo electrónico debe tener un formato válido",}
                })}
            />
            <br />
            {errors.email && <span className="text-red-500 text-sm mb-2">{errors.email.message}</span>}
            </label>
            </div>
            <div className="className='row flex flex-col sm:flex-row sm:justify-evenly sm:gap-4">
            <label htmlFor="" className="label">Confirmar email:
            <br />
            <input type="email" className='w-full mt-1 p-1 rounded-md outline-cyan-600 md:pr-10' placeholder="Confirmar email"
            {...register("confirmaremail",{
                required: {
                    value:true,
                    message:"Confirmar el email es requerido",
                },
                validate: (value) => {
                    if(value === watch("email")){
                        return true
                    }else{
                       return "Los emails no coinciden"
                    }
                }
            })}
            />
            <br />
            {errors.confirmaremail && <span className="text-red-500 mb-2 text-sm">{errors.confirmaremail.message}</span>}
            </label>
            <label htmlFor="" className="label">Direccion:
            <br />
            <input type="text" className='w-full mt-1 p-1 rounded-md outline-cyan-600 md:pr-10' placeholder="Ingresar direccion"
            {...register("direccion",{
                required: "Direccion es requerido"
            })}
            />
            <br />
            {errors.direccion && <span className="mb-2 text-red-500 text-sm">{errors.direccion.message}</span>}
            </label>
            </div>
            <div className="className='row flex flex-col sm:flex-row sm:gap-4 sm:justify-evenly">
            <label htmlFor="" className="label">Telefono:
            <br />
            <input type="number" className='w-full mt-1 p-1 rounded-md outline-cyan-600 md:pr-10' placeholder="Ingresar telefono"
            {...register("telefono",{
                required: "Telefono es requerido"
            })}
            />
            <br />
            {errors.telefono && <span className="mb-2 text-red-500 text-sm">{errors.telefono.message}</span>}
            </label>
            <label htmlFor="" className="label">Celular:
            <br />
            <input type="number" className='w-full mt-1 p-1 rounded-md outline-cyan-600 md:pr-10' placeholder="Ingresar celular"
            {...register("celular",{
                required: "Celular es requerido"
            })}
            />
            <br />
            {errors.celular && <span className="mb-2 text-red-500 text-sm">{errors.celular.message}</span>}
            </label>
            </div>
            <label htmlFor="" className="label">Mensaje:
            <br />
            <textarea name="mensaje" id="mensaje" rows="5" placeholder="Dejanos tu mensaje" className='mt-1 p-1 rounded-md w-72 sm:w-full outline-cyan-600'
            {...register("mensaje",{
                required: "Mensaje es requerido"
            })}>
            
            </textarea>
            <br />
            {errors.mensaje && <span className="mb-2 text-red-500 text-sm">{errors.mensaje.message}</span>}
            </label>
            <button type='submit' className='bg-cyan-600 text-center rounded-md mt-4 p-2 hover:bg-cyan-500 duration-200'> 
                Enviar Orden
            </button>
        </form>
    </div>
    </>
  )
}

export default CheckOut