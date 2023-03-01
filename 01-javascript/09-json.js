const arregloUsuarios = [
    {
        "id": 1,
        "nombre": "Juan",
    }
];

const arregloGuardado = JSON.stringify(arregloUsuarios);
console.log(arregloGuardado);

const usuario = {
    "id": 1,
    "nombre": "Juan",
};

const usuarioGuardado = JSON.stringify(usuario);
console.log(usuarioGuardado);

const arregloRestaurado = JSON.parse(arregloGuardado);
const usuarioRestaurado = JSON.parse(usuarioGuardado);
console.log(arregloRestaurado);
console.log(usuarioRestaurado);