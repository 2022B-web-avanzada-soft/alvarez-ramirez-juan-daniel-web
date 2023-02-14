import Layout from "@/components/Layout";
import {useState} from "react";
import {useForm} from "react-hook-form";
type FormularioEjemplo = {
    nombre: string;
}
export default function () {
    const [nombre, setNombre] = useState('JUAN');

    const { handleSubmit, register, formState: {errors, isValid} } = useForm<FormularioEjemplo>(
        {
            defaultValues: {
                nombre: nombre,
            },
            mode: 'all',
        }
    )
    const controladorSubmit = (data: FormularioEjemplo) => {
        console.log(data);
        setNombre(data.nombre);
    }
    return (
        <Layout title="Form">
            <h1>Form con React Hook Form</h1>
            <p>Nombre: {nombre}</p>
            <form onSubmit={handleSubmit(controladorSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        {...register('nombre', {
                                required: {
                                    value: true,
                                    message: 'El nombre es obligatorio'
                                },
                                minLength: {
                                    value: 3,
                                    message: 'El nombre debe tener al menos 3 caracteres'
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'El nombre debe tener máximo 10 caracteres'
                                },
                                validate: {
                                    soloLetras: (value) => {
                                        return /^[a-zA-Z]+$/.test(value) || 'El nombre debe tener solo letras';
                                    }
                                }
                            })
                        }/>
                </div>
                {errors.nombre && 
                    <div className="alert alert-danger" role="alert">
                        Tiene errores {errors.nombre.message}
                    </div>
                }
                <button type="submit" disabled={!isValid} className="btn btn-primary">Submit</button>
            </form>
        </Layout>
    )
}