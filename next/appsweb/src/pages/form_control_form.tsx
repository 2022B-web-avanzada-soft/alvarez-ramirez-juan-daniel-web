import Layout from "@/components/Layout";
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Button, FormControl, Input, InputLabel, Select, MenuItem} from "@mui/material";
type FormularioEjemplo = {
    nombre: string;
}
export default function () {
    const [nombre, setNombre] = useState('JUAN');

    const { handleSubmit, register, formState: {errors, isValid}, control } = useForm<FormularioEjemplo>(
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
                    <FormControl fullWidth>
                        <InputLabel htmlFor="nombre">Nombre</InputLabel>
                        <Controller 
                            control={control}
                            name="nombre"
                            render={
                                ({ field: {onChange, value, onBlur} }) => {
                                    return (
                                        <Select
                                            labelId="estadoCivilLabelId"
                                            id="estadoCivilId"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            label="Estado Civil"
                                        >
                                            <MenuItem value="SOLTERO">Soltero</MenuItem>
                                            <MenuItem value="CASADO">Casado</MenuItem>
                                            <MenuItem value="DIVORCIADO">Divorciado</MenuItem>
                                            <MenuItem value="VIUDO">Viudo</MenuItem>
                                        </Select>
                                    )
                                }}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Estado civil es obligatorio'
                                }
                            }}
                            />
                    </FormControl>
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