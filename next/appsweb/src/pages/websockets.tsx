// i_websockets.tsx
import io from "socket.io-client"
import {useEffect, useState} from "react";
import MensajeChatWebsockets, {MensajeChatProps} from "@/components/MensajeChatWebsockets";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";

const servidorWebsocket = 'http://localhost:3030';
const socket = io(servidorWebsocket);

export interface FormularioModelo {
    salaId: string;
    nombre: string;
    mensaje: string;
}
export type MensajeSala = FormularioModelo;
export type MensajeSala2 = {
    salaId: string;
    nombre: string;
    mensaje: string;
};


export default function () {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [mensajes, setMensajes] = useState([] as MensajeChatProps[]);

    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
            mensaje: '',
        },
        mode: 'all'
    })

    useEffect(
        () => {

            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Si esta conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('No esta conectado');
            });
            socket.on('escucharEventoHola', (data: { mensaje: string }) => {
                console.log('escucharEventoHola');
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Sistema',
                    posicion: 'I'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            });
            socket.on('escucharEventoUnirseSala', (data: { mensaje: string }) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: 'Sistema',
                    posicion: 'I'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores,
                    nuevoMensaje]);
            });
            socket.on('escucharEventoMensajeSala', (data: MensajeSala) => {

                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.salaId + ' - ' + data.mensaje,
                    nombre: data.nombre,
                    posicion: 'I'
                };
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores,
                    nuevoMensaje]);
                console.log('escucharEventoMensajeSala');

            });

        },
        []
    )

    const enviarEventoHola = () => {
        const nuevoMensaje: MensajeChatProps = {
            mensaje: 'Adrian',
            nombre: 'Sistema',
            posicion: 'I'
        };
        socket.emit(
            'hola', // Nombre Evento
            nuevoMensaje, //  Datos evento
            (datosEventoHola:MensajeChatProps) => { // Callback o respuesta del evefnto
                console.log(datosEventoHola) // {mensaje: 'ok'};
                //      LAS DOS FORMAS HACEN LO MISMO, pero el callback es en casos especiales
                //     const [nombre, setNombre] = useState('Adrian')
                //      setNombre('Vicente')
                //     const [arreglo, setArreglo] = useState([1,2])
                //      setArreglo( [1,2,3] ) // Metodo1: SIN CALLBACK
                //      setArreglo( ([1,2])=> [ ...[1,2], 3 ]) => [1,2,3] // Metodo2: CON CALLBACK
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            }
        )
    }

    const unirseSalaOEnviarMensajeASala = (data: FormularioModelo) => {
        if (data.mensaje === '') {
            // unimos a la sala
            const dataEventoUnirseSala = {
                salaId: data.salaId,
                nombre: data.nombre,
            };
            socket.emit(
                'unirseSala', // Nombre Evento
                dataEventoUnirseSala, //  Datos evento
                () => { // Callback o respuesta del evefnto
                    const nuevoMensaje: MensajeChatProps = {
                        mensaje: 'Bienvenido a la sala ' + dataEventoUnirseSala.salaId,
                        nombre: 'Sistema',
                        posicion: 'I'
                    };
                    setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                }
            );
        } else {
            // mandamos mensaje
            const dataEventoEnviarMensajeSala = {
                salaId: data.salaId,
                nombre: data.nombre,
                mensaje: data.mensaje
            };
            socket.emit(
                'enviarMensaje', // Nombre Evento
                dataEventoEnviarMensajeSala, //  Datos evento
                () => { // Callback o respuesta del evefnto
                    const nuevoMensaje: MensajeChatProps = {
                        mensaje: data.salaId + ' - ' + data.mensaje,
                        nombre: data.nombre,
                        posicion: 'D'
                    };
                    setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
                }
            );
        }
    }

    const estaConectado = ()=>{
        if(isConnected){
            return <span>Conectado :)</span>
        }else{
            return <span>Desconectado :(</span>
        }
    }

    return (
        <>
            <Layout title="Formulario">
                <h1>Websockets</h1>
                <p><strong>{estaConectado()}</strong></p>
                <button className={'btn btn-success'} onClick={() => enviarEventoHola()}>Enviar evento hola</button>
                <div className="row">
                    <div className="col-sm-6">
                        <h1>FORMULARIO</h1>

                        <div className="row">
                            <div className="col-sm-6">
                                <form onSubmit={handleSubmit(unirseSalaOEnviarMensajeASala)}>
                                    <div className="mb-3">
                                        <label htmlFor="salaId" className="form-label">Sala ID</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="EJ: 1234"
                                               id="salaId"
                                               {...register('salaId',{required: 'Ingresar salaId'})}
                                               aria-describedby="salaIdHelp"/>
                                        <div id="salaIdHelp" className="form-text">
                                            Ingresa tu idSala.
                                        </div>
                                        {errors.salaId &&
                                            <div className="alert alert-warning" role="alert">
                                                Tiene errores {errors.salaId.message}
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="EJ: Adrian"
                                               id="nombre"
                                               {...register('nombre', {required: 'Nombre requerido'})}
                                               aria-describedby="nombreHelp"/>
                                        <div id="nombreHelp" className="form-text">
                                            Ingresa tu nombre.
                                        </div>
                                        {errors.nombre &&
                                            <div className="alert alert-warning" role="alert">
                                                Tiene errores {errors.nombre.message}
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="EJ: Mensaje"
                                               id="mensaje"
                                               {...register('mensaje')}
                                               aria-describedby="mensajeHelp"/>
                                        <div id="mensajeHelp" className="form-text">
                                            Ingresa tu mensaje.
                                        </div>
                                        {errors.mensaje &&
                                            <div className="alert alert-warning" role="alert">
                                                Tiene errores {errors.mensaje.message}
                                            </div>
                                        }
                                    </div>
                                    <button type="submit"
                                            disabled={!isValid}
                                            className="btn btn-warning">
                                        Unirse sala
                                    </button>
                                    <button type="reset"
                                            className="btn btn-danger">
                                        Reset
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-6">
                        {mensajes.map((mensaje, indice) =>
                            <MensajeChatWebsockets key={indice}
                                         mensaje={mensaje.mensaje}
                                         nombre={mensaje.nombre}
                                         posicion={mensaje.posicion}
                            />)
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}