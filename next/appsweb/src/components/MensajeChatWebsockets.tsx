// MensajeChatWebsockets.tsx
export interface MensajeChatProps {
    nombre: string;
    mensaje: string;
    posicion: 'D' | 'I';
}

export default function(props: MensajeChatProps){
    const {nombre, mensaje, posicion} = props;
    return (<>
        {
            posicion === 'D' ?
                <p className='text-end'>
                    {mensaje}<strong>:{nombre}</strong>
                </p> :
                <p className='text-start'>
                    <strong>{nombre}:</strong>{mensaje}
                </p>
        }
    </>)
}